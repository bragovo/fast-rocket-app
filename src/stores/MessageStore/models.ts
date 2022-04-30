export interface MessageData {
  _id: string
  msg: string
  tcount?: number
  ts: Date
  t: string
  mentions: MentionData[]
  u: {
    _id: string
    name: string
    username: string
  }
}

export interface MentionData {
  _id: string
  username: string
  name: string
  type: string
}
