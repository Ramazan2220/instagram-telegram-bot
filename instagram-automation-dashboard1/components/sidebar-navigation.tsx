"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Users,
  Globe,
  Upload,
  TrendingUp,
  Settings,
  Menu,
  Bell,
  Bot,
  Activity,
  Download,
  Moon,
  Database,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import MobileSidebar from "@/components/mobile-sidebar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

interface SidebarNavigationProps {
  children: React.ReactNode
}

export default function SidebarNavigation({ children }: SidebarNavigationProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navigation = [
    { name: "Дашборд", href: "/", icon: Home },
    { name: "Аккаунты", href: "/accounts", icon: Users },
    { name: "Прокси", href: "/proxy", icon: Globe },
    { name: "Публикации", href: "/posts", icon: Upload },
    { name: "Прогрев", href: "/warmup", icon: TrendingUp },
    { name: "Стилизация", href: "/styling", icon: Settings },
    { name: "Аналитика", href: "/analytics", icon: Activity },
    { name: "ИИ Ассистент", href: "/ai", icon: Bot },
    { name: "Уведомления", href: "/notifications", icon: Bell },
    { name: "Безопасность", href: "/security", icon: Settings },
    { name: "Мониторинг", href: "/live", icon: Activity },
    { name: "Экспорт данных", href: "/export", icon: Download },
    { name: "Тема", href: "/theme", icon: Moon },
    { name: "Резервное копирование", href: "/backup", icon: Database },
  ]

  if (!isMounted) {
    return null
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-slate-900 text-white dark:bg-slate-900 dark:text-white light:bg-white light:text-slate-900">
        <div className="flex items-center justify-between p-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
              <span className="font-bold text-white">IA</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              InstaAutomation
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-700 dark:border-slate-700 light:border-slate-300"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 p-0 bg-slate-900 border-slate-800 dark:bg-slate-900 dark:border-slate-800 light:bg-white light:border-slate-200"
              >
                <MobileSidebar navigation={navigation} pathname={pathname} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="p-4 pb-20">{children}</div>
        <MobileBottomNav navigation={navigation} pathname={pathname} />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-white dark:bg-slate-900 dark:text-white light:bg-white light:text-slate-900">
      <div className="w-64 border-r border-slate-800 flex flex-col dark:border-slate-800 light:border-slate-200">
        <div className="p-4 border-b border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
              <span className="font-bold text-white">IA</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              InstaAutomation
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white light:text-slate-700 light:hover:bg-slate-100 light:hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-800 dark:border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="font-bold text-white">АП</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white dark:text-white light:text-slate-900">Администратор</p>
                <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500">admin@example.com</p>
              </div>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  )
}
