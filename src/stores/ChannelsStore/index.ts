import { makeAutoObservable, runInAction, autorun } from "mobx";
import { ChannelData, ChannelsData } from "./models";
import { ChannelStore } from "../ChannelStore";
import { RoomData } from "app/models";
import { RootStore } from "../RootStore";
import { SpaceStore } from "../SpaceStore";

export class ChannelsStore {
  channelsList: ChannelData[] = []
  channels: Record<string, ChannelStore> = {}
  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
  }

  loadChannels = async (space: SpaceStore) => {
    const data = await space.getRequest<ChannelsData>("/channels.list.joined", {})

    runInAction(() => {
      this.channelsList = data.channels
    })
  }

  loadChannel = async (space: SpaceStore, channelId: string) => {
    const data = await space.getRequest<RoomData>(
      "/channels.messages",
      {
        roomId: channelId,
        query: JSON.stringify({
          tmid: {
            "$exists": false
          }
        }),
        sort: JSON.stringify({ ts: 1 })
      }
    )

    runInAction(() => {
      this.channels[channelId] = new ChannelStore(data.messages)
    })
  }
}
