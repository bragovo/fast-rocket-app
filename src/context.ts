import { RootStore } from "./stores/RootStore"

const rootStore = new RootStore()

export function useRootContext(): RootStore {
  return rootStore
}
