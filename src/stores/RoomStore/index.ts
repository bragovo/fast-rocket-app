import { makeAutoObservable, runInAction } from "mobx"
import { MessageStore } from "../MessageStore"
import { MessageData } from "../MessageStore/models"
import { RoomsStore } from "../RoomsStore"
import { SubscriptionData } from "../RoomsStore/models"
import { SpaceStore } from "../SpaceStore"
import { MessagesData, RoomType } from "./models"

export class RoomStore {
  _id: string
  type: RoomType
  name: string
  alert: boolean
  unread: number
  messages: Record<string, MessageStore> = {}
  roomsStore: RoomsStore

  constructor(room: SubscriptionData, roomStore: RoomsStore) {
    makeAutoObservable(this, { roomsStore: false })

    this._id = room.rid
    this.type = room.t
    this.name = room.name
    this.alert = room.alert
    this.unread = room.unread
    this.roomsStore = roomStore
  }

  addMessage = (message: MessageData) => {
    if (this.messages[message._id] === undefined) {
      this.messages[message._id] = new MessageStore(message)
    }
  }

  loadMessages = () => {
    if (this.type === "p" && this.roomsStore.rootStore.space !== false) {
      void this.loadGroupMessages(this.roomsStore.rootStore.space, this._id)
    }

    if (this.type === "c" && this.roomsStore.rootStore.space !== false) {
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
    return this.type === "c" ? "#" : "&"
  }

  get isAlert(): boolean {
    return this.alert || this.unread > 0
  }

  get isRoom(): boolean {
    return this.type === "c" || this.type === "p"
  }
}
