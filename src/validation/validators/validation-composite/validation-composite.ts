import { type FieldValidation } from '@/validation/protocols/field-validation'
import { type Validation } from '@/presentation/protocols/validation'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(validator => validator.field === fieldName)

    for (const validator of validators) {
      const error = validator.validate(fieldValue)

      if (error) {
        return error.message
      }
    }
  }
}
