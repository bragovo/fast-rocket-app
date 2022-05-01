import { SubscriptionData } from "app/stores/RoomsStore/models"
import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { SubsStore } from "../../SubsStore"
// import { ChangeData } from "./models"
// import { SpaceStore } from "../SpaceStore";

export class SubscriptionsChangedStore {
  id = nanoid()
  eventName: string
  subsStore: SubsStore
  ready = false

  constructor(subsStore: SubsStore) {
    makeAutoObservable(this, { subsStore: false })

    this.eventName = `${subsStore.spaceStore.userId}/subscriptions-changed`
    this.subsStore = subsStore
  }

  initialize = () => {
    // this.subsStore.ws.addEventListener('open', () => {
    // })
  }

  setReady = (ready: boolean) => {
    this.ready = ready
  }

  applyChange = (args: SubscriptionData) => {
    console.log("SubscriptionsChangeData")
    console.log(args)
    this.subsStore.spaceStore.rootStore.roomsStore.createOrUpdateRoom(args)
    // this.subsStore.spaceStore.rootStore.roomsStore.addMessage(args._id, args.lastMessage)
  }
}
