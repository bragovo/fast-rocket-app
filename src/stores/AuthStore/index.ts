import { makeAutoObservable } from "mobx"

export class AuthStore {
  authToken: string
  userId: string

  constructor (userId: string, authToken: string) {
    this.authToken = userId
    this.userId = authToken

    makeAutoObservable(this)
  }

  // loadMe = async (): Promise<void> => {
  //   const { data } = await axios.get("/me")

  //   console.log(data)
  // }
}
