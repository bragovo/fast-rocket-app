import { MessageData } from "../MessageStore/models"

export interface MessagesData {
  messages: MessageData[]
}

export type RoomType = "c" | "p" | "d"
