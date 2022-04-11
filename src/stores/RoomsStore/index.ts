import { makeAutoObservable, runInAction } from "mobx";
// import { MessageData } from "app/models";
import { RootStore } from "../RootStore";
import { SpaceStore } from "../SpaceStore";
// import { GroupsData } from "../GroupsStore/models";
// import { ChannelsData } from "../ChannelsStore/models";
import { RoomStore } from "../RoomStore";
import { ChannelsData, GroupsData } from "./models";
import { MessageData } from "../MessageStore/models";

export class RoomsStore {
  rooms: Record<string, RoomStore> = {}
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
  }

  initialize = (space: SpaceStore) => {
    this.loadGroups(space)
    this.loadChannels(space)
  }

  loadGroups = async (space: SpaceStore) => {
    const data = await space.getRequest<GroupsData>("/groups.list", {})

    runInAction(() => {
      data.groups.forEach(group => {
        this.rooms[group._id] = new RoomStore(group._id, "group", group.name, this)
      })
    })
  }

  loadChannels = async (space: SpaceStore) => {
    const data = await space.getRequest<ChannelsData>("/channels.list.joined", {})

    runInAction(() => {
      data.channels.forEach(channel => {
        this.rooms[channel._id] = new RoomStore(channel._id, "channel", channel.name, this)
      })
    })
  }

  get displayRooms() {
    return Object.entries(this.rooms).map(o => o[1]).sort((a, b) => {
      if(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) { return -1; }
      if(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) { return 1; }
      return 0;
    })
  }

  addMessage = (roomId: string, message: MessageData) => {
    if (this.rooms[roomId]) {
      this.rooms[roomId].addMessage(message)
      // this.rooms[roomId] = new RoomStore(roomId)
    }
  }
}

