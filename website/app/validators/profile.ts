import vine from '@vinejs/vine'
import universities from '#data/enei/universities.json' with { type: 'json' }
import districts from '#data/enei/districts.json' with { type: 'json' }
import editions from '#data/enei/editions.json' with { type: 'json' }
import transports from '#data/enei/signup/transports.json' with { type: 'json' }
import shirts from '#data/enei/signup/shirts.json' with { type: 'json' }
import heardaboutfrom from '#data/enei/signup/heard-about.json' with { type: 'json' }
import { DateTime } from 'luxon'

export const createProfileValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
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
