import { use, useEffect } from 'react'
import { ColorMode, useDarkMode } from './use-dark-mode'
import { DarkModeContext } from './dark-mode-context'

export function DarkModeTabSyncer() {
  const { storageKey } = use(DarkModeContext)
  const { setMode } = useDarkMode()

  useEffect(() => {
    const syncModeAcrossTabs = (e: StorageEvent) => {
      if (e.key === storageKey) {
        setMode(e.newValue as ColorMode)
      }
    }

    window.addEventListener('storage', syncModeAcrossTabs)

    return () => {
      window.removeEventListener('storage', syncModeAcrossTabs)
    }
  }, [setMode, storageKey])

  return null
}
