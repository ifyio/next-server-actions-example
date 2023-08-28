import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { DarkModeFlashGuard } from './components/dark-mode-flash-guard'

export const metadata: Metadata = {
  title: 'Todo App',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="light">
        <DarkModeFlashGuard />
        {children}
      </body>
    </html>
  )
}
