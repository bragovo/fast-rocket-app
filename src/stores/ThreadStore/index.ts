import { makeAutoObservable } from "mobx";
import { MessageData } from "app/models";

export class ThreadStore {
  messages: MessageData[] = []

  constructor(messages: MessageData[]) {
    this.messages = messages

    makeAutoObservable(this)
  }
}
