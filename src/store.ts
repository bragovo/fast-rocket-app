import { makeAutoObservable, runInAction } from "mobx";
import { ChannelData, ChannelsData, GroupData, GroupsData } from "./models";
import { getRequest } from "./services/getRequest";
// const { SNOWPACK_PUBLIC_AUTH_TOKEN: AUTH_TOKEN, SNOWPACK_PUBLIC_USER_ID: USER_ID } = import.meta.env

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

class AuthStore {
  authToken: string = 'AUTH_TOKEN'
  userId: string = 'USER_ID'

  constructor () {
    makeAutoObservable(this)

    // this.loadMe()
  }

  // loadMe = async (): Promise<void> => {
  //   const { data } = await axios.get("/me")

  //   console.log(data)
  // }
}

class ChannelsStore {
  channelsJoined: ChannelData[] = []

  constructor () {
    makeAutoObservable(this)

    this.loadChannels()
  }

  loadChannels = async () => {
    const data = await getRequest<ChannelsData>("/channels.list.joined", {})

    runInAction(() => {
      this.channelsJoined = data.channels
    })
  }
}

class GroupsStore {
  groups: GroupData[] = []

  constructor () {
    makeAutoObservable(this)

    this.loadGroups()
  }

  loadGroups = async () => {
    const data = await getRequest<GroupsData>("/groups.list", {})

    runInAction(() => {
      this.groups = data.groups
    })
  }
}
