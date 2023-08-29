import { ReactNode, ReactElement } from 'react'
import { DarkModeContext, darkModeDefaults } from './dark-mode-context' // Import your context
import { DarkModeFlashGuard } from './dark-mode-flash-guard'
import { DarkModeTabSyncer } from './dark-mode-tab-syncer'

type DarkModeProviderProps = {
  children: ReactNode
  defaultMode?: 'light' | 'dark' | 'system'
  storageKey?: string
}

export function DarkModeProvider({
  children,
  defaultMode = darkModeDefaults.defaultMode,
  storageKey = darkModeDefaults.storageKey,
}: DarkModeProviderProps): ReactElement {
  return (
    <DarkModeContext.Provider value={{ defaultMode, storageKey }}>
      <DarkModeFlashGuard />
      <DarkModeTabSyncer />
      {children}
    </DarkModeContext.Provider>
  )
}
