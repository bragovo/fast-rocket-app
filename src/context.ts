import { createContext, useContext } from 'react'
import type { RootStore } from './stores/RootStore'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const RootContext = createContext({} as RootStore)

export function useRootContext(): RootStore {
  return useContext(RootContext)
}
