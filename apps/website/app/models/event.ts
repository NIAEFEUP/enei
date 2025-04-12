import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, manyToMany } from "@adonisjs/lucid/orm";
import SpeakerProfile from "./speaker_profile.js";
import type { BelongsTo, ManyToMany } from "@adonisjs/lucid/types/relations";
import User from "./user.js";
import ProductGroup from "./product_group.js";
import Product from "./product.js";
import { relations } from "#lib/lucid/relations.js";
import { lazy } from "#lib/lazy.js";
import Company from "./company.js";

const eventRelations = lazy(() =>
  relations(Event, (r) => [
    r.many("checkedInUsers"),
    r.belongsTo("product"),
    r.belongsTo("productGroup"),
    r.many("registeredUsers"),
    r.many("speakers"),
    r.many("companies"),
    r.belongsTo("participationProduct"),
  ]),
);

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
  declare type:
    | "workshop"
    | "other"
    | "night"
    | "talk"
    | "networking"
    | "competition"
    | "meal"
    | "painel";

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

  @manyToMany(() => User, {
    pivotTable: "event_checkins",
  })
  public checkedInUsers!: ManyToMany<typeof User>;

  @manyToMany(() => Company, {
    pivotTable: "event_companies",
  })
  public companies!: ManyToMany<typeof Company>;

  @column()
  declare registrationRequirements: string;

  @column()
  declare requiresRegistration: boolean;

  @column()
  declare ticketsTotal: number;

  @column()
  declare ticketsRemaining: number;

  @column()
  declare participationProductId: number | null;

  @belongsTo(() => Product, {
    foreignKey: "participationProductId",
  })
  declare participationProduct: BelongsTo<typeof Product>;

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
    return false;
  }

  public getFormattedTime() {
    const endTime = this.date.plus({ minutes: this.duration });
    return `${this.date.toFormat("HH:mm")} - ${endTime.toFormat("HH:mm")}`;
  }

  get $relations() {
    return eventRelations.get().for(this);
  }
}
