import { UnexpectedError } from '@/domain/errors'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from './current-account-adapter'

import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'

jest.mock('@/infra/cache/local-storage-adatpter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()

    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should throw UnexpectedError', () => {
    expect(() => { setCurrentAccountAdapter(undefined) }).toThrow(new UnexpectedError())
  })

  test('should call LocalStorageAdapter.get with correct value', () => {
    const account = mockAccountModel()

    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)

    const storageObj = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(storageObj).toEqual(account)
  })
})
