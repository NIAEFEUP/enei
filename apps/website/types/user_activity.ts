import type User from "#models/user";

export type UserActivityInformation = {
  [key: string]: any;
};

export enum UserActivityType {
  Referral = "referral",
  AttendEvent = "attend_event",
  CompanyVisit = "company_visit",
  CompanyLike = "company_like",
  CompletedChallenge = "completed_challenge",
}

export type UserActivityDescription = {
  description:
    | ReferralDescription
    | AttendEventDescription
    | CompanyVisitDescription
    | CompanyLikeDescription
    | CompletedChallengeDescription;
};

export type ReferralDescription = {
  type: UserActivityType.Referral;
  referralCode: string;
  referralUser: User; // The user that has the referral link may not be a promoter (e.g. may not be a student associatio)
  referredUser: User;
  // promoterId is used to determine if the referralUser is the promoter or only if the referral user was referred by the promoter
  // thus giving the points to the promoter
  referralIsPromoter: boolean;
  referralReferencedByPromoter?: boolean;
  promoterId?: number;
  pointsToReferralUser?: number;
  pointsToPromoter?: number;
};

export type AttendEventDescription = {
  type: UserActivityType.AttendEvent;
};

export type CompanyVisitDescription = {
  type: UserActivityType.CompanyVisit;
};

export type CompletedChallengeDescription = {
  type: UserActivityType.CompletedChallenge;
};

export type CompanyLikeDescription = {
  companyId: number;
  likedBy: string;
};
