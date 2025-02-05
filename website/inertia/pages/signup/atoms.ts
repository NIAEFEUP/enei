import { atomWithStorage } from 'jotai/utils'
import { CommunicationsInfo, EducationInfo, LogisticsInfo, PersonalInfo } from './schema'

export const personalInfoAtom = atomWithStorage<PersonalInfo | null>(
  'enei:signup:personal-info:v1',
  null
)

export const educationInfoAtom = atomWithStorage<EducationInfo | null>(
  'enei:signup:education-info:v1',
  null
)

export const logisticsInfoAtom = atomWithStorage<LogisticsInfo | null>(
  'enei:signup:logistics-info:v1',
  null
)

export const communicationsInfoAtom = atomWithStorage<CommunicationsInfo | null>(
  'enei:signup:communications-info:v1',
  null
)
