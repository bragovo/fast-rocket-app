// import { MessageData } from "app/models";

import { MessageData } from "./models"

export class MessageStore {
  _id: string
  msg: string
  t: string
  tcount?: number
  u: {
    _id: string
    username: string
    name: string
  }

  constructor(message: MessageData) {
    this._id = message._id
    this.msg = message.msg
    this.t = message.t
    this.tcount = message.tcount
    this.u = message.u
  }
}
