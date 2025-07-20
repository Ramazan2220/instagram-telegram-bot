"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"
  const isLight = currentTheme === "light"

  return {
    theme,
    setTheme,
    systemTheme,
    currentTheme,
    isDark,
    isLight,
    mounted,
  }
}
