import ParticipantProfile from "#models/participant_profile";
import User from "#models/user";
import { UserActivityService } from "#services/user_activity_service";
import { createProfileValidator, updateProfileValidator, hasTicketValidator } from "#validators/profile";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import slug from "slug";
import { md5 } from "js-md5";

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
  constructor(private userActivityService: UserActivityService) {}

  async default({ auth, response }: HttpContext) {
    const user = auth.user;
    await user!.load("participantProfile");

    if (!user?.participantProfile) return response.redirect().toRoute("pages:signup");

    return response
      .redirect()
      .toRoute("pages:profile.show", { slug: user.participantProfile.slug });
  }

  async getInfo({ params, response }: HttpContext) {
    const profile = await ParticipantProfile.findBy("slug", params.slug);

    if (!profile) {
      response.notFound("Participante não encontrado");
      return;
    }

    return response.send({ profile: profile });
  }

  async index({ auth, inertia, params, response }: HttpContext) {
    const profile = await ParticipantProfile.findBy("slug", params.slug);

    if (!profile) {
      response.notFound("Participante não encontrado");
      return;
    }

    await profile.load("user");
    if (!profile.user) {
      response.notFound("Participante não encontrado");
      return;
    }

    const isUser = profile.user ? profile.user.id === auth.user?.id : false;
    const activityInformation = await this.userActivityService.getActivityInformation(
      profile.user!,
    );

    return inertia.render("profile", { profile, isUser, activityInformation });
  }

  async edit({ auth, inertia, response, params }: HttpContext) {
    const user = auth.user;
    await user!.load("participantProfile");

    if (!user?.participantProfile) return response.redirect().toRoute("pages:signup");

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

    return response.redirect().toRoute("pages:profile.default");
  }

  async show({ inertia }: HttpContext) {
    return inertia.render("signup");
  }

  async create({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail();

    const data = request.body();

    const formattedData = toParticipantProfileFormat(data);
    // encode firstName and lastName to a number under 1000
    // Guaranteed to be unique between users with the same name (since we have under 1000 participants)
    const userMd5 = md5(slug(`${formattedData.firstName} ${formattedData.lastName}`));
    const userNumber =
      (Number.parseInt(userMd5.replace(/[^1-9]/g, "").substring(0, 3)) + user.id) % 1000;
    const userCode = userNumber.toString().padStart(3, "0");
    formattedData.slug = slug(`${formattedData.firstName} ${formattedData.lastName} ${userCode}`);

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
}
