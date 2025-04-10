import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import User from "./user.js";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import type { UserActivityDescription } from "../../types/user_activity.js";
import { json } from "#lib/lucid/decorators.js";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

const userActivityRelations = lazy(() => relations(UserActivity, (r) => [r.belongsTo("user")]));

export default class UserActivity extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @column()
  declare type: string;

  @json()
  declare description: UserActivityDescription;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  get $relations() {
    return userActivityRelations.get().for(this);
  }
}
