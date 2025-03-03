import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'
import { type SetStorage } from '@/data/protocols/cache'

export const makeLocalSaveAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}
