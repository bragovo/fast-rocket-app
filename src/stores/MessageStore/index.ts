// import { MessageData } from "app/models";

import { MessageMentionData, MessageData, MessageDataType, MessageUserData } from "./models"
import dayjs, { Dayjs } from "dayjs"

export class MessageStore {
  _id: string
  msg: string
  t?: MessageDataType
  ts: Dayjs
  tcount?: number
  mentions: MessageMentionData[]
  u: MessageUserData

  constructor(message: MessageData) {
    this._id = message._id
    this.msg = message.msg
    this.t = message.t
    this.tcount = message.tcount
    this.mentions = message.mentions
    this.u = message.u
    this.ts = dayjs(message.ts)
  }
}
