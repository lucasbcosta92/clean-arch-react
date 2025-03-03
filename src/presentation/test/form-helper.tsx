import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (

  fieldName: string,
  validationError: string = ''
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrapper`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testChildCount = (
  fieldName: string,
  count: number
): void => {
  const formStatus = screen.getByTestId(fieldName)
  expect(formStatus.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (
  fieldName: string,
  value = faker.lorem.word()
): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName)
  expect(element).toBeTruthy()
}

export const testElementText = (
  fieldName: string,
  text: string
): void => {
  const element = screen.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}
