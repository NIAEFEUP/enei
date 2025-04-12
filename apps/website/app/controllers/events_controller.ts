import type { HttpContext } from "@adonisjs/core/http";
import Event from "#models/event";
import EventService from "#services/event_service";
import User from "#models/user";
import { inject } from "@adonisjs/core";
import ParticipantProfile from "#models/participant_profile";

@inject()
export default class EventsController {
  constructor(private eventService: EventService) {}
  async index({ inertia }: HttpContext) {
    const events = await Event.query().preload("speakers").orderBy("id");
    return inertia.render("events", {
      currentDay: new Date().toDateString(),
      events: events.map((event) => ({
        id: event.id,
        title: event.title,
        type: event.type,
        date: event.getFormattedDate(),
        time: event.getFormattedTime(),
        location: event.location,
        companyImage: event.companyImage,
        speakers: event.speakers.map((speaker) => ({
          firstName: speaker.firstName,
          lastName: speaker.lastName,
          jobTitle: speaker.jobTitle,
          profilePicture: speaker.profilePicture,
          company: speaker.company,
        })),
      })),
    });
  }
  async show({ inertia, params, auth }: HttpContext) {
    const event = await Event.findOrFail(params.id);

    const speakers = await event.related("speakers").query();
    const user = auth.user;
    await user?.load("staffProfile");

    const isRegistered = user ? await this.eventService.isRegistered(user, event) : false;

    return inertia.render("events/show", {
      eventId: event.id,
      title: event.title,
      description: event.description,
      date: event.getFormattedDate(),
      time: event.getFormattedTime(),
      location: event.location,
      type: event.type,
      companyImage: event.companyImage,
      extraInfo: event.extraInfo,
      speakers: speakers.map((speaker) => ({
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        jobTitle: speaker.jobTitle,
        profilePicture: speaker.profilePicture,
        company: speaker.company,
      })),
      registrationRequirements: event.registrationRequirements,
      requiresRegistration: event.requiresRegistration,
      ticketsRemaining: event.ticketsRemaining,
      price: event.price,
      isAcceptingRegistrations: event.isAcceptingRegistrations,
      isRegistered: isRegistered,
    });
  }

  async register({ response, params, auth }: HttpContext) {
    // Get the authenticated user
    const user = auth.user;

    // Get the event and check if it is possible do register
    const event = await Event.findOrFail(params.id);

    if (!event.isAcceptingRegistrations) {
      return response.badRequest("Este evento ainda não tem as inscrições abertas");
    }
    if (event.ticketsRemaining <= 0) {
      return response.badRequest("Já não há bilhetes disponíveis para este evento");
    }

    if (!event.requiresRegistration) {
      return response.badRequest("Este evento não requer registo");
    }

    // Register
    await this.eventService.register(user!, event);

    return response.redirect().toRoute("pages:events.show", { id: event.id });
  }

  async checkin({ response, request, params, session }: HttpContext) {
    const eventID = request.input("eventID");

    const event = await Event.findOrFail(eventID);
    const profile = await ParticipantProfile.findBy("slug", "jorge-costa");

    // FIXME: change this to User when slug in user is ready

    if (!profile) {
      session.flashErrors({ message: "Participante não encontrado" });
      return response.redirect().back();
    }

    const user = await User.findBy("participantProfileId", profile?.id);

    if (await this.eventService.isCheckedIn(user!, event)) {
      session.flashErrors({ message: "Participante já checked-in" });
    } else if (event.requiresRegistration && !await this.eventService.isRegistered(user!, event)) {
      session.flashErrors({ message: "Participante não registado no evento" });
    } else {
      await this.eventService.checkin(user!, event);
    }

    return response.redirect().back();
  }

  async ticketsRemaining({ response, params }: HttpContext) {
    const event = await Event.findOrFail(params.id);

    return response.ok({ ticketsRemaining: event.ticketsRemaining });
  }

  async isRegistered({ response, params, auth }: HttpContext) {
    const user = auth.user;
    if (!user) {
      return response.unauthorized(
        "Precisas de estar autenticado para verificar se estás registado num evento",
      );
    }

    const event = await Event.findOrFail(params.id);

    const isRegistered = await this.eventService.isRegistered(user, event);

    return response.ok({ isRegistered: isRegistered });
  }

  async isRegisteredByEmail({ response, request }: HttpContext) {
    const email = request.input("email");

    const event = await Event.findOrFail(request.param("id"));

    const user = await User.findBy("email", email);

    if (!user) {
      return response.badRequest("Utilizador não encontrado");
    }

    const isRegistered = await this.eventService.isRegistered(user, event);

    return response.ok({ isRegistered: isRegistered });
  }
}
