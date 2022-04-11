export interface MessageData {
  _id: string
  msg: string
  tcount?: number
  ts: Date
  t: string
  u: {
    _id: string
    name: string
    username: string
  }
}
