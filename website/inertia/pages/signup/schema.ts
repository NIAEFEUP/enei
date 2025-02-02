import { z } from 'zod'
import universities from '#data/enei/universities.json' with { type: 'json' }
import transports from '#data/enei/signup/transports.json' with { type: 'json' }
import shirts from '#data/enei/signup/shirts.json' with { type: 'json' }

const universityIds = universities.map((university) => university.id)
const university = z.string().refine((val) => universityIds.includes(val))

const transportIds = transports.map((transport) => transport.id)
const transportLabels = transports.map((transport) => transport.description)

const transport = z.object({
  label: z.string().refine((val) => transportLabels.includes(val)),
  value: z.string().refine((val) => transportIds.includes(val)),
})

const shirtSize = z.string().refine((val) => shirts.includes(val))

const consent = z.boolean().refine((val) => val)

const personalInfoSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().email(),
  dateOfBirth: z.coerce.date().max(new Date()),
  phone: z.string().nonempty(),
  municipality: z.string().nonempty(),
})

const educationInfoSchema = z
  .object({
    university,
    course: z.string().nonempty(),
  })
  .and(
    z.union([
      z.object({
        curricularYear: z.string().nonempty(),
      }),
      z.object({
        completedYear: z.coerce.number().max(new Date().getFullYear()).nullable(),
      }),
    ])
  )

const logisticsInfoSchema = z.object({
  shirtSize,
  dietaryRestrictions: z.string().optional(),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  transports: z.array(transport),
})

const communicationsInfoSchema = z.object({
  heardAboutENEI: z.string().min(1, { message: 'Seleciona uma opção' }),
  participationReason: z.string().optional(),
  reasonForSignup: z.string().optional(),
  attendedBefore: z.boolean(),
  attendedBeforeEditions: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  termsAndConditions: consent,
  photoConsent: consent,
})

export type SignupInfo = z.output<typeof signupInfoSchema>
export const signupInfoSchema = personalInfoSchema
  .and(educationInfoSchema)
  .and(logisticsInfoSchema)
  .and(communicationsInfoSchema)
