import { faker } from '@faker-js/faker/.'

import { type AuthenticationParams } from '../use-cases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
