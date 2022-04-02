import { makeAutoObservable, runInAction } from "mobx";
import { GroupData, GroupsData } from "./models";
import { getRequest } from "services/getRequest";
import { RoomData } from "app/models";
import { GroupStore } from "../GroupStore";


export class GroupsStore {
  groupsList: GroupData[] = []
  groups: Record<string, GroupStore> = {}

  constructor () {
    makeAutoObservable(this)

    this.loadGroups()
  }

  loadGroups = async () => {
    const data = await getRequest<GroupsData>("/groups.list", {})

    runInAction(() => {
      this.groupsList = data.groups
    })
  }

  loadGroup = async (groupId: string) => {
    const data = await getRequest<RoomData>("/groups.messages", { roomId: groupId })

    runInAction(() => {
      this.groups[groupId] = new GroupStore(data.messages)
    })
  }
}
