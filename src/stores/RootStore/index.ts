import { makeAutoObservable } from "mobx";
import { AuthStore } from "../AuthStore";
import { ChannelsStore } from "../ChannelsStore";
import { GroupsStore } from "../GroupsStore";
import { ThreadsStore } from "../ThreadsStore";

export class RootStore {
  authStore: AuthStore
  channelsStore: ChannelsStore
  groupsStore: GroupsStore
  threadsStore: ThreadsStore

  constructor() {
    makeAutoObservable(this)

    this.authStore = new AuthStore()
    this.channelsStore = new ChannelsStore()
    this.groupsStore = new GroupsStore()
    this.threadsStore = new ThreadsStore()
  }
}
