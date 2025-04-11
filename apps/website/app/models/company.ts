import { DateTime } from "luxon";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import RepresentativeProfile from "./representative_profile.js";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import SpeakerProfile from "./speaker_profile.js";

export type SponsorVariant = "default" | "gold" | "silver" | "bronze";

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare name: string;

  @column()
  declare logo: string;

  @column()
  declare sponsor: SponsorVariant;

  @column()
  declare about: string;

  @hasMany(() => RepresentativeProfile)
  declare representativeProfiles: HasMany<typeof RepresentativeProfile>;

  static async getEvents(company: Company) {
    const speakerProfiles = await SpeakerProfile.query()
      .where("company", company.name)
      .preload("events");

    return speakerProfiles ? speakerProfiles.map((profile) => profile.events).flat() : [];
  }
}
