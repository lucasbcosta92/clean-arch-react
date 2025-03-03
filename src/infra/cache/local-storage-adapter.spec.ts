import 'jest-localstorage-mock'
import { faker } from '@faker-js/faker'

import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'
import { type AccountModel } from '@/domain/models'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage.setItem with correct values', async () => {
    const sut = makeSut()

    const key = faker.database.column()

    const value: AccountModel = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName()
    }

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  test('Should call localStorage.getItem with correct value', async () => {
    const sut = makeSut()

    const key = faker.database.column()

    const value: AccountModel = {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName()
    }

    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))

    const storageObj = sut.get(key)

    expect(getItemSpy).toHaveBeenCalledWith(key)
    expect(storageObj).toEqual(value)
  })
})
