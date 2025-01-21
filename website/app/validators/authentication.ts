import vine from '@vinejs/vine'
import type { VineValidationError } from '../../types/validation.js'
import User from '#models/user'

export const registerWithCredentialsValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique({ table: User.table, column: 'email' }),

    password: vine.string().minLength(8).confirmed(),
  })
)

export const loginWithCredentialsValidator = vine.compile(
  vine.object({
    email: vine.string(),
    password: vine.string(),
  })
);

export const createUserValidatorErrorMessage = (error: VineValidationError) => {
  const rule = error.messages[0].rule

  switch (rule) {
    case 'email':
      return 'E-mail inválido'
    case 'minLength':
      return 'Palavra-passe tem de ter no mínimo 8 caratéres'
    case 'confirmed':
      return 'Palavras-passe não coincidem'
  }
}
