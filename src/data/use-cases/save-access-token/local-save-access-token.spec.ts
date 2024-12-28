import { faker } from '@faker-js/faker'

import { LocalSaveAccessToken } from '@/data/use-cases/save-access-token/local-save-access-token'
import { SetStorageSpy } from '@/data/test/mock-storage'

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy()

    const sut = new LocalSaveAccessToken(setStorageSpy)

    const accessToken = faker.string.uuid()

    await sut.save(accessToken)

    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
