"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Heart,
  MessageCircle,
  Users,
  Eye,
  Clock,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

interface ActivityItem {
  id: string
  type: "like" | "comment" | "follow" | "story" | "error" | "warning" | "success"
  account: string
  target?: string
  timestamp: Date
  status: "success" | "pending" | "error"
  message: string
  details?: string
}

interface LiveActivityFeedProps {
  fullView?: boolean
}

export default function LiveActivityFeed({ fullView = false }: LiveActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    // Симуляция получения данных в реальном времени
    const initialActivities: ActivityItem[] = [
      {
        id: "1",
        type: "like",
        account: "@fashion_account",
        target: "@target_user1",
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 минуты назад
        status: "success",
        message: "Лайк поставлен успешно",
      },
      {
        id: "2",
        type: "follow",
        account: "@travel_blog",
        target: "@popular_travel",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 минут назад
        status: "success",
        message: "Подписка выполнена",
      },
      {
        id: "3",
        type: "comment",
        account: "@fitness_coach",
        target: "@gym_motivation",
        timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 минут назад
        status: "error",
        message: "Ошибка публикации комментария",
        details: "Слишком много запросов. Повторите позже.",
      },
      {
        id: "4",
        type: "story",
        account: "@daily_news",
        timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 минут назад
        status: "success",
        message: "Story опубликована",
      },
      {
        id: "5",
        type: "error",
        account: "@beauty_tips",
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 минут назад
        status: "error",
        message: "Ошибка авторизации",
        details: "Требуется повторная авторизация аккаунта",
      },
      {
        id: "6",
        type: "warning",
        account: "@food_blogger",
        timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 минут назад
        status: "pending",
        message: "Обнаружена повышенная активность",
        details: "Рекомендуется снизить частоту действий",
      },
      {
        id: "7",
        type: "success",
        account: "@tech_news",
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 минут назад
        status: "success",
        message: "Аккаунт успешно прогрет",
      },
    ]

    setActivities(initialActivities)

    // Симуляция обновления в реальном времени
    const interval = setInterval(() => {
      const types = ["like", "comment", "follow", "story", "error", "warning", "success"]
      const statuses = ["success", "pending", "error"]
      const accounts = [
        "@fashion_account",
        "@travel_blog",
        "@fitness_coach",
        "@daily_news",
        "@beauty_tips",
        "@food_blogger",
        "@tech_news",
      ]
      const targets = ["@target_user1", "@popular_travel", "@gym_motivation", undefined]

      const newActivity: ActivityItem = {
        id: Math.random().toString(36).substring(7),
        type: types[Math.floor(Math.random() * types.length)] as any,
        account: accounts[Math.floor(Math.random() * accounts.length)],
        target: targets[Math.floor(Math.random() * targets.length)],
        timestamp: new Date(),
        status: statuses[Math.floor(Math.random() * statuses.length)] as any,
        message: "Новое действие выполнено",
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, fullView ? 19 : 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [fullView])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)

    if (diffMins < 1) {
      return "только что"
    } else if (diffMins < 60) {
      return `${diffMins} мин назад`
    } else {
      const hours = Math.floor(diffMins / 60)
      return `${hours} ч назад`
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-2.5 w-2.5 text-red-400" />
      case "comment":
        return <MessageCircle className="h-2.5 w-2.5 text-green-400" />
      case "follow":
        return <Users className="h-2.5 w-2.5 text-blue-400" />
      case "story":
        return <Eye className="h-2.5 w-2.5 text-purple-400" />
      case "error":
        return <XCircle className="h-2.5 w-2.5 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-2.5 w-2.5 text-yellow-400" />
      case "success":
        return <CheckCircle className="h-2.5 w-2.5 text-green-400" />
      default:
        return <Clock className="h-2.5 w-2.5 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Успех"
      case "pending":
        return "В процессе"
      case "error":
        return "Ошибка"
      default:
        return "Неизвестно"
    }
  }

  const filteredActivities = filter === "all" ? activities : activities.filter((a) => a.type === filter)

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm w-full">
      <CardHeader className="flex flex-row items-center justify-between py-1.5 px-2">
        <div>
          <CardTitle className="text-white text-xs">Live Активность</CardTitle>
          <CardDescription className="text-slate-400 text-[9px]">
            Отслеживание действий в реальном времени
          </CardDescription>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 h-5 text-[10px] px-1.5">
            <Filter className="h-2.5 w-2.5 mr-0.5" />
            Фильтр
          </Button>
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 h-5 text-[10px] px-1.5">
            <MoreHorizontal className="h-2.5 w-2.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <div className="space-y-1 w-full">
          {filteredActivities.slice(0, fullView ? 20 : 5).map((activity) => (
            <div
              key={activity.id}
              className="p-1 bg-slate-700/30 rounded-lg border border-slate-600 flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-slate-600/50 rounded-full flex items-center justify-center">
                  {getTypeIcon(activity.type)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-white font-medium text-[10px]">{activity.account}</span>
                    {activity.target && (
                      <>
                        <span className="text-slate-400 text-[9px]">→</span>
                        <span className="text-slate-300 text-[10px]">{activity.target}</span>
                      </>
                    )}
                  </div>
                  <div className="text-slate-400 text-[9px]">{activity.message}</div>
                  {activity.details && fullView && (
                    <div className="text-slate-500 text-[8px] mt-0.5">{activity.details}</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-0.5">
                <Badge className={`text-[8px] py-0 px-1 h-3 ${getStatusColor(activity.status)}`}>
                  {getStatusText(activity.status)}
                </Badge>
                <div className="text-slate-500 text-[8px]">{formatTime(activity.timestamp)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
