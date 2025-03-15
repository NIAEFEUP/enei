import vine from '@vinejs/vine'
import universities from "@enei/data/districts"
import { DateTime } from 'luxon'
import districts from '@enei/data/districts'
import shirts from '@enei/data/signup/shirts'
import transports from '@enei/data/signup/transports'
import heardaboutfrom from '@enei/data/signup/heard-about'
import editions from '@enei/data/editions'

export const createProfileValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    slug: vine.string(),
    dateOfBirth: vine
      .date({ formats: { utc: true } })
      .transform((date) => DateTime.fromJSDate(date)),
    phone: vine
      .string()
      .mobile(),
    university: vine.string().in(universities.map((val) => val.id)),
    course: vine.string(),
    curricularYear: vine.string().in(['1', '2', '3', '4', '5', 'already-finished']),
    finishedAt: vine.number().range([1930, new Date().getFullYear()]).nullable(),
    municipality: vine.string().in(districts.map((dist) => dist.id)),
    shirtSize: vine.string().in(shirts),
    dietaryRestrictions: vine.string().trim().escape().nullable(),
    isVegetarian: vine.boolean(),
    isVegan: vine.boolean(),
    transports: vine.array(vine.string().in(transports.map((item) => item.id))),
    heardAboutENEI: vine.string().in(heardaboutfrom.map((item) => item.value)),
    reasonForSignup: vine.string().nullable(),
    attendedBeforeEditions: vine.array(vine.string().in(editions.map((item) => item.year.toString()))),
  })
)
