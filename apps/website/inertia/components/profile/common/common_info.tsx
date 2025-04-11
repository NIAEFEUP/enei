import {
  AdditionalInfo,
  additionalInfoSchema,
  CommunicationsInfo,
  communicationsInfoSchema,
  EducationInfo,
  educationInfoSchema,
  LogisticsInfo,
  logisticsInfoSchema,
  PersonalInfo,
  personalInfoSchema,
} from "~/pages/signup/schema";
import { z } from "zod";
import sizes from "#data/enei/signup/shirts.json" with { type: "json" };
import heardaboutfrom from "#data/enei/signup/heard-about.json" with { type: "json" };
import { Option } from "~/components/ui/multiple-selector";
import ParticipantProfile from "#models/participant_profile";
import { TRANSPORTS } from "~/lib/enei/signup/transports";
import { ENEI_EDITIONS } from "~/lib/enei/signup/editions";

export const INITIAL_MONTH = new Date(2004, 0, 1);
export const SIZES = sizes;
export const HEARD_ABOUT_FROM: Option[] = heardaboutfrom;

export type CommonInfo = PersonalInfo
  & EducationInfo
  & LogisticsInfo
  & CommunicationsInfo
  & AdditionalInfo;

export const commonSchema = z.object({
  ...personalInfoSchema.shape,
  ...educationInfoSchema.shape,
  ...logisticsInfoSchema.shape,
  ...communicationsInfoSchema.shape,
  ...additionalInfoSchema.shape,
});

export function profileToCommonInfo(
  profile: ParticipantProfile & { heardAboutEnei?: string },
): CommonInfo {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone,
    university: profile.university,
    course: profile.course,
    curricularYear: [
      profile.curricularYear as "1" | "2" | "3" | "4" | "5" | "already-finished",
      profile.finishedAt,
    ] as ["1" | "2" | "3" | "4" | "5", null] | ["already-finished", number],
    shirtSize: profile.shirtSize,
    dietaryRestrictions: profile.dietaryRestrictions ?? "",
    isVegetarian: profile.isVegetarian ? true : false,
    isVegan: profile.isVegan ? true : false,
    transports: TRANSPORTS.filter((transport) => profile.transports.includes(transport.value)),
    heardAboutEnei: profile.heardAboutEnei as string,
    reasonForSignup: profile.reasonForSignup ?? "",
    attendedBefore: profile.attendedBeforeEditions.length > 0,
    attendedBeforeEditions: ENEI_EDITIONS.filter((edition) =>
      profile.attendedBeforeEditions.includes(edition.value),
    ),
    about: profile.about ?? "",
    github: profile.github ?? "",
    linkedin: profile.linkedin ?? "",
    website: profile.website ?? "",
    dateOfBirth: new Date("2003-05-09"),
    municipality: profile.municipality,
    termsAndConditions: true,
  };
}
