import { CommunicationsInfo, EducationInfo, LogisticsInfo, PersonalInfo } from './schema'
import { atom } from 'jotai/vanilla'

export const personalInfoAtom = atom<PersonalInfo | null>(
  null
)

export const educationInfoAtom = atom<EducationInfo | null>(
  null
)

export const logisticsInfoAtom = atom<LogisticsInfo | null>(
  null
)

export const communicationsInfoAtom = atom<CommunicationsInfo | null>(
  null
)
