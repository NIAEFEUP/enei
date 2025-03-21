/**
 * Types declared for error formats in the validators using vine
 */

export type VineValidationError = {
  code: string
  messages: Array<VineValidationErrorMessage>
}

export type VineValidationErrorMessage = {
  rule: string
  message: string
  field: string
}
