import { makeAutoObservable } from "mobx";
// import { MessageData } from "app/models";
import { MessageStore } from "../MessageStore";
import { MessageData } from "../MessageStore/models";

export class ThreadStore {
  messages: Record<string, MessageStore> = {}

  constructor() {
    makeAutoObservable(this)
  }

  addMessage = (message: MessageData) => {
    if (!this.messages[message._id]) {
      this.messages[message._id] = new MessageStore(message)
    }
  }

  get displayMessages() {
    // console.log(Object.entries(this.messages))
    // .filter(o => !o[1].t)
    return Object.entries(this.messages).map(o => o[1])
  }
}
