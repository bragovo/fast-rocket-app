import { makeAutoObservable } from "mobx";
import { AuthStore } from "../AuthStore";
import { ChannelsStore } from "../ChannelsStore";
import { GroupsStore } from "../GroupsStore";

export class RootStore {
  authStore: AuthStore
  channelsStore: ChannelsStore
  groupsStore: GroupsStore

  constructor() {
    makeAutoObservable(this)

    this.authStore = new AuthStore()
    this.channelsStore = new ChannelsStore()
    this.groupsStore = new GroupsStore()
  }
}
