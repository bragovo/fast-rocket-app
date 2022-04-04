import { RootStore } from './stores/RootStore'
import localForage from "localforage";

const loadSpaceFromStorage = async () => {
  const userId = await localForage.getItem<string>('userId')
  const authToken = await localForage.getItem<string>('authToken')

  return { userId, authToken }
}

const { userId, authToken } = await loadSpaceFromStorage()

const rootStore = new RootStore(userId ?? undefined, authToken ?? undefined)

export function useRootContext(): RootStore {
  return rootStore
}

