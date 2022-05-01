// import { MessageData } from "app/models"

import { MessageData } from "app/stores/MessageStore/models"

export interface ChangeData {
  _id: string
  lastMessage?: MessageData
}
