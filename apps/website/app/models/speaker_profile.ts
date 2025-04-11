import { DateTime } from "luxon";
import { BaseModel, column, hasOne, manyToMany } from "@adonisjs/lucid/orm";
import Event from "./event.js";
import type { HasOne, ManyToMany } from "@adonisjs/lucid/types/relations";
import Company from "./company.js";
import User from "./user.js";

export default class SpeakerProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare firstName: string;

  @column()
  declare lastName: string;

  @column()
  declare jobTitle: string;

  @column()
  declare profilePicture: string;

  @column()
  declare company: string;

  @column()
  declare github: string;

  @column()
  declare linkedin: string | null;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @column()
  declare website: string | null;

  @column()
  declare about: string;

  @manyToMany(() => Event, {
    pivotTable: "event_speakers",
  })
  public events!: ManyToMany<typeof Event>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  static async company(speaker: SpeakerProfile) {
    return await Company.findByOrFail("name", speaker.company);
  }
}
