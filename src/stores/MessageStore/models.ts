export interface MessageData {
  _id: string
  msg: string
  tcount?: number
  ts: string
  t?: MessageDataType
  mentions: MessageMentionData[]
  u: MessageUserData
}

export type MessageDataType = "uj"

export interface MessageMentionData {
  _id: string
  username: string
  name: string
  type: string
}

export interface MessageUserData {
  _id: string
  name: string
  username: string
}
