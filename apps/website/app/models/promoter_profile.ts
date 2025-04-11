import { DateTime } from "luxon";
import { BaseModel, column, hasOne } from "@adonisjs/lucid/orm";
import User from "./user.js";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

const promoterProfileRelations = lazy(() => relations(PromoterProfile, (r) => [r.hasOne("user")]));

export default class PromoterProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  get $relations() {
    return promoterProfileRelations.get().for(this);
  }
}
