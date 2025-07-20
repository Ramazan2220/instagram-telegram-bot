"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Monitor } from "lucide-react"
import { motion } from "framer-motion"

interface ThemeSwitcherProps {
  variant?: "icon" | "button" | "dropdown"
  className?: string
}

export function ThemeSwitcher({ variant = "icon", className = "" }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Предотвращаем гидратацию
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (variant === "dropdown") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-sm text-white"
        >
          <option value="light">Светлая</option>
          <option value="dark">Темная</option>
          <option value="system">Системная</option>
        </select>
      </div>
    )
  }

  if (variant === "button") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant={theme === "light" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("light")}
          className="flex items-center gap-1"
        >
          <Sun className="h-4 w-4" />
          <span>Светлая</span>
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("dark")}
          className="flex items-center gap-1"
        >
          <Moon className="h-4 w-4" />
          <span>Темная</span>
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
          size="sm"
          onClick={() => setTheme("system")}
          className="flex items-center gap-1"
        >
          <Monitor className="h-4 w-4" />
          <span>Системная</span>
        </Button>
      </div>
    )
  }

  // Вариант с иконкой по умолчанию
  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {theme === "dark" ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme("light")}
            className="relative h-9 w-9 rounded-full"
          >
            <Sun className="h-5 w-5 text-yellow-400" />
            <span className="sr-only">Переключить на светлую тему</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme("dark")}
            className="relative h-9 w-9 rounded-full"
          >
            <Moon className="h-5 w-5 text-slate-700" />
            <span className="sr-only">Переключить на темную тему</span>
          </Button>
        )}
      </motion.div>
    </div>
  )
}
