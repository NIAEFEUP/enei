import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import Company from "./company.js";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";

export default class RepresentativeProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

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

  @column()
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
