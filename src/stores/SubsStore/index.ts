import { makeAutoObservable } from 'mobx'
import { SpaceStore } from "../SpaceStore";
import { NotificationStore } from "./NotificationStore";
import { NotificationData } from "./NotificationStore/models";
import { RoomChangedStore } from "./RoomChangedStore";
import { ChangeData } from "./RoomChangedStore/models";

export class SubsStore {
  spaceStore: SpaceStore
  url: string
  ws: WebSocket
  initialized = false
  state = false
  alive?: boolean
  timeout?: NodeJS.Timeout
  roomChangedStore: RoomChangedStore
  notificationStore: NotificationStore
  // subs: Record<string, RoomChangedStore> = {}

  constructor(spaceStore: SpaceStore) {
    makeAutoObservable(this, { spaceStore: false })

    this.spaceStore = spaceStore
    this.alive = !spaceStore.rootStore.offline
    this.url = `${spaceStore.host.replace("https://", "wss://")}/websocket`
    this.ws = new WebSocket(this.url);
    this.roomChangedStore = new RoomChangedStore(this)
    this.notificationStore = new NotificationStore(this)
    this.initialize()
  }

  initialize = () => {
    this.ws.addEventListener('open', () =>  {
      this.ws.send(JSON.stringify({
        msg: "connect",
        version: "1",
        support: ["1"]
      }))

      this.ws.send(JSON.stringify({
        msg: "method",
        method: "login",
        id: "1",
        params: [{ resume: this.spaceStore.authToken }]
      }))

      this.ws.send(JSON.stringify({
        msg: "sub",
        id: this.roomChangedStore.id,
        name: "stream-notify-user",
        params: [this.roomChangedStore.eventName, false]
      }))

      this.ws.send(JSON.stringify({
        msg: "sub",
        id: this.notificationStore.id,
        name: "stream-notify-user",
        params: [this.notificationStore.eventName, false]
      }))

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

    this.ws.addEventListener('message', this.processMessage);
  }

  // TODO: R&D for heartbeat
  heartbeat = (ms: number) => {
    this.alive = false
    this.ws.send(JSON.stringify({ msg: "ping" }))

    this.timeout = setTimeout(() => {
      if (this.alive !== true) {
        if (this.ws.readyState !== WebSocket.OPEN && !this.spaceStore.rootStore.offline) {
          this.ws = new WebSocket(`${this.spaceStore.host.replace("https://", "wss://")}/websocket`);
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
    if(data.msg === "ping") {
      this.ws.send(JSON.stringify({ msg: "pong" }))
    } else if (data.msg === "pong") {
      this.alive = true
    } else if (data.msg === "ready") {
      (data.subs as string[]).forEach((sub) => {
        if (this.roomChangedStore.id === sub) {
          this.roomChangedStore.setReady(true)
        }
      })
    } else if (data.msg === "result" && data.id === "1") {
      // this.roomChangedStore.initialize()
    } else if (data.msg === "changed") {
      if (data.collection === "stream-notify-user" && data.fields.eventName === this.roomChangedStore.eventName) {
        this.roomChangedStore.applyChange(data.fields.args[1] as ChangeData)
      }

      if (data.collection === "stream-notify-user" && data.fields.eventName === this.notificationStore.eventName) {
        console.log(data.fields.args[0])
        this.notificationStore.sendNotification(data.fields.args[0] as NotificationData)
      }

    } else {
      console.log(data)
    }
  }
}
