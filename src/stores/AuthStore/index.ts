import { makeAutoObservable, runInAction } from "mobx"
import { RootStore } from "../RootStore"
import localForage from "localforage"
import { SpaceStore } from "../SpaceStore"

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID, SNOWPACK_PUBLIC_API_PATH: API_PATH } = import.meta.env
export class AuthStore {
  authToken?: string
  userId?: string
  rootStore: RootStore
  auth = false
  initialized = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
    void this.initialize()
  }

  initialize = async () => {
    const { userId, authToken } = await this.loadFromStorage()

    runInAction(() => {
      // TODO: Make "me" request
      if (userId !== null && authToken !== null) {
        this.auth = true
        this.rootStore.space = new SpaceStore(this.rootStore, SPACE_ID, API_PATH, userId, authToken)
      }

      this.initialized = true
    })
  }

  loadFromStorage = async (): Promise<{ userId: string | null; authToken: string | null }> => {
    const userId = await localForage.getItem<string>("userId")
    const authToken = await localForage.getItem<string>("authToken")

    return { userId, authToken }
  }
}
