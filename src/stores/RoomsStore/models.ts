export interface ChannelsData {
  channels: RoomData[]
}

export interface GroupsData {
  groups: RoomData[]
}

export interface RoomData {
  _id: string
  name: string
  ro?: boolean
}
