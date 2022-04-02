import { makeAutoObservable, runInAction } from "mobx";
import { ChannelData, ChannelsData } from "./models";
import { getRequest } from "services/getRequest";
import { ChannelStore } from "../ChannelStore";
import { RoomData } from "app/models";

export class ChannelsStore {
  channelsList: ChannelData[] = []
  channels: Record<string, ChannelStore> = {}

  constructor () {
    makeAutoObservable(this)

    this.loadChannels()
  }

  loadChannels = async () => {
    const data = await getRequest<ChannelsData>("/channels.list.joined", {})

    runInAction(() => {
      this.channelsList = data.channels
    })
  }

  loadChannel = async (channelId: string) => {
    const data = await getRequest<RoomData>(
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

    console.log(data)

    runInAction(() => {
      this.channels[channelId] = new ChannelStore(data.messages)
    })
  }
}
