"use client"

import Link from "next/link"
import { Home, Users, TrendingUp, Bot, Activity, BarChart3 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Главная", href: "/" },
    { icon: Users, label: "Аккаунты", href: "/accounts" },
    { icon: TrendingUp, label: "Прогрев", href: "/warmup" },
    { icon: Bot, label: "ИИ", href: "/ai" },
    { icon: BarChart3, label: "Аналитика", href: "/analytics" },
    { icon: Activity, label: "Live", href: "/live" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-sm border-t border-slate-700 z-50 px-1 py-1">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2 rounded-md ${
                isActive ? "text-blue-400 bg-slate-700/50" : "text-slate-400"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
              <span className={`text-[10px] mt-0.5 ${isActive ? "font-medium" : ""}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
