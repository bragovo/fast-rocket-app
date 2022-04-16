import { makeAutoObservable, runInAction } from "mobx"
// import { MessageData } from "app/models";
import { MessageStore } from "../MessageStore"
import { MessageData } from "../MessageStore/models"
import { RoomsStore } from "../RoomsStore"
import { RoomData } from "../RoomsStore/models"
import { SpaceStore } from "../SpaceStore"
import { MessagesData } from "./models"

export class RoomStore {
  _id: string
  type: "group" | "channel"
  name: string
  ro = false
  messages: Record<string, MessageStore> = {}
  roomsStore: RoomsStore

  constructor(room: RoomData, type: "group" | "channel", roomStore: RoomsStore) {
    makeAutoObservable(this, { roomsStore: false })

    this._id = room._id
    this.type = type
    this.name = room.name
    this.ro = room.ro === true
    this.roomsStore = roomStore
  }

  addMessage = (message: MessageData) => {
    if (this.messages[message._id] === undefined) {
      this.messages[message._id] = new MessageStore(message)
    }
  }

  loadMessages = () => {
    if (this.type === "group" && this.roomsStore.rootStore.space !== false) {
      void this.loadGroupMessages(this.roomsStore.rootStore.space, this._id)
    }

    if (this.type === "channel" && this.roomsStore.rootStore.space !== false) {
      void this.loadChannelMessages(this.roomsStore.rootStore.space, this._id)
    }
  }

  loadGroupMessages = async (space: SpaceStore, groupId: string) => {
    const data = await space.getRequest<MessagesData>("/groups.messages", {
      roomId: groupId,
      query: JSON.stringify({
        tmid: {
          $exists: false,
        },
      }),
      sort: JSON.stringify({ ts: 1 }),
    })

    runInAction(() => {
      data.messages.forEach((message) => this.roomsStore.addMessage(groupId, message))
    })
  }

  loadChannelMessages = async (space: SpaceStore, channelId: string) => {
    const data = await space.getRequest<MessagesData>("/channels.messages", {
      roomId: channelId,
      query: JSON.stringify({
        tmid: {
          $exists: false,
        },
      }),
      sort: JSON.stringify({ ts: 1 }),
    })

    runInAction(() => {
      data.messages.forEach((message) => this.roomsStore.addMessage(channelId, message))
    })
  }

  get displayMessages(): MessageStore[] {
    return Object.entries(this.messages)
      .filter((o) => o[1].t === undefined)
      .map((o) => o[1])
  }

  get symbol(): string {
    return this.type === "channel" ? "#" : "&"
  }
}
