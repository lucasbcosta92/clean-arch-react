import React from 'react'

import { Signup } from '@/presentation/pages'

import { makeRemoteAddAccount } from '../../use-cases/add-account/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
