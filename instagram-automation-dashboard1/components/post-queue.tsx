"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  Play,
  Pause,
  Trash2,
  Edit,
  ImageIcon,
  Video,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"

interface QueuedPost {
  id: string
  type: "post" | "reel" | "story" | "carousel"
  caption: string
  scheduledTime: string
  accounts: string[]
  mediaCount: number
  status: "scheduled" | "publishing" | "completed" | "failed"
  progress?: number
}

export default function PostQueue() {
  const [queuedPosts] = useState<QueuedPost[]>([
    {
      id: "1",
      type: "post",
      caption: "Новая коллекция весна-лето 2024! 🌸 #fashion #style #spring",
      scheduledTime: "2024-01-15T14:30:00",
      accounts: ["@fashion_style_2024", "@beauty_tips_daily"],
      mediaCount: 3,
      status: "scheduled",
    },
    {
      id: "2",
      type: "reel",
      caption: "Топ-5 упражнений для идеального пресса 💪 #fitness #workout",
      scheduledTime: "2024-01-15T16:00:00",
      accounts: ["@fitness_motivation"],
      mediaCount: 1,
      status: "publishing",
      progress: 67,
    },
    {
      id: "3",
      type: "story",
      caption: "За кулисами нашей фотосессии ✨",
      scheduledTime: "2024-01-15T18:00:00",
      accounts: ["@fashion_style_2024", "@beauty_tips_daily", "@art_inspiration"],
      mediaCount: 5,
      status: "completed",
    },
    {
      id: "4",
      type: "carousel",
      caption: "Рецепт идеального завтрака 🥞 #food #breakfast #recipe",
      scheduledTime: "2024-01-15T09:00:00",
      accounts: ["@food_lover_daily"],
      mediaCount: 4,
      status: "failed",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <ImageIcon className="h-4 w-4" />
      case "reel":
        return <Video className="h-4 w-4" />
      case "story":
        return <Clock className="h-4 w-4" />
      case "carousel":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "publishing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-4 w-4" />
      case "publishing":
        return <Play className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Запланировано"
      case "publishing":
        return "Публикуется"
      case "completed":
        return "Завершено"
      case "failed":
        return "Ошибка"
      default:
        return "Неизвестно"
    }
  }

  return (
    <div className="space-y-6">
      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-sm text-slate-400">Запланировано</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-slate-400">В процессе</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">247</p>
                <p className="text-sm text-slate-400">Завершено</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-sm text-slate-400">Ошибки</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Очередь публикаций</CardTitle>
          <CardDescription className="text-slate-400">
            Управление запланированными и активными публикациями
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {queuedPosts.map((post) => (
              <div key={post.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(post.type)}
                        <span className="text-white font-medium capitalize">{post.type}</span>
                      </div>
                      <Badge className={getStatusColor(post.status)} variant="outline">
                        {getStatusIcon(post.status)}
                        <span className="ml-1">{getStatusText(post.status)}</span>
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                        {post.mediaCount} файл{post.mediaCount > 1 ? (post.mediaCount > 4 ? "ов" : "а") : ""}
                      </Badge>
                    </div>

                    {/* Caption */}
                    <p className="text-slate-300 line-clamp-2">{post.caption}</p>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Calendar className="h-4 w-4" />
                        {formatDateTime(post.scheduledTime)}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users className="h-4 w-4" />
                        {post.accounts.length} аккаунт
                        {post.accounts.length > 1 ? (post.accounts.length > 4 ? "ов" : "а") : ""}
                      </div>
                    </div>

                    {/* Progress Bar for Publishing */}
                    {post.status === "publishing" && post.progress !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Прогресс публикации</span>
                          <span className="text-white">{post.progress}%</span>
                        </div>
                        <Progress value={post.progress} className="h-2" />
                      </div>
                    )}

                    {/* Account List */}
                    <div className="flex flex-wrap gap-1">
                      {post.accounts.map((account, index) => (
                        <Badge key={index} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {account}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {post.status === "scheduled" && (
                      <>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-green-400">
                          <Play className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {post.status === "publishing" && (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-yellow-400">
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {post.status === "failed" && (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400">
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
