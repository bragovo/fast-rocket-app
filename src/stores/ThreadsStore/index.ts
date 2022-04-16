import { makeAutoObservable, runInAction } from "mobx";
import { ThreadStore } from "../ThreadStore";
import { RootStore } from "../RootStore";
import { SpaceStore } from "../SpaceStore";
import { MessagesData } from "../RoomStore/models";


export class ThreadsStore {
  threads: Record<string, ThreadStore> = {}
  tmid: string | false = false
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
  }

  setThread = (tmid: string) => {
    if (this.rootStore.space !== false) {
      if (this.threads[tmid] === undefined) this.threads[tmid] = new ThreadStore()
      void this.loadThreadMessages(this.rootStore.space, tmid)
    }
  }

  loadThreadMessages = async (space: SpaceStore, tmid: string) => {
    const data = await space.getRequest<MessagesData>(
      "/chat.getThreadMessages",
      {
        tmid: tmid,
        sort: JSON.stringify({ ts: 1 })
      }
    )

    runInAction(() => {
      this.tmid = tmid
      data.messages.forEach(message => this.threads[tmid].addMessage(message))
    })
  }
}
