import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasOne } from "@adonisjs/lucid/orm";
import Department from "./department.js";
import type { BelongsTo, HasOne } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
import { lazy } from "#lib/lazy.js";
import { relations } from "#lib/lucid/relations.js";

const staffProfileRelations = lazy(() =>
  relations(StaffProfile, (r) => [r.belongsTo("department")]),
);

export default class StaffProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare departmentId: number;

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>;

  @hasOne(() => User)
  declare user: HasOne<typeof User>;

  @column()
  declare isAdmin: boolean;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  get $relations() {
    return staffProfileRelations.get().for(this);
  }
}
