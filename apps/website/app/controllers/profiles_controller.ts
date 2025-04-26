import ParticipantProfile from "#models/participant_profile";
import User from "#models/user";
import { changeEmailSqids, UserService } from "#services/user_service";
import {
  createProfileValidator,
  updateProfileValidator,
  hasTicketValidator,
  emailChangeCallbackValidator,
} from "#validators/profile";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import { emailEditValidator } from "#validators/profile";
import ChangeEmailRequest from "#models/email_change";
import db from "@adonisjs/lucid/services/db";
import UserPolicy from "#policies/user_policy";

function toParticipantProfileFormat(data: any): Partial<ParticipantProfile> {
  if ("curricularYear" in data) {
    data.finishedAt = data.curricularYear[1];
    data.curricularYear = data.curricularYear[0];
  }
  // HACK
  if ("transports" in data)
    data.transports = data.transports.map((item: { label: string; value: string }) => item.value);
  if ("attendedBeforeEditions" in data)
    data.attendedBeforeEditions = data.attendedBeforeEditions.map(
      (item: { label: string; value: string }) => item.value,
    );
  if ("dietaryRestrictions" in data) data.dietaryRestrictions ||= "";
  if ("reasonForSignup" in data) data.reasonForSignup ||= "";

  return data;
}

@inject()
export default class ProfilesController {
  constructor(private userService: UserService) {}

