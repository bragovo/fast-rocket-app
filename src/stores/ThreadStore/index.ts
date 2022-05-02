import { makeAutoObservable } from "mobx"
import { MessageStore } from "../MessageStore"
import { MessageData } from "../MessageStore/models"

export class ThreadStore {
  messages: Record<string, MessageStore> = {}

  constructor() {
    makeAutoObservable(this)
  }

  addMessage = (message: MessageData) => {
    if (this.messages[message._id] === undefined) {
      this.messages[message._id] = new MessageStore(message)
    }
  }

  get displayMessages(): MessageStore[] {
    return Object.entries(this.messages).map((o) => o[1])
  }
}
