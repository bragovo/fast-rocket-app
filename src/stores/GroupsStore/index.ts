import { makeAutoObservable, runInAction } from "mobx";
import { GroupData, GroupsData } from "./models";
import { RoomData } from "app/models";
import { GroupStore } from "../GroupStore";
import { RootStore } from "../RootStore";
import { SpaceStore } from "../SpaceStore";


export class GroupsStore {
  groupsList: GroupData[] = []
  groups: Record<string, GroupStore> = {}
  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })

    this.rootStore = rootStore
  }

  loadGroups = async (space: SpaceStore) => {
    const data = await space.getRequest<GroupsData>("/groups.list", {})

    runInAction(() => {
      this.groupsList = data.groups
    })
  }

  loadGroup = async (space: SpaceStore, groupId: string) => {
    const data = await space.getRequest<RoomData>(
      "/groups.messages",
      {
        roomId: groupId,
        query: JSON.stringify({
          tmid: {
            "$exists": false
          }
        }),
        sort: JSON.stringify({ ts: 1 })
      }
    )

    runInAction(() => {
      this.groups[groupId] = new GroupStore(data.messages)
    })
  }
}
