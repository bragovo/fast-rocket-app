import { makeAutoObservable, runInAction } from "mobx"
import { SpaceStore } from "../SpaceStore"
import { MeData } from "./models"

export class MeStore {
  name: string = ""
  username: string = ""
  avatarUrl: string = ""
  status: string = ""
  nickname?: string
  spaceStore: SpaceStore

  constructor(spaceStore: SpaceStore) {
    makeAutoObservable(this, { spaceStore: false })

    this.spaceStore = spaceStore
    void this.initialize()
  }

  initialize = () => {
    void this.loadMe()
  }

  loadMe = async () => {
    const data = await this.spaceStore.getRequest<MeData>("/me", {})

    console.log(data)

    runInAction(() => {
      this.name = data.name
      this.avatarUrl = data.avatarUrl
      this.username = data.username
      this.nickname = data.nickname
      this.status = data.status
    })
  }
}
