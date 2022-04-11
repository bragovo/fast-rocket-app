import { makeAutoObservable, runInAction } from "mobx";
// import { MessageData } from "app/models";
import { MessageStore } from "../MessageStore";
import { MessageData } from "../MessageStore/models";
import { RoomsStore } from "../RoomsStore";
import { SpaceStore } from "../SpaceStore";
import { RoomData } from "./models";

export class RoomStore {
  _id: string
  type: 'group' | 'channel'
  name: string
  messages: Record<string, MessageStore> = {}
  roomsStore: RoomsStore

  constructor(roomId: string, type: 'group' | 'channel', name: string, roomStore: RoomsStore) {
    makeAutoObservable(this, { roomsStore: false })

    this._id = roomId
    this.type = type
    this.name = name
    this.roomsStore = roomStore
  }

  addMessage = (message: MessageData) => {
    if (!this.messages[message._id]) {
      this.messages[message._id] = new MessageStore(message)
    }
  }

  loadMessages = () => {
    if (this.type === 'group' && this.roomsStore.rootStore.space) {
      this.loadGroupMessages(this.roomsStore.rootStore.space, this._id)
    }

    if (this.type === 'channel' && this.roomsStore.rootStore.space) {
      this.loadChannelMessages(this.roomsStore.rootStore.space, this._id)
    }
  }

  loadGroupMessages = async (space: SpaceStore, groupId: string) => {
    const data = await space.getRequest<RoomData>(
      "/groups.messages",
      {
        roomId: groupId,
        query: JSON.stringify({
          tmid: {
            "$exists": false
          }
        }),
        sort: JSON.stringify({ ts: 1 })
      }
    )

    runInAction(() => {
      data.messages.forEach(message => this.roomsStore.addMessage(groupId, message))
    })
  }

  loadChannelMessages = async (space: SpaceStore, channelId: string) => {
    const data = await space.getRequest<RoomData>(
      "/channels.messages",
      {
        roomId: channelId,
        query: JSON.stringify({
          tmid: {
            "$exists": false
          }
        }),
        sort: JSON.stringify({ ts: 1 })
      }
    )

    runInAction(() => {
      data.messages.forEach(message => this.roomsStore.addMessage(channelId, message))
    })
  }

  get displayMessages() {
    return Object.entries(this.messages).filter(o => !o[1].t).map(o => o[1])
  }

  get symbol () {
    return this.type === "channel" ? "#" : "&"
  }
}
