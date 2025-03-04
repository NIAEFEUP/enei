import { DateTime } from "luxon";
import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare requestId: string;

  @column()
  declare userId: number;

  @column()
  declare name: string;

  @column()
  declare nif: number;

  @column()
  declare address: string;

  @column()
  declare status: string;

  @column()
  declare total: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
