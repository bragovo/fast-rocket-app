export interface PreferencesData {
  success: boolean
  preferences: {
    desktopNotifications?: DesktopNotificationsType
  }
}

export type DesktopNotificationsType = "default" | "all" | "mentions" | "nothing"
