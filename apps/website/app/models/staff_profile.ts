import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import Department from "./department.js";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";

export default class StaffProfile extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @belongsTo(() => Department)
  declare department: BelongsTo<typeof Department>;

  @column()
  declare departmentId: number;

  @column()
  declare isAdmin: boolean;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
