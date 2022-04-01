import { createContext, useContext } from 'react'
import { RootStore } from './store'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const RootContext = createContext({} as RootStore)

export function useRootContext(): RootStore {
  return useContext(RootContext)
}
