import type { HttpContext } from "@adonisjs/core/http";
import Event from "#models/event";
import EventService from "#services/event_service";
import User from "#models/user";
import { inject } from "@adonisjs/core";
import { createMBWayOrderValidator } from "#validators/order";
import type { OrderService } from "#services/order_service";

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
  async show({ inertia, params }: HttpContext) {
    const event = await Event.query()
      .where("id", params.id)
      .preload("speakers")
      .preload("productGroup", (q) => {
        q.preload("products");
      })
      .firstOrFail();

    return inertia.render("events/show", {
      event,
      formattedDate: event.getFormattedDate(),
      formattedTime: event.getFormattedTime(),
      price:
        event.productGroup.products.length > 0 ? event.productGroup.products[0].price.toEuros() : 0,
    });
  }

  async register({ request, params, response, auth }: HttpContext) {
    // Get the authenticated user
    const user = auth.user;

    const { products, name, nif, address, mobileNumber } =
      await request.validateUsing(createMBWayOrderValidator);

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
    await this.eventService.register(user!, event, {
      products,
      name: name ?? "",
      nif: nif ?? "",
      address: address ?? "",
      mobileNumber,
    });

    return response.redirect().toRoute("pages:events.show", { id: event.id });
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
