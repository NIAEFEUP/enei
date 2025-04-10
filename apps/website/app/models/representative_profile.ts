import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasOne } from "@adonisjs/lucid/orm";
import type { BelongsTo, HasOne } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
// import Event from './event.js'
import Company from "./company.js";

export default class RepresentativeProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Representative Info

  @column()
  declare firstName: string;

  @column()
  declare lastName: string;

  @column()
  declare jobTitle: string;

  @column({ columnName: "ORCID_link" })
  declare ORCIDLink: string | null;

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;

  @column()
  declare companyId: number;

  @column()
  declare email: string | null;

  // To uncomment when Events are created
  // @hasMany(() => Event)
  // declare participatingEvents: HasMany<typeof Event>

  // Functions
  static async getCompanyRepresentatives(companyId: number) {
    return this.query().where("company_id", companyId);
  }
}
