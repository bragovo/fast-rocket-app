import { makeAutoObservable, runInAction } from "mobx"
import { RootStore } from "../RootStore"
import { SpaceStore } from "../SpaceStore"
import { RoomStore } from "../RoomStore"
import { ChannelsData, GroupsData } from "./models"
import { MessageData } from "../MessageStore/models"

export class RoomsStore {
  rooms: Record<string, RoomStore> = {}
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
  }

  initialize = (space: SpaceStore) => {
    void this.loadGroups(space)
    void this.loadChannels(space)
  }

  loadGroups = async (space: SpaceStore) => {
    const data = await space.getRequest<GroupsData>("/groups.list", {})

    runInAction(() => {
      data.groups.forEach((group) => {
        this.rooms[group._id] = new RoomStore(group, "group", this)
      })
    })
  }

  loadChannels = async (space: SpaceStore) => {
    const data = await space.getRequest<ChannelsData>("/channels.list.joined", {})

    runInAction(() => {
      data.channels.forEach((channel) => {
        this.rooms[channel._id] = new RoomStore(channel, "channel", this)
      })
    })
  }

  get displayRooms(): RoomStore[] {
    return Object.entries(this.rooms)
      .map((o) => o[1])
      .sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
          return -1
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
          return 1
        }
        return 0
      })
  }

  addMessage = (roomId: string, message: MessageData) => {
    if (this.rooms[roomId] !== undefined) {
      this.rooms[roomId].addMessage(message)
    }
  }
}
