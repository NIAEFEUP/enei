import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasOne } from "@adonisjs/lucid/orm";
import type { BelongsTo, HasOne } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
// import Event from './event.js'
import Company from "./company.js";

export default class SpeakerProfile extends BaseModel {
  public static table = "speaker_profiles";

  @column({ isPrimary: true })
  declare id: number;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Speaker Info

  @column()
  declare firstName: string;

  @column()
  declare lastName: string;

  @column()
  declare jobTitle: string;

  @column()
  declare profilePicture: string;

  @column()
  declare speakerRole: "keynote_speaker" | "panelist" | "moderator";

  @column()
  declare ORCIDLink: string | null;

  @column()
  declare companyId: number | null;

  @column()
  declare about: string | null;

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  // To uncomment when Events are created
  // @hasMany(() => Event)
  // declare participatingEvents: HasMany<typeof Event>
}
