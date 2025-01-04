import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    return input[this.field] !== input[this.fieldToCompare] ? new InvalidFieldError() : null
  }
}
