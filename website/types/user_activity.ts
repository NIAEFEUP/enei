export enum UserActivityType {
    Referral = 'referral',
    AttendEvent = 'attend_event',
    CompanyVisit = 'company_visit',
    CompletedChallenge = 'completed_challenge'
}

export type UserActivityDescription = {
    type: UserActivityType
    description: ReferralDescription | AttendEventDescription | CompanyVisitDescription | CompletedChallengeDescription
}
    
export type ReferralDescription = {
    referralCode: string
    referralUserId: number // The user that has the referral link may not be a promoter (e.g. may not be a student associatio)
    referredUserId: number
    // promoterId is used to determine if the referralUser is the promoter or only if the referral user was referred by the promoter 
    // thus giving the points to the promoter
    referralIsPromoter: boolean
    referralReferencedByPromoter?: boolean
    promoterId?: number 
    pointsToReferralUser?: number
    pointsToPromoter?: number
}

export type AttendEventDescription = {

}

export type CompanyVisitDescription = {

}

export type CompletedChallengeDescription = {

}