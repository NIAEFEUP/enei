import type Event from "#models/event";
import { ArrayDto } from "../array.js";
import { ProductDto } from "../product/product.js";
import { SpeakerProfileDto } from "../speaker_profile/speaker_profile.js";
import * as is from "@sindresorhus/is";

export class EventDto {
  constructor(private event: Event) {}

  toJSON() {
    return {
      id: this.event.id,
      createdAt: this.event.createdAt.toISO(),
      updatedAt: this.event.updatedAt.toISO(),
      title: this.event.title,
      description: this.event.description,
      type: this.event.type,
      companyImage: this.event.companyImage,
      date: this.event.date.toISO(),
      duration: this.event.duration,
      location: this.event.location,
      extraInfo: this.event.extraInfo,
      isAcceptingRegistrations: this.event.isAcceptingRegistrations,
      registrationRequirements: this.event.registrationRequirements,
      requiresRegistration: this.event.requiresRegistration,
      ticketsRemaining: this.event.ticketsRemaining,
      ticketsTotal: this.event.ticketsTotal,
      price: this.event.price.toCents(),
      speakers: new ArrayDto(SpeakerProfileDto, this.event.speakers).toJSON(),
      product: is.isNullOrUndefined(this.event.product)
        ? null
        : new ProductDto(this.event.product).toJSON(),
    };
  }
}
