import { makeAutoObservable, runInAction } from "mobx";
import { getRequest } from "services/getRequest";
import { MessageData, RoomData } from "app/models";
import { GroupStore } from "../GroupStore";
import { ThreadStore } from "../ThreadStore";


export class ThreadsStore {
  threads: Record<string, ThreadStore> = {}
  tmid: string | false = false

  constructor() {
    makeAutoObservable(this)
  }

  setThread = async (tmid: string) => {
    if (!this.threads[tmid]) {
      await this.loadMessages(tmid)
    }

    runInAction(() => {
      this.tmid = tmid
    })
  }

  loadMessages = async (tmid: string) => {
    const data = await getRequest<RoomData>(
      "/chat.getThreadMessages",
      {
        tmid: tmid,
        sort: JSON.stringify({ ts: 1 })
      }
    )

    runInAction(() => {
      this.threads[tmid] = new ThreadStore(data.messages)
    })
  }
}
