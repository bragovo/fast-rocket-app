import { requestPermission, sendNotification } from "@tauri-apps/api/notification"
import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { SubsStore } from "../../SubsStore"
import { NotificationData } from "./models"

export class NotificationStore {
  id = nanoid()
  eventName: string
  subsStore: SubsStore
  ready = false

  constructor(subsStore: SubsStore) {
    makeAutoObservable(this, { subsStore: false })

    this.eventName = `${subsStore.spaceStore.userId}/notification`
    this.subsStore = subsStore
    void this.initialize()
  }

  initialize = async () => {
    await requestPermission()
  }

  setReady = (ready: boolean) => {
    this.ready = ready
  }

  sendNotification = (args: NotificationData) => {
    console.log({
      title: args.title,
      body: args.text,
    })

    sendNotification({
      title: args.title,
      body: args.text,
    })
  }
}
