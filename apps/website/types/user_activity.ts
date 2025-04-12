import type Event from "#models/event";
import type User from "#models/user";

export type UserActivityInformation = {
  [key: string]: any;
};

export enum UserActivityType {
  Referral = "referral",
  AttendEvent = "attend_event",
  CompanyVisit = "company_visit",
  CompletedChallenge = "completed_challenge",
  RegisteredInEvent = "registered_in_event",
}

export type UserActivityDescription = {
  description:
    | ReferralDescription
    | AttendEventDescription
    | CompanyVisitDescription
    | CompletedChallengeDescription
    | RegisteredInEventDescription;
};

export type RegisteredInEventDescription = {
  type: UserActivityType.RegisteredInEvent;
  event: Event;
  user: User;
};

export type ReferralDescription = {
  type: UserActivityType.Referral;
  referralCode: string;
  referralUserId: User["id"]; // The user that has the referral link may not be a promoter (e.g. may not be a student associatio)
  referredUserId: User["id"];
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
  exit: boolean;
  event: Event;
  timestamp: string;
};

export type CompanyVisitDescription = {
  type: UserActivityType.CompanyVisit;
};

export type CompletedChallengeDescription = {
  type: UserActivityType.CompletedChallenge;
};
