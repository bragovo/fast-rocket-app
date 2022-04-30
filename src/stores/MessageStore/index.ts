// import { MessageData } from "app/models";

import { MentionData, MessageData } from "./models"
import dayjs, { Dayjs } from "dayjs"

export class MessageStore {
  _id: string
  msg: string
  t: string
  ts: Dayjs
  tcount?: number
  mentions: MentionData[]
  u: {
    _id: string
    username: string
    name: string
  }

  constructor(message: MessageData) {
    console.log(message)
    this._id = message._id
    this.msg = message.msg
    this.t = message.t
    this.tcount = message.tcount
    this.mentions = message.mentions
    this.u = message.u
    this.ts = dayjs(message.ts)
  }
}
