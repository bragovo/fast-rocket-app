import { RoomType } from "../RoomStore/models"

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

export interface SubscriptionsData {
  update: SubscriptionData[]
}

export interface SubscriptionData {
  _id: string
  name: string
  alert: boolean
  unread: number
  t: RoomType
}
