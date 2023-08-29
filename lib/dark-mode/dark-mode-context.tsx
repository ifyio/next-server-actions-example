import { createContext } from 'react'

export const darkModeDefaults: DarkModeContextType = {
  defaultMode: 'system',
  storageKey: 'colorScheme',
}

type DarkModeContextType = {
  defaultMode: 'light' | 'dark' | 'system'
  storageKey: string
}

export const DarkModeContext =
  createContext<DarkModeContextType>(darkModeDefaults)
