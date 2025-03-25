import React from 'react'

import { Login } from '@/presentation/pages'

import { makeLoginValidation } from '../../pages/login/login-validation-factory'
import { makeRemoteAuthentication } from '../../use-cases/authentication/remote-authentication-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
