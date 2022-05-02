import { makeAutoObservable } from "mobx"
import { SubscriptionData } from "../RoomsStore/models"
import { SpaceStore } from "../SpaceStore"
import { NotificationStore } from "./NotificationStore"
import { NotificationData } from "./NotificationStore/models"
import { RoomsChangedStore } from "./RoomsChangedStore"
import { RoomsChangedData } from "./RoomsChangedStore/models"
import { SubscriptionsChangedStore } from "./SubscriptionsChangedStore"

export class SubsStore {
  spaceStore: SpaceStore
  url: string
  ws: WebSocket
  initialized = false
  state = false
  alive?: boolean
  timeout?: NodeJS.Timeout
  roomsChangedStore: RoomsChangedStore
  notificationStore: NotificationStore
  subscriptionsChangedStore: SubscriptionsChangedStore
  // subs: Record<string, RoomChangedStore> = {}

  constructor(spaceStore: SpaceStore) {
    makeAutoObservable(this, { spaceStore: false })

    this.spaceStore = spaceStore
    this.alive = !spaceStore.rootStore.offline
    this.url = `${spaceStore.host.replace("https://", "wss://")}/websocket`
    this.ws = new WebSocket(this.url)
    this.roomsChangedStore = new RoomsChangedStore(this)
    this.notificationStore = new NotificationStore(this)
    this.subscriptionsChangedStore = new SubscriptionsChangedStore(this)
    this.initialize()
  }

  initialize = () => {
    this.ws.addEventListener("open", () => {
      this.ws.send(
        JSON.stringify({
          msg: "connect",
          version: "1",
          support: ["1"],
        })
      )

      this.ws.send(
        JSON.stringify({
          msg: "method",
          method: "login",
          id: "1",
          params: [{ resume: this.spaceStore.authToken }],
        })
      )

      this.ws.send(
        JSON.stringify({
          msg: "sub",
          id: this.roomsChangedStore.id,
          name: "stream-notify-user",
          params: [this.roomsChangedStore.eventName, false],
        })
      )

      this.ws.send(
        JSON.stringify({
          msg: "sub",
          id: this.notificationStore.id,
          name: "stream-notify-user",
          params: [this.notificationStore.eventName, false],
        })
      )

      this.ws.send(
        JSON.stringify({
          msg: "sub",
          id: this.subscriptionsChangedStore.id,
          name: "stream-notify-user",
          params: [this.subscriptionsChangedStore.eventName, false],
        })
      )

      // this.ws.send(JSON.stringify({
      //   msg: "sub",
      //   id: nanoid(),
      //   name: "stream-notify-user",
      //   params: [`${this.spaceStore.userId}/rooms-changed`, false]
      // }))

      // this.ws.send(JSON.stringify({
      //   msg: "sub",
      //   id: nanoid(),
      //   name: "stream-notify-user",
      //   params: [`${this.spaceStore.userId}/notification`, false]
      // }));

      this.heartbeat(10000)
    })

    this.ws.addEventListener("message", this.processMessage)
  }

  // TODO: R&D for heartbeat
  heartbeat = (ms: number) => {
    this.alive = false
    this.ws.send(JSON.stringify({ msg: "ping" }))

    this.timeout = setTimeout(() => {
      if (this.alive !== true) {
        if (this.ws.readyState !== WebSocket.OPEN && !this.spaceStore.rootStore.offline) {
          this.ws = new WebSocket(`${this.spaceStore.host.replace("https://", "wss://")}/websocket`)
          this.initialize()
        } else {
          this.ws.close()
          this.heartbeat(ms)
        }
      } else {
        this.heartbeat(ms)
      }
    }, ms)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processMessage = (event: MessageEvent<any>) => {
    const data = JSON.parse(event.data)
    if (data.msg === "ping") {
      this.ws.send(JSON.stringify({ msg: "pong" }))
    } else if (data.msg === "pong") {
      this.alive = true
    } else if (data.msg === "ready") {
      ;(data.subs as string[]).forEach((sub) => {
        if (this.roomsChangedStore.id === sub) {
          this.roomsChangedStore.setReady(true)
        }
      })
    } else if (data.msg === "result" && data.id === "1") {
      // this.roomChangedStore.initialize()
    } else if (data.msg === "changed") {
      if (data.collection === "stream-notify-user" && data.fields.eventName === this.roomsChangedStore.eventName) {
        this.roomsChangedStore.applyChange(data.fields.args[1] as RoomsChangedData)
      }

      if (
        data.collection === "stream-notify-user" &&
        data.fields.eventName === this.subscriptionsChangedStore.eventName
      ) {
        this.subscriptionsChangedStore.applyChange(data.fields.args[1] as SubscriptionData)
      }

      if (data.collection === "stream-notify-user" && data.fields.eventName === this.notificationStore.eventName) {
        this.notificationStore.sendNotification(data.fields.args[0] as NotificationData)
      }
    } else {
      console.log(data)
    }
  }
}
