import vine from '@vinejs/vine'
import universities from '#data/enei/universities.json' with { type: 'json' }
import states from '#data/location-input/states.json' with { type: 'json' }
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
      .mobile()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('phone', value)
          .first()
        return !user
      }),
    university: vine.string().in(universities.map((val) => val.id)),
    course: vine.string(),
    curricularYear: vine.number().range([1, 6]),
    finishedAt: vine.number().range([1930, new Date().getFullYear()]),
    municipality: vine.string().in(states.map((state) => state.name)),
    tShirtSize: vine.string().in(['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']),
    dietaryRestrictions: vine.string().trim().escape(),
    isVegetarian: vine.boolean(),
    isVegan: vine.boolean(),
    transportationModes: vine.array(vine.string()),
    heardAboutENEI: vine.string(),
    reasonForSignup: vine.string(),
    attendedBeforeEditions: vine.array(vine.string()),
  })
)
