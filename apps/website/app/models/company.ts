import { DateTime } from "luxon";
import { BaseModel, column, hasMany, manyToMany } from "@adonisjs/lucid/orm";
import type { HasMany, ManyToMany } from "@adonisjs/lucid/types/relations";
import RepresentativeProfile from "./representative_profile.js";
import { relations } from "#lib/lucid/relations.js";
import { lazy } from "#lib/lazy.js";
import Event from "./event.js";
import SpeakerProfile from "./speaker_profile.js";

const companyRelations = lazy(() =>
  relations(Company, (r) => [r.many("representativeProfiles"), r.many("representativeProfiles"), r.many("events")]),
);

export type CVPermissions = "all" | "visited" | "none";
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
  declare cvPermissions: CVPermissions;

  @column()
  declare logo: string;

  @column()
  declare sponsor: SponsorVariant;

  @column()
  declare about: string;

  @hasMany(() => RepresentativeProfile)
  declare representativeProfiles: HasMany<typeof RepresentativeProfile>;

  get $relations() {
    return companyRelations.get().for(this);
  }

  @manyToMany(() => Event, {
    pivotTable: "event_companies",
  })
  public events!: ManyToMany<typeof Event>;

  static async getEvents(company: Company) {
    const speakerProfiles = await SpeakerProfile.query()
      .where("company", company.name)
      .preload("events");

    return speakerProfiles ? speakerProfiles.map((profile) => profile.events).flat() : [];
  }
}
