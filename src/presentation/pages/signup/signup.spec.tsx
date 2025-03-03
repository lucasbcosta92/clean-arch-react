import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'

import { type AccountModel } from '@/domain/models'

import { AddAccountSpy, Helper, ValidationStub } from '@/presentation/test'
import { Signup } from '@/presentation/pages'
import { EmailInUseError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationStub = new ValidationStub()

  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Signup
          addAccount={addAccountSpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  name = faker.person.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Signup', () => {
  test('Should start with initial state', () => {
    const validationError = faker.lorem.sentence(3)

    makeSut({ validationError })

    Helper.testChildCount('form-status', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('should show name error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    makeSut({ validationError })

    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('should show email error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('should show password error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    makeSut({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.lorem.sentence(3)

    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('should show name valid state if validation succeeds', () => {
    makeSut()

    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test('should show email valid state if validation succeeds', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test('should show password valid state if validation succeeds', () => {
    makeSut()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test('should show passwordConfirmation valid state if validation succeeds', () => {
    makeSut()

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test('should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    Helper.testElementExists('spinner')
  })

  test('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()

    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({ name, email, password, passwordConfirmation: password })
  })

  test('should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should not call AddAccount if form is invalid', async () => {
    const validationError = faker.lorem.sentence(3)

    const { addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()

    const error = new EmailInUseError()

    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    await simulateValidSubmit()

    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('form-status', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to SignUp page', async () => {
    makeSut()

    const signup = screen.getByTestId('login-link')

    fireEvent.click(signup)

    expect(history.location.pathname).toBe('/login')
  })
})
