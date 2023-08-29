'use client'

import { Button } from './ui/button'
import { useDarkMode } from '@/lib/dark-mode/use-dark-mode'
import { Moon, SunMoon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from './ui/dropdown-menu'

export function DarkModeSelector() {
  const { mode, setMode } = useDarkMode()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {mode === 'dark' && <Moon />}
          {mode === 'light' && <SunMoon />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setMode('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMode('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
