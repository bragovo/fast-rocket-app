export interface LoginData {
  error: string
  status: "error" | "success"
  data?: UserData
}

export interface UserData {
  authToken: string
  userId: string
}


