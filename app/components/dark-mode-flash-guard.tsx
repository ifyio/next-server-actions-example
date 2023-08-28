export function DarkModeFlashGuard() {
  const scriptContent = `
  (function() {
    const mode = localStorage.getItem('::useDarkMode') || 'system';
    if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`

  return <script dangerouslySetInnerHTML={{ __html: scriptContent }} />
}
