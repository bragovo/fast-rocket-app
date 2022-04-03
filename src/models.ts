export interface RoomData {
  messages: MessageData[]
}

export interface MessageData {
  _id: string
  msg: string
  ts: Date
  t: string
  u: {
    _id: string
    name: string
    username: string
  }
}