  async default({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail();

    await user.load("participantProfile");
    await user.load("speakerProfile", (q) => {
      q.preload("events");
    });

    if (!user?.participantProfile && !user?.representativeProfile)
      return response.redirect().toRoute("pages:signup");

    return response.redirect().toRoute("pages:profile.show", { slug: user.slug });
  }

  async getRepresentativeProfile({ auth, response }: HttpContext) {
    const user = auth.user;

    if (!user) {
      return response.unauthorized("User not authenticated");
    }

    await user.load("representativeProfile");

    const representativeProfile = user.representativeProfile;
    if (!representativeProfile) {
      return response.notFound("Representative profile not found");
    }

    await representativeProfile.load("company");
    await representativeProfile.company.load("event");

    return response.ok({
      representativeProfile,
    });
  }

  async getInfo({ params, response }: HttpContext) {
    const user = await User.findBy("slug", params.slug);

    if (!user) {
      response.notFound("Utilizador não encontrado");
      return;
    }

    await user.load("participantProfile");

    return response.send({ user });
  }

  async index({ auth, inertia, params }: HttpContext) {
    const authUser = auth.user;
    const user = await User.findByOrFail("slug", params.slug);
    await user.load("participantProfile");
    await user.load("speakerProfile", (q) => {
      q.preload("events");
    });

    const isUser = authUser !== undefined && user.id === authUser.id;

    return inertia.render("profile", {
      user: user.serialize({
        fields: ["id", "slug"],
        relations: {
          participantProfile: {
            fields: [
              "firstName",
              "lastName",
              "university",
              "course",
              "curricularYear",
              "attendedBeforeEditions",
              "github",
              "linkedin",
              "website",
            ],
          },
        },
      }),
      isUser,
    });
  }

  async edit({ auth, inertia, response, params }: HttpContext) {
    const user = auth.user;
    await user!.load("participantProfile");

    if (!user?.participantProfile) return response.redirect().toRoute("pages:signup");

    await user.participantProfile.load("user");

    return inertia.render("profile/edit", {
      profile: user!.participantProfile!,
      section: params.section,
    });
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail();
    const data = request.body();

    await user!.load("participantProfile");

    const newFields = await updateProfileValidator.validate(toParticipantProfileFormat(data));

    await user.participantProfile.merge(newFields).save();

    return response.redirect().back();
  }

  async show({ inertia }: HttpContext) {
    return inertia.render("signup");
  }

  async create({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail();

    const data = request.body();

    const formattedData = toParticipantProfileFormat(data);

    console.log({ data, formattedData });
    if (!formattedData.firstName || !formattedData.lastName) {
      return response.redirect().back();
    }

    const profile = await createProfileValidator.validate(formattedData);

    const profileAdd = new ParticipantProfile();
    profileAdd.fill(profile);

    await user.related("participantProfile").associate(profileAdd);

    return response.redirect().toRoute("pages:tickets");
  }

  async hasTicket({ response, request }: HttpContext) {
    const { email } = await request.validateUsing(hasTicketValidator);

    const user = await User.query().where("email", email).preload("participantProfile").first();

    const hasTicket = !!(
      user
      && user.participantProfileId !== null
      && user.participantProfile.purchasedTicket !== null
    );

    const name = hasTicket
      ? `${user!.participantProfile.firstName} ${user!.participantProfile.lastName}`
      : null;

    return response.ok({ hasTicket, name });
  }

  async sendEditPassword({ auth, response }: HttpContext) {
    const user: User = auth.user!;

    if (!user) {
      return response.redirect().back();
    }

    // Reuses the forgot password workflow
    await this.userService.sendForgotPasswordEmail(user.email);

    return response.redirect().back();
  }

  async sendEditEmail({ request, auth, response }: HttpContext) {
    const user: User = auth.user!;
    const { email } = await request.validateUsing(emailEditValidator);

    await this.userService.sendChangeEmailEmail(user.id, user.email, email);

    return response.redirect().back();
  }

  async callbackForEmailChangeConfirmation({ inertia, request }: HttpContext) {
    const { id, email } = await request.validateUsing(emailChangeCallbackValidator);

    let decodedId;
    try {
      decodedId = changeEmailSqids.decode(id)[0];
    } catch {
      return inertia.render("auth/change-email", {
        title: "Falha ao confirmar",
        text: "Falha ao confirmar, o pedido de alteração não existe.",
      });
    }

    const changeEmail = await ChangeEmailRequest.find(decodedId);

    if (!changeEmail)
      return inertia.render("auth/change-email", {
        title: "Falha ao confirmar",
        text: "Falha ao confirmar, o pedido de alteração não existe.",
      });
    if (changeEmail.performed)
      return inertia.render("auth/change-email", {
        title: "Falha ao confirmar",
        text: "Falha ao confirmar, a alteração já foi efetuada.",
      });
    if (changeEmail.canceled)
      return inertia.render("auth/change-email", {
        title: "Falha ao confirmar",
        text: "Falha ao confirmar, a alteração já foi cancelada.",
      });

    try {
      const changed: boolean = await db.transaction(async (trx) => {
        if (email === changeEmail.newEmail) {
          changeEmail.newEmailConfirmed = true;
        } else if (email === changeEmail.oldEmail) {
          changeEmail.oldEmailConfirmed = true;
        }

        changeEmail.useTransaction(trx);
        await changeEmail.save();

        if (changeEmail.newEmailConfirmed && changeEmail.oldEmailConfirmed) {
          const user = await User.findOrFail(changeEmail.userId);
          user.email = changeEmail.newEmail;
          user.useTransaction(trx);
          await user.save();

          changeEmail.performed = true;
          await changeEmail.save();
          return true;
        }

        return false;
      });

      if (changed) {
        await this.userService.sendEmailChangedConfirmationEmail(
          changeEmail.oldEmail,
          changeEmail.newEmail,
        );
        return inertia.render("auth/change-email", {
          title: "Alteração efetuada",
          text: "A alteração foi efetuada após ser confirmada pelos dois e-mails.",
        });
      } else {
        return inertia.render("auth/change-email", {
          title: "Alteração confirmada",
          text: "A alteração foi confirmada mas não efetuada. Tem de ser confirmada pelos dois e-mails.",
        });
      }
    } catch {
      return inertia.render("auth/change-email", {
        title: "Falha ao confirmar",
        text: "Falha ao confirmar alteração.",
      });
    }
  }

  async callbackForEmailChangeCancelation({ request, inertia }: HttpContext) {
    const { id } = await request.validateUsing(emailChangeCallbackValidator);

    let decodedId;
    try {
      decodedId = changeEmailSqids.decode(id)[0];
    } catch {
      return inertia.render("auth/change-email", {
        title: "Falha ao confirmar",
        text: "Falha ao confirmar, o pedido de alteração não existe.",
      });
    }

    const changeEmail = await ChangeEmailRequest.find(decodedId);

    if (!changeEmail)
      return inertia.render("auth/change-email", {
        title: "Falha ao cancelar",
        text: "Falha ao cancelar, o pedido de alteração não existe.",
      });
    if (changeEmail.performed)
      return inertia.render("auth/change-email", {
        title: "Falha ao cancelar",
        text: "Falha ao cancelar, a alteração já foi efetuada.",
      });
    if (changeEmail.canceled)
      return inertia.render("auth/change-email", {
        title: "Falha ao cancelar",
        text: "Falha ao cancelar, a alteração já foi cancelada.",
      });

    try {
      changeEmail.canceled = true;
      await changeEmail.save();
      return inertia.render("auth/change-email", {
        title: "Alteração cancelada",
        text: "Alteração cancelada.",
      });
    } catch {
      return inertia.render("auth/change-email", {
        title: "Falha ao cancelar",
        text: "Falha ao cancelar alteração.",
      });
    }
  }

  async showCV({ auth, bouncer, params, response }: HttpContext) {
    const { slug } = params;

    let user;
    try {
      user = await User.findBy("slug", slug);
    } catch {
      response.notFound("Utilizador não encontrado");
      return;
    }

    if (!auth.user || !user || (await bouncer.with(UserPolicy).denies("seeCV", user))) {
      return response.forbidden("Acesso negado");
    }

    const userCV = await this.userService.getCV(user!);
    if (!userCV) {
      return response.notFound("Ficheiro não encontrado");
    }
    const { file, fileName } = userCV;

    response.type("application/pdf");
    response.header("Content-Disposition", `inline; filename="${fileName}"`);
    return response.stream(file);
  }

  async showAvatar({ params, response }: HttpContext) {
    const { slug } = params;

    let user;
    try {
      user = await User.findBy("slug", slug);
    } catch {
      response.notFound("Participante não encontrado");
      return;
    }

    if (user!.avatar === null) {
      return response.notFound("Ficheiro não encontrado");
    }
    const userAvatar = await this.userService.getAvatar(user!);

    if (!userAvatar) {
      return response.notFound("Ficheiro não encontrado");
    }
    const { file, fileName } = userAvatar;

    response.header("Content-Disposition", `inline; filename="${fileName}"`);
    return response.stream(file);
  }
}
