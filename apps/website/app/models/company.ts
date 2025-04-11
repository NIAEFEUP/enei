import { DateTime } from "luxon";
import { BaseModel, column, hasMany, hasOne } from "@adonisjs/lucid/orm";
import type { HasMany, HasOne } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
import RepresentativeProfile from "./representative_profile.js";

export type CVPermissions = "all" | "visited" | "none";

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

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

  @hasMany(() => RepresentativeProfile)
  declare representativeProfiles: HasMany<typeof RepresentativeProfile>;
}
