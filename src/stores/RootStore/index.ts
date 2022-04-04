import { autorun, makeAutoObservable, runInAction } from "mobx";
import localForage from "localforage";

import { AuthStore } from "../AuthStore";
import { ChannelsStore } from "../ChannelsStore";
import { GroupsStore } from "../GroupsStore";
import { ThreadsStore } from "../ThreadsStore";
import { getClient } from "@tauri-apps/api/http";
import { SpaceStore } from "../SpaceStore";

const { SNOWPACK_PUBLIC_SPACE_ID: SPACE_ID, SNOWPACK_PUBLIC_API_PATH: API_PATH } = import.meta.env

export class RootStore {
  initialized = false
  space: SpaceStore | false = false
  channelsStore: ChannelsStore
  groupsStore: GroupsStore
  threadsStore: ThreadsStore

  constructor(userId?: string, authToken?: string) {
    makeAutoObservable(this)

    if (userId && authToken) {
      this.space = new SpaceStore(this, `${SPACE_ID}${API_PATH}`, userId, authToken)
    }

    this.channelsStore = new ChannelsStore(this)
    this.groupsStore = new GroupsStore(this)
    this.threadsStore = new ThreadsStore(this)

    this.initialize()
  }


  initialize = () => {
    autorun(() => {
      if (this.space) {
        this.channelsStore.loadChannels(this.space)
        this.groupsStore.loadGroups(this.space)
      } else {
        this.threadsStore.tmid = false
      }
    })

    this.initialized = true
  }

  login = async (userId: string, authToken: string) => {
    await localForage.setItem('userId', userId)
    await localForage.setItem('authToken', authToken)

    runInAction(() => {
      this.space = new SpaceStore(this, `${SPACE_ID}${API_PATH}`, userId, authToken)
    })
  }

  // TODO: Clean up channels and other stores!!
  logout = async () => {
    await localForage.removeItem('authToken')
    await localForage.removeItem('userId')

    runInAction(() =>  {
      this.space = false
    })
  }
}
