import React from 'react'

import { AxiosHttpClient } from '@/infra/http'
import { Login } from '@/presentation/pages'
import { RemoteAuthentication } from '@/data/use-cases/authentication/remote-authentication'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators'

export const makeLogin: React.FC = () => {
  const url = 'http://fordevs.herokuapp.com/api/login'

  const axiosHttpClient = new AxiosHttpClient()

  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login authentication={remoteAuthentication} validation={validationComposite} />
  )
}
