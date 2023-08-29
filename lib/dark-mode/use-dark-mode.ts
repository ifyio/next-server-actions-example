import { useState, useEffect, useCallback, use } from 'react'
import { DarkModeContext } from './dark-mode-context'

export type ColorMode = 'light' | 'dark' | 'system'
type ResolvedColorMode = 'light' | 'dark'

export function useDarkMode() {
  const { defaultMode, storageKey } = use(DarkModeContext)

  const [mode, setMode] = useState<ColorMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as ColorMode) || defaultMode
    }
    return defaultMode
  })
  const [resolvedMode, setResolvedMode] = useState<ResolvedColorMode>('light')

  const handleSystemChange = (e: MediaQueryListEvent) => {
    const isDark = e.matches
    document.documentElement.classList.toggle('dark', isDark)
    setResolvedMode(isDark ? 'dark' : 'light')
  }

  const applyMode = useCallback(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (mode === 'light') {
      document.documentElement.classList.remove('dark')
      setResolvedMode('light')
    } else if (mode === 'dark') {
      document.documentElement.classList.add('dark')
      setResolvedMode('dark')
    } else {
      handleSystemChange({ matches: mediaQuery.matches } as MediaQueryListEvent)
      mediaQuery.addEventListener('change', handleSystemChange)
    }
  }, [mode])

  useEffect(() => {
    applyMode()

    return (): void => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.removeEventListener('change', handleSystemChange)
    }
  }, [applyMode])

  // Persist mode setting to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, mode)
  }, [mode, storageKey])

  return { mode: resolvedMode, setMode }
}
