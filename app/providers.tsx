'use client'

import { ReactNode } from 'react'
import { DarkModeProvider } from '@/lib/dark-mode/dark-mode-provider'

type Props = {
  children: ReactNode
}

export default function Providers({ children }: Props) {
  return <DarkModeProvider>{children}</DarkModeProvider>
}
