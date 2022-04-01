import { makeAutoObservable } from "mobx";
// const { SNOWPACK_PUBLIC_AUTH_TOKEN: AUTH_TOKEN, SNOWPACK_PUBLIC_USER_ID: USER_ID } = import.meta.env

export class RootStore {
  authStore: AuthStore

  constructor() {
    makeAutoObservable(this)

    this.authStore = new AuthStore()
  }
}

class AuthStore {
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
