import { getClient } from "@tauri-apps/api/http";
import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import { RootStore } from "../RootStore";
// import { MessageData } from "app/models";

export class SpaceStore {
  id = nanoid()
  url: string
  authToken: string
  userId: string
  client = getClient()
  rootStore: RootStore

  constructor(rootStore: RootStore, url: string, userId: string, authToken: string) {
    makeAutoObservable(this, { rootStore: false, client: false })

    this.rootStore = rootStore
    this.url = url
    this.authToken = authToken
    this.userId = userId
  }

  getRequest = async <T>(endpoint: string, query: Record<string, any>) => {
    const { data } = await (await this.client).get<T>(
      `${this.url}${endpoint}`,
      {
        query,
        headers: {
          "X-Auth-Token": this.authToken,
          "X-User-Id": this.userId
        }
      }
    )

    return data
  }
}
