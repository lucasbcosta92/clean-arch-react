import { type AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'

import { makeLocalSaveAdapter } from '../factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }

  makeLocalSaveAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalSaveAdapter().get('account')
}
