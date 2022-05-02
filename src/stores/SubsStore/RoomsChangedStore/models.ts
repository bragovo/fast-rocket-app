// import { MessageData } from "app/models"

import { MessageMentionData, MessageUserData } from "app/stores/MessageStore/models"

// import { MessageData } from "app/stores/MessageStore/models"

export interface RoomsChangedData {
  _id: string
  lastMessage?: {
    _id: string
    msg: string
    tmid?: string
    ts: {
      $date: number
    }
    mentions: MessageMentionData[]
    u: MessageUserData
  }
}
