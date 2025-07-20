"use client"

import { useState, useEffect } from "react"
import { Bell, X, CheckCheck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Типы уведомлений
type NotificationType = "critical" | "warning" | "info" | "success"

// Интерфейс для уведомления
interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

// Мок-данные для уведомлений
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "critical",
    title: "Аккаунт заблокирован",
    message: "Аккаунт @design_master временно заблокирован",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 минут назад
    read: false,
    actionUrl: "/accounts",
  },
  {
    id: "2",
    type: "warning",
    title: "Подозрительная активность",
    message: "Обнаружена необычная активность на 3 аккаунтах",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
    read: false,
    actionUrl: "/security",
  },
  {
    id: "3",
    type: "info",
    title: "ИИ создал новый контент",
    message: "Автоматически создано 12 новых постов",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 часов назад
    read: true,
    actionUrl: "/ai",
  },
]

// Функция для получения иконки по типу уведомления
const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case "critical":
      return "bg-red-500"
    case "warning":
      return "bg-amber-500"
    case "info":
      return "bg-blue-500"
    case "success":
      return "bg-green-500"
  }
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Количество непрочитанных уведомлений
  const unreadCount = notifications.filter((n) => !n.read).length

  // Отметить уведомление как прочитанное
  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Отметить все как прочитанные
  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  // Удалить уведомление
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Перейти по ссылке уведомления
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
    setOpen(false)
  }

  // Форматирование времени
  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins} мин назад`
    } else if (diffHours < 24) {
      return `${diffHours} ч назад`
    } else {
      return `${diffDays} д назад`
    }
  }

  // Эффект для имитации получения новых уведомлений
  useEffect(() => {
    const interval = setInterval(() => {
      // Случайно добавляем новое уведомление с вероятностью 10%
      if (Math.random() < 0.1) {
        const types: NotificationType[] = ["critical", "warning", "info", "success"]
        const randomType = types[Math.floor(Math.random() * types.length)]

        const newNotification: Notification = {
          id: `new-${Date.now()}`,
          type: randomType,
          title:
            randomType === "critical"
              ? "Критическое предупреждение"
              : randomType === "warning"
                ? "Предупреждение системы"
                : randomType === "success"
                  ? "Успешное действие"
                  : "Информационное сообщение",
          message: `Автоматическое уведомление системы (${new Date().toLocaleTimeString()})`,
          timestamp: new Date(),
          read: false,
          actionUrl: "/notifications",
        }

        setNotifications((prev) => [newNotification, ...prev].slice(0, 10))
      }
    }, 30000) // Каждые 30 секунд

    return () => clearInterval(interval)
  }, [])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-slate-300 hover:text-white">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-slate-800 border-slate-700">
        <div className="flex items-center justify-between p-2 border-b border-slate-700">
          <h3 className="font-medium text-white">Уведомления</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-300 hover:text-white"
              onClick={markAllAsRead}
              title="Отметить все как прочитанные"
            >
              <CheckCheck className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-300 hover:text-white"
              onClick={() => router.push("/notifications")}
              title="Все уведомления"
            >
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-slate-400">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p>Нет уведомлений</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div key={notification.id}>
                {index > 0 && <DropdownMenuSeparator className="bg-slate-700" />}
                <DropdownMenuItem
                  className={cn("flex items-start gap-3 p-3 cursor-pointer", notification.read ? "opacity-70" : "")}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div
                    className={cn("h-2 w-2 mt-1.5 rounded-full shrink-0", getNotificationColor(notification.type))}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{notification.message}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white shrink-0 mt-0.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </DropdownMenuItem>
              </div>
            ))
          )}
        </div>

        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem
          className="justify-center text-sm text-slate-300 hover:text-white"
          onClick={() => router.push("/notifications")}
        >
          Просмотреть все уведомления
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
