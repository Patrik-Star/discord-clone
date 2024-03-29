"use client"
import * as React from "react"
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { Moon as MoonIcon, Sun as SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ActionTooltip } from "./action-tooltip"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>

      <ActionTooltip side="right" align="center" label="Change Theme">
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="bg-transparent border border-emerald-500 dark:border-white/20 ">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
      </ActionTooltip>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}> 
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
