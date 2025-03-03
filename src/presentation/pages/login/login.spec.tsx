import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { faker } from '@faker-js/faker'

import { type AccountModel } from '@/domain/models'

import { ApiContext } from '@/presentation/contexts'
import { AuthenticationSpy, Helper, ValidationStub } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = new ValidationStub()
  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router navigator={history} location={history.location}>
        <Login
          authentication={authenticationSpy}
          validation={validationStub}
        />
      </Router>
    </ApiContext.Provider>
  )

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const form = screen.getByTestId('form')
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login page', () => {
  test('should start with initial state', () => {
    const validationError = faker.lorem.sentence(3)

    makeSut({ validationError })

    Helper.testChildCount('form-status', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
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

  test('should enable submit button if for is valid', () => {
    makeSut()

    Helper.populateField('email')
    Helper.populateField('password')
    Helper.testButtonIsDisabled('submit', false)
  })

  test('should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    Helper.testElementExists('spinner')
  })

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.lorem.sentence(3)

    const { authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()

    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    Helper.testElementText('main-error', error.message)
    Helper.testChildCount('form-status', 1)
  })

  test('should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to SignUp page', async () => {
    makeSut()

    const signup = screen.getByTestId('signup-link')

    fireEvent.click(signup)

    expect(history.location.pathname).toBe('/signup')
  })
})
