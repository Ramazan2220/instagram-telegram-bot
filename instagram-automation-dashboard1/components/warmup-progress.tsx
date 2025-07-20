"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StandardCard } from "@/components/ui/standard-card"
import { StandardButton } from "@/components/ui/standard-button"
import {
  Play,
  Pause,
  Square,
  Users,
  Heart,
  MessageCircle,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"

interface WarmupAccount {
  id: string
  username: string
  status: "warming" | "paused" | "completed" | "error"
  progress: number
  currentDay: number
  totalDays: number
  todayActivity: {
    follows: number
    likes: number
    comments: number
    stories: number
  }
  limits: {
    follows: number
    likes: number
    comments: number
    stories: number
  }
  startDate: string
  lastActivity: string
}

export default function WarmupProgress() {
  const [accounts] = useState<WarmupAccount[]>([
    {
      id: "1",
      username: "@new_fashion_account",
      status: "warming",
      progress: 65,
      currentDay: 9,
      totalDays: 14,
      todayActivity: { follows: 15, likes: 32, comments: 3, stories: 18 },
      limits: { follows: 20, likes: 50, comments: 5, stories: 30 },
      startDate: "2024-01-07",
      lastActivity: "5 мин назад",
    },
    {
      id: "2",
      username: "@travel_explorer_new",
      status: "warming",
      progress: 43,
      currentDay: 6,
      totalDays: 14,
      todayActivity: { follows: 8, likes: 25, comments: 2, stories: 12 },
      limits: { follows: 15, likes: 40, comments: 4, stories: 25 },
      startDate: "2024-01-10",
      lastActivity: "12 мин назад",
    },
    {
      id: "3",
      username: "@fitness_journey_24",
      status: "completed",
      progress: 100,
      currentDay: 14,
      totalDays: 14,
      todayActivity: { follows: 25, likes: 60, comments: 8, stories: 35 },
      limits: { follows: 30, likes: 80, comments: 10, stories: 40 },
      startDate: "2024-01-01",
      lastActivity: "1 час назад",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "warming":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "warming":
        return <Play className="icon-size" />
      case "paused":
        return <Pause className="icon-size" />
      case "completed":
        return <CheckCircle className="icon-size" />
      case "error":
        return <XCircle className="icon-size" />
      default:
        return <AlertTriangle className="icon-size" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "warming":
        return "Прогрев"
      case "paused":
        return "Приостановлен"
      case "completed":
        return "Завершен"
      case "error":
        return "Ошибка"
      default:
        return "Неизвестно"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const warmingAccounts = accounts.filter((acc) => acc.status === "warming").length
  const pausedAccounts = accounts.filter((acc) => acc.status === "paused").length
  const completedAccounts = accounts.filter((acc) => acc.status === "completed").length
  const errorAccounts = accounts.filter((acc) => acc.status === "error").length

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <div className="grid grid-cols-4 gap-4">
        <StandardCard>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Play className="icon-size text-blue-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{warmingAccounts}</p>
              <p className="text-slate-400">В прогреве</p>
            </div>
          </div>
        </StandardCard>

        <StandardCard>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Pause className="icon-size text-yellow-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{pausedAccounts}</p>
              <p className="text-slate-400">Приостановлено</p>
            </div>
          </div>
        </StandardCard>

        <StandardCard>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="icon-size text-green-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{completedAccounts}</p>
              <p className="text-slate-400">Завершено</p>
            </div>
          </div>
        </StandardCard>

        <StandardCard>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <XCircle className="icon-size text-red-400" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{errorAccounts}</p>
              <p className="text-slate-400">Ошибки</p>
            </div>
          </div>
        </StandardCard>
      </div>

      {/* Accounts List */}
      <StandardCard
        title="Прогресс прогрева аккаунтов"
        description={`Мониторинг процесса прогрева для ${accounts.length} аккаунтов`}
        headerAction={
          <div className="flex gap-2">
            <StandardButton variant="outline" size="sm">
              <Pause className="icon-size mr-2" />
              Пауза
            </StandardButton>
            <StandardButton variant="outline" size="sm">
              <Play className="icon-size mr-2" />
              Старт
            </StandardButton>
          </div>
        }
      >
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="icon-size text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{account.username}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`badge ${getStatusColor(account.status)}`}>
                        {getStatusIcon(account.status)}
                        <span className="ml-1">{getStatusText(account.status)}</span>
                      </Badge>
                      <Badge variant="outline" className="badge border-slate-600 text-slate-300">
                        День {account.currentDay}/{account.totalDays}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-medium">{account.progress}%</div>
                  <div className="text-slate-400">Начат {formatDate(account.startDate)}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-400">Прогресс прогрева</span>
                  <span className="text-white">{account.progress}%</span>
                </div>
                <Progress value={account.progress} className="h-2" />
              </div>

              {/* Today's Activity */}
              <div className="space-y-2">
                <h5 className="text-slate-300 font-medium">Активность сегодня:</h5>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="icon-size text-blue-400" />
                    <div>
                      <div className="text-white">
                        {account.todayActivity.follows}/{account.limits.follows}
                      </div>
                      <div className="text-slate-400">Подписки</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Heart className="icon-size text-red-400" />
                    <div>
                      <div className="text-white">
                        {account.todayActivity.likes}/{account.limits.likes}
                      </div>
                      <div className="text-slate-400">Лайки</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageCircle className="icon-size text-green-400" />
                    <div>
                      <div className="text-white">
                        {account.todayActivity.comments}/{account.limits.comments}
                      </div>
                      <div className="text-slate-400">Комментарии</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Eye className="icon-size text-purple-400" />
                    <div>
                      <div className="text-white">
                        {account.todayActivity.stories}/{account.limits.stories}
                      </div>
                      <div className="text-slate-400">Stories</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-600">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="icon-size" />
                  <span>Последняя активность: {account.lastActivity}</span>
                </div>
                <div className="flex gap-1">
                  {account.status === "warming" && (
                    <StandardButton
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-yellow-400 h-8 w-8 p-0"
                    >
                      <Pause className="icon-size" />
                    </StandardButton>
                  )}
                  {account.status === "paused" && (
                    <StandardButton
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-blue-400 h-8 w-8 p-0"
                    >
                      <Play className="icon-size" />
                    </StandardButton>
                  )}
                  {account.status === "error" && (
                    <StandardButton
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-green-400 h-8 w-8 p-0"
                    >
                      <Play className="icon-size" />
                    </StandardButton>
                  )}
                  <StandardButton variant="ghost" size="sm" className="text-slate-400 hover:text-red-400 h-8 w-8 p-0">
                    <Square className="icon-size" />
                  </StandardButton>
                  <StandardButton variant="ghost" size="sm" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                    <MoreHorizontal className="icon-size" />
                  </StandardButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </StandardCard>
    </div>
  )
}
