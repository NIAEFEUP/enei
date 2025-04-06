import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasOne, manyToMany } from "@adonisjs/lucid/orm";
import SpeakerProfile from "./speaker_profile.js";
import type { BelongsTo, HasOne, ManyToMany } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
import type { Money } from "#lib/payments/money.js";
import { money } from "#lib/lucid/decorators.js";
import ProductGroup from "./product_group.js";
import Product from "./product.js";

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare title: string;

  @column()
  declare description: string | null;

  @column()
  declare type: string;

  @column()
  declare companyImage: string;

  @column.dateTime()
  declare date: DateTime;

  @column()
  declare duration: number;

  @column()
  declare location: string;

  @column()
  declare extraInfo: string | null;

  @column()
  declare isAcceptingRegistrations: boolean;

  @manyToMany(() => SpeakerProfile, {
    pivotTable: "event_speakers",
  })
  declare speakers: ManyToMany<typeof SpeakerProfile>;

  @manyToMany(() => User, {
    pivotTable: "event_users",
  })
  declare registeredUsers: ManyToMany<typeof User>;

  @column()
  declare registrationRequirements: string;

  @column()
  declare requiresRegistration: boolean;

  @column()
  declare ticketsTotal: number;

  @column()
  declare ticketsRemaining: number;

  @money()
  declare price: Money;

  @column()
  declare productGroupId: number;

  @column()
  declare productId: number;

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>;

  @belongsTo(() => ProductGroup)
  declare productGroup: BelongsTo<typeof ProductGroup>;

  public getFormattedDate() {
    return this.date.toFormat("dd-MM-yyyy");
  }

  get isPaid() {
    return this.productGroup?.products?.filter((product) => product.price.toCents() > 0).length > 0;
  }

  public getFormattedTime() {
    const endTime = this.date.plus({ minutes: this.duration });
    return `${this.date.toFormat("HH:mm")} - ${endTime.toFormat("HH:mm")}`;
  }
}
