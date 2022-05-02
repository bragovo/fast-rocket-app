import { MessageData } from "app/stores/MessageStore/models"
import dayjs from "dayjs"
import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { SubsStore } from "../../SubsStore"
import { RoomsChangedData } from "./models"
// import { SpaceStore } from "../SpaceStore";

export class RoomsChangedStore {
  id = nanoid()
  eventName: string
  subsStore: SubsStore
  ready = false

  constructor(subsStore: SubsStore) {
    makeAutoObservable(this, { subsStore: false })

    this.eventName = `${subsStore.spaceStore.userId}/rooms-changed`
    this.subsStore = subsStore
  }

  initialize = () => {
    // this.subsStore.ws.addEventListener('open', () => {
    // })
  }

  setReady = (ready: boolean) => {
    this.ready = ready
  }

  applyChange = (args: RoomsChangedData) => {
    if (args.lastMessage !== undefined && args.lastMessage.tmid === undefined) {
      const lastMessage: MessageData = {
        ...args.lastMessage,
        ts: dayjs(args.lastMessage.ts.$date).toISOString(),
      }
      this.subsStore.spaceStore.rootStore.roomsStore.addMessage(args._id, lastMessage)
    }
  }
}
