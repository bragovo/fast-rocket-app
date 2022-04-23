import { getClient } from "@tauri-apps/api/http"
import { makeAutoObservable } from "mobx"
import { nanoid } from "nanoid"
import { MeStore } from "../MeStore"
import { RootStore } from "../RootStore"
import { SubsStore } from "../SubsStore"
// import { MessageData } from "app/models";

export class SpaceStore {
  id = nanoid()
  host: string
  path: string
  authToken: string
  userId: string
  client = getClient()
  subsStore: SubsStore
  rootStore: RootStore
  meStore: MeStore

  constructor(rootStore: RootStore, host: string, path: string, userId: string, authToken: string) {
    makeAutoObservable(this, { rootStore: false, client: false })

    this.rootStore = rootStore
    this.host = host
    this.path = path
    this.authToken = authToken
    this.userId = userId
    this.subsStore = new SubsStore(this)
    this.meStore = new MeStore(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRequest = async <T>(endpoint: string, query: Record<string, any>) => {
    const { data } = await (
      await this.client
    ).get<T>(`${this.host}${this.path}${endpoint}`, {
      query,
      headers: {
        "X-Auth-Token": this.authToken,
        "X-User-Id": this.userId,
      },
    })

    return data
  }

  postRequest = async <T>(endpoint: string, payload: unknown) => {
    const { data } = await (
      await this.client
    ).post<T>(
      `${this.host}${this.path}${endpoint}`,
      {
        type: "Json",
        payload,
      },
      {
        headers: {
          "X-Auth-Token": this.authToken,
          "X-User-Id": this.userId,
        },
      }
    )

    return data
  }
}
