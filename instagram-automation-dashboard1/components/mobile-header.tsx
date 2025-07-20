"use client"

import { Menu, Bell, Settings } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import MobileSidebar from "@/components/mobile-sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface MobileHeaderProps {
  title: string
}

export default function MobileHeader({ title }: MobileHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Главная", href: "/", icon: () => <span>🏠</span> },
    { name: "Аккаунты", href: "/accounts", icon: () => <span>👥</span> },
    { name: "Оформление", href: "/styling", icon: () => <span>🎨</span> },
    { name: "Прокси", href: "/proxy", icon: () => <span>🔒</span> },
    { name: "Публикации", href: "/posts", icon: () => <span>📝</span> },
    { name: "Прогрев", href: "/warmup", icon: () => <span>🔥</span> },
    { name: "ИИ", href: "/ai", icon: () => <span>🤖</span> },
    { name: "Аналитика", href: "/analytics", icon: () => <span>📊</span> },
    { name: "Live", href: "/live", icon: () => <span>📡</span> },
    { name: "Уведомления", href: "/notifications", icon: () => <span>🔔</span> },
    { name: "Безопасность", href: "/security", icon: () => <span>🛡️</span> },
    { name: "Экспорт", href: "/export", icon: () => <span>📤</span> },
    { name: "Тема", href: "/theme", icon: () => <span>🎭</span> },
    { name: "Резервное копирование", href: "/backup", icon: () => <span>💾</span> },
  ]

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between bg-slate-800 border-b border-slate-700 px-3 py-2">
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-slate-900 border-r border-slate-700">
            <MobileSidebar navigation={navigation} pathname={pathname} />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold text-white truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-1">
        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
        </Link>
        <Link href="/theme">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
