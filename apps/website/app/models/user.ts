import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasMany, manyToMany } from "@adonisjs/lucid/orm";
import Account from "./account.js";
import { UserTypes } from "../../types/user.js";
import PromoterInfo from "./promoter_info.js";
import type { BelongsTo, HasMany, ManyToMany } from "@adonisjs/lucid/types/relations";
import PromoterProfile from "./promoter_profile.js";
import ParticipantProfile from "./participant_profile.js";
import Event from "./event.js";
import StaffProfile from "./staff_profile.js";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @column()
  declare email: string;

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null;

  @column()
  declare isAdmin: boolean;

  @hasMany(() => Account)
  declare accounts: HasMany<typeof Account>;

  // Referrals

  @column()
  declare referringPromoterId: number | null;

  @belongsTo(() => User, {
    foreignKey: "referringPromoterId",
  })
  declare referringPromoter: BelongsTo<typeof User>;

  @hasMany(() => User, {
    localKey: "id",
    foreignKey: "referringPromoterId",
  })
  declare indirectReferrals: HasMany<typeof User>;

  @manyToMany(() => Event)
  declare eventsRegistered: ManyToMany<typeof Event>;

  @manyToMany(() => Event, {
    pivotTable: "event_checkins",
  })
  public checkedInEvents!: ManyToMany<typeof Event>;

  @column()
  declare referrerId: number | null;

  @belongsTo(() => User, {
    foreignKey: "referrerId",
  })
  declare referrer: BelongsTo<typeof User>;

  @hasMany(() => User, {
    localKey: "id",
    foreignKey: "referrerId",
  })
  declare referrals: HasMany<typeof User>;

  // PromoterProfile

  @column()
  declare promoterProfileId: number | null;

  @belongsTo(() => PromoterProfile)
  declare promoterProfile: BelongsTo<typeof PromoterProfile>;

  // ParticipantProfile

  @column()
  declare participantProfileId: number | null;

  @belongsTo(() => ParticipantProfile)
  declare participantProfile: BelongsTo<typeof ParticipantProfile>;

  @column()
  declare points: number;

  @belongsTo(() => PromoterInfo)
  declare promoterInfo: BelongsTo<typeof PromoterInfo>;

  @column()
  declare staffProfileId: number | undefined;

  @belongsTo(() => StaffProfile)
  declare staffProfile: BelongsTo<typeof StaffProfile>;

  // Functions

  get role() {
    if (this.isStaff()) return "staff" as const;
    if (this.isParticipant()) return "participant" as const;
    if (this.isPromoter()) return "promoter" as const;
    return "unknown" as const;
  }

  isStaff() {
    return this.staffProfileId;
  }

  isPromoter() {
    return this.promoterProfileId !== null;
  }

  isParticipant() {
    return this.participantProfileId !== null;
  }

  isEmailVerified() {
    return this.emailVerifiedAt !== null;
  }

  groups() {
    const groups = [];

    if (this.participantProfile) groups.push(UserTypes.PARTICIPANT);

    if (this.promoterInfo) groups.push(UserTypes.PROMOTER);

    return groups;
  }

  wasReferred() {
    return this.referrerId !== null;
  }

  static async hasPurchasedTicket(user: User) {
    if (!user.isParticipant()) return false;

    await user.load("participantProfile");
    return !!user.participantProfile.purchasedTicket;
  }

  static async getReferringPromoter(user: User) {
    await user.load("referringPromoter");
    return user.referringPromoter;
  }

  static async getReferrer(user: User) {
    await user.load("referrer");
    return user.referrer;
  }
}
