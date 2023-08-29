import { use } from 'react'
import { DarkModeContext } from './dark-mode-context'

export function DarkModeFlashGuard() {
  const { storageKey } = use(DarkModeContext)
  const scriptContent = `
  (function() {
    const mode = localStorage.getItem('${storageKey}') || 'system';
    if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
}
