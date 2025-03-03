import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, type MemoryHistory } from 'history'

import { PrivateRoute } from '@/presentation/components'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })

  render(
    <Router navigator={history} location={history.location}>
      <PrivateRoute />
    </Router>
  )

  return { history }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/login')
  })
})
