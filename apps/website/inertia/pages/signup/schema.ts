import { z } from "zod";
import transports from "#data/enei/signup/transports.json" with { type: "json" };
import shirts from "#data/enei/signup/shirts.json" with { type: "json" };
import { getUniversityById } from "~/lib/enei/signup/universities";

const university = z
  .string()
  .nonempty({
    message: "A universidade é obrigatória.",
  })
  .refine((val) => !!getUniversityById(val));

const transportIds = transports.map((transport) => transport.id);
const transportLabels = transports.map((transport) => transport.description);

const transport = z.object({
  label: z.string().refine((val) => transportLabels.includes(val)),
  value: z.string().refine((val) => transportIds.includes(val)),
});

const shirtSize = z
  .string()
  .nonempty({ message: "Seleciona um tamanho" })
  .refine((val) => shirts.includes(val));

const termsAndConditions = z.boolean().refine((val) => val, {
  message: "Tens de concordar com os termos e condições",
});

// Schemas

export type PersonalInfo = z.output<typeof personalInfoSchema>;
export const personalInfoSchema = z.object({
  firstName: z.string().nonempty({
    message: "O nome é obrigatório.",
  }),

  lastName: z.string().nonempty({
    message: "O último nome é obrigatório.",
  }),

  dateOfBirth: z
    .date({
      message: "A data de nascimento é obrigatória.",
    })
    .max(new Date()),

  phone: z.string().nonempty({
    message: "O número de telefone é obrigatório.",
  }),

  municipality: z.string({ message: "Campo obrigatório" }).nonempty({
    message: "O município deve ter pelo menos 1 letra",
  }),
});

export type EducationInfo = z.output<typeof educationInfoSchema>;
export const educationInfoSchema = z.object({
  university,
  course: z.string().nonempty({
    message: "O curso é obrigatório.",
  }),
  curricularYear: z.union([
    z.tuple([z.enum(["1", "2", "3", "4", "5"]), z.literal(null)]),
    z.tuple([z.literal("already-finished"), z.number()]),
  ]),
});

export type LogisticsInfo = z.output<typeof logisticsInfoSchema>;
export const logisticsInfoSchema = z.object({
  shirtSize,
  dietaryRestrictions: z.string().optional(),
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  transports: z.array(transport),
});

export type CommunicationsInfo = z.output<typeof communicationsInfoSchema>;
export const communicationsInfoSchema = z.object({
  heardAboutEnei: z.string().min(1, { message: "Seleciona uma opção" }),
  participationReason: z.string().optional(),
  reasonForSignup: z.string().optional(),
  attendedBefore: z.boolean(),
  attendedBeforeEditions: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  termsAndConditions,
})

export type AdditionalInfo = z.output<typeof additionalInfoSchema>
export const additionalInfoSchema = z.object({
  about: z.string().optional(),
  github: z.union([z.literal(''), z.string().url({ message: 'URL inválida' })]),
  linkedin: z.union([z.literal(''), z.string().url({ message: 'URL inválida' })]),
  website: z.union([z.literal(''), z.string().url({ message: 'URL inválida' })]),
})
