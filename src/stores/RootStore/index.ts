import { autorun, makeAutoObservable, runInAction } from "mobx"
import localForage from "localforage"

import { ThreadsStore } from "../ThreadsStore"
import { SpaceStore } from "../SpaceStore"
import { RoomsStore } from "../RoomsStore"

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID, SNOWPACK_PUBLIC_API_PATH: API_PATH } = import.meta.env

export class RootStore {
  initialized = false
  space: SpaceStore | false = false
  roomsStore: RoomsStore
  threadsStore: ThreadsStore
  offline = false

  constructor(loadSpaceFromStorage: () => Promise<{ userId: string | null; authToken: string | null }>) {
    makeAutoObservable(this)

    void loadSpaceFromStorage().then(({ userId, authToken }) => {
      if (userId !== null && authToken !== null) {
        this.space = new SpaceStore(this, SPACE_ID, API_PATH, userId, authToken)
      }
    })

    this.threadsStore = new ThreadsStore(this)
    this.roomsStore = new RoomsStore(this)

    this.initialize()
  }

  initialize = () => {
    autorun(() => {
      if (this.space !== false) {
        if (!this.offline) {
          this.roomsStore.initialize(this.space)
        }
      } else {
        // this.threadsStore.tmid = false
      }
    })

    window.addEventListener("online", this.setOnline)
    window.addEventListener("offline", this.setOffline)

    this.initialized = true
  }

  setOnline = () => {
    console.log("setOnline")

    this.offline = false
  }

  setOffline = () => {
    console.log("setOffline")

    this.offline = true
  }

  login = async (userId: string, authToken: string) => {
    await localForage.setItem("userId", userId)
    await localForage.setItem("authToken", authToken)

    runInAction(() => {
      this.space = new SpaceStore(this, SPACE_ID, API_PATH, userId, authToken)
    })
  }

  // TODO: Clean up channels and other stores!!
  logout = async () => {
    await localForage.removeItem("authToken")
    await localForage.removeItem("userId")

    runInAction(() => {
      this.space = false
    })
  }
}
