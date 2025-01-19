import vine from '@vinejs/vine'
import { VineValidationError } from '../../types/validation.js'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).confirmed(),
  })
)

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
