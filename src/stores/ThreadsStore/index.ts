import { makeAutoObservable, runInAction } from "mobx";
import { MessageData, RoomData } from "app/models";
import { GroupStore } from "../GroupStore";
import { ThreadStore } from "../ThreadStore";
import { RootStore } from "../RootStore";
import { SpaceStore } from "../SpaceStore";


export class ThreadsStore {
  threads: Record<string, ThreadStore> = {}
  tmid: string | false = false
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
  }

  setThread = async (space: SpaceStore, tmid: string) => {
    if (!this.threads[tmid]) {
      await this.loadMessages(space, tmid)
    }

    runInAction(() => {
      this.tmid = tmid
    })
  }

  loadMessages = async (space: SpaceStore, tmid: string) => {
    const data = await space.getRequest<RoomData>(
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
