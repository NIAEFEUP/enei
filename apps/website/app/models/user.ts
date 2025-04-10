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
import { attachment } from "@jrmc/adonis-attachment";
import type { Attachment } from "@jrmc/adonis-attachment/types/attachment";

import { Github, Globe, Linkedin } from "lucide-react";
import SpeakerProfile from "./speaker_profile.js";
import RepresentativeProfile from "./representative_profile.js";

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

  @belongsTo(() => RepresentativeProfile)
  declare representativeProfile: BelongsTo<typeof RepresentativeProfile>;

  @column()
  declare representativeProfileId: number | null;

  // ParticipantProfile

  @column()
  declare participantProfileId: number | null;

  @belongsTo(() => ParticipantProfile)
  declare participantProfile: BelongsTo<typeof ParticipantProfile>;

  @column()
  declare speakerProfileId: number | null;

  @belongsTo(() => SpeakerProfile)
  declare speakerProfile: BelongsTo<typeof SpeakerProfile>;

  @column()
  declare points: number;

  @belongsTo(() => PromoterInfo)
  declare promoterInfo: BelongsTo<typeof PromoterInfo>;

  @column()
  declare staffProfileId: number | undefined;

  @column()
  declare slug: string;

  @belongsTo(() => StaffProfile)
  declare staffProfile: BelongsTo<typeof StaffProfile>;

  // Attachments
  @attachment({
    folder: "resumes",
  })
  declare resume: Attachment | null;

  @attachment({
    folder: "avatars",
    variants: ["thumbnail"],
  })
  declare avatar: Attachment | null;

  // Functions

  get role() {
    if (this.isStaff()) return "staff" as const;
    if (this.isParticipant()) return "participant" as const;
    if (this.isPromoter()) return "promoter" as const;
    if (this.isRepresentative()) return "representative" as const;
    return "unknown" as const;
  }

  isRepresentative() {
    return this.representativeProfileId;
  }

  isStaff() {
    return !!this.staffProfile;
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

  static getName(user: User) {
    if (user.speakerProfile) {
      return {
        firstName: user.speakerProfile.firstName,
        lastName: user.speakerProfile.lastName,
      };
    }

    if (user.participantProfile)
      return {
        firstName: user.participantProfile.firstName,
        lastName: user.participantProfile.lastName,
      };

    if (user.representativeProfile)
      return {
        firstName: user.representativeProfile.firstName,
        lastName: user.representativeProfile.lastName,
      };
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
