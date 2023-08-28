'use client'

import { Moon, SunMoon } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useDarkMode } from '../hooks/use-dark-mode'

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
