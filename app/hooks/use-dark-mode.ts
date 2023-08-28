import { useState, useEffect, useCallback } from 'react'

type Mode = 'light' | 'dark' | 'system'
type EffectiveMode = 'light' | 'dark'

export function useDarkMode() {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('::useDarkMode') as Mode) || 'system'
    }
    return 'system'
  })
  const [effectiveMode, setEffectiveMode] = useState<EffectiveMode>('light')

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
    } else if (mode === 'dark') {
      setMode('system')
    } else {
      setMode('light')
    }
  }

  const handleSystemChange = (e: MediaQueryListEvent) => {
    const isDark = e.matches
    document.documentElement.classList.toggle('dark', isDark)
    setEffectiveMode(isDark ? 'dark' : 'light')
  }

  const applyMode = useCallback(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (mode === 'light') {
      document.documentElement.classList.remove('dark')
      setEffectiveMode('light')
    } else if (mode === 'dark') {
      document.documentElement.classList.add('dark')
      setEffectiveMode('dark')
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
    localStorage.setItem('::useDarkMode', mode)
  }, [mode])

  return { mode: effectiveMode, toggleMode, setMode }
}
