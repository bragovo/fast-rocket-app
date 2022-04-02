import { makeAutoObservable } from "mobx"

export class AuthStore {
  authToken: string = 'AUTH_TOKEN'
  userId: string = 'USER_ID'

  constructor () {
    makeAutoObservable(this)

    // this.loadMe()
  }

  // loadMe = async (): Promise<void> => {
  //   const { data } = await axios.get("/me")

  //   console.log(data)
  // }
}
