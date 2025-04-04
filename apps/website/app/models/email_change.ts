import { DateTime } from "luxon";
import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class ChangeEmail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare userId: number;

  @column()
  declare oldEmail: string;

  @column()
  declare newEmail: string;

  @column()
  declare oldEmailConfirmed: boolean;

  @column()
  declare newEmailConfirmed: boolean;

  @column()
  declare canceled: boolean;

  @column()
  declare performed: boolean;
}
