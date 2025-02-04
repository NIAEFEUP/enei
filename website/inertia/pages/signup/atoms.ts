import { atomWithStorage } from "jotai/utils";
import { PersonalInfo } from "./schema";

export const personalInfoAtom = atomWithStorage<PersonalInfo | null>("enei:signup:personal-info:v1", null)

// export const educationInfoAtom = atomWithStorage<EducationInfo | null>("enei:signup:education-info:v1", {

// })

// export const logisticsInfoAtom = atomWithStorage("enei:signup:logistics-info:v1", {

// })

// export const communicationsInfoAtom = atomWithStorage("enei:signup:communications-info:v1", {

// })

