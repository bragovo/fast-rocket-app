import { autorun, makeAutoObservable, runInAction } from "mobx"
import localForage from "localforage"

import { ThreadsStore } from "../ThreadsStore"
import { SpaceStore } from "../SpaceStore"
import { RoomsStore } from "../RoomsStore"
import { AuthStore } from "../AuthStore"

export class RootStore {
  initialized = false
  space: SpaceStore | false = false
  roomsStore: RoomsStore
  authStore: AuthStore
  threadsStore: ThreadsStore
  offline = false

  constructor() {
    makeAutoObservable(this)

    this.authStore = new AuthStore(this)
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

  // TODO: Clean up channels and other stores!!
  logout = async () => {
    await localForage.removeItem("authToken")
    await localForage.removeItem("userId")

    runInAction(() => {
      this.space = false
    })
  }
}
