import 'jest-localstorage-mock'
import { faker } from '@faker-js/faker'

import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()

    const key = faker.database.column()
    const value = faker.string.alphanumeric()

    await sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
