import vine from '@vinejs/vine'
import universities from '#data/enei/universities.json' with { type: 'json' }
import states from '#data/location-input/states.json' with { type: 'json' }
import countries from '#data/location-input/countries.json' with { type: 'json' }

export const createProfileValidator = vine.compile(
  vine.object({
    id: vine.number(),
    firstName: vine.string(),
    lastName: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    age: vine.number().min(18),
    phoneNumber: vine.string().mobile(),
    university: vine.string().in(universities),
    year: vine.number().range([1930, new Date().getFullYear()]),
    isComplete: vine.boolean(),
    state: vine.string().in(states.map((state) => state.name)),
    country: vine.string().in(countries.map((country) => country.name)),
    shirtSize: vine.string().in(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
    foodRestrictions: vine.string().trim().escape(),
    isVegetarian: vine.boolean(),
    transportation: vine.array(vine.string()),
    heardOf: vine.string(),
    whyAttend: vine.string(),
    previousExperience: vine.string(),
  })
)
