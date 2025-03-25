import { LocalStorageAdapter } from '@/infra/cache/local-storage-adatpter'

export const makeLocalSaveAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
