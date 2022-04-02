import { makeAutoObservable } from "mobx";
import { MessageData } from "app/models";

export class ChannelStore {
  messages: MessageData[] = []

  constructor(messages: MessageData[]) {
    this.messages = messages

    makeAutoObservable(this)
  }
}
