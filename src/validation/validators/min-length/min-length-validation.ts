import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly minLength: number
  ) {}

  validate (input: object): InvalidFieldError {
    return input[this.field]?.length < this.minLength ? new InvalidFieldError() : null
  }
}
