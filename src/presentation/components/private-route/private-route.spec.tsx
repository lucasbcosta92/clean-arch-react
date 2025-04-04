import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, type MemoryHistory } from 'history'

import { PrivateRoute } from '@/presentation/components'
import ApiContext from '@/presentation/contexts/api/api-context'

import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router navigator={history} location={history.location}>
        <PrivateRoute element={<div />} />
      </Router>
    </ApiContext.Provider>
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/')
  })
})
