import { RootStore } from "./stores/RootStore"
import localForage from "localforage"

const loadSpaceFromStorage = async (): Promise<{ userId: string | null; authToken: string | null }> => {
  const userId = await localForage.getItem<string>("userId")
  const authToken = await localForage.getItem<string>("authToken")

  return { userId, authToken }
}

const rootStore = new RootStore(loadSpaceFromStorage)

export function useRootContext(): RootStore {
  return rootStore
}
