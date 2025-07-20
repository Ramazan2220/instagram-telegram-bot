"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Eye,
  Users,
  ImageIcon,
  Link,
  User,
} from "lucide-react"

interface StylingTask {
  id: string
  accountUsername: string
  taskType: "avatar" | "bio" | "website" | "content" | "full"
  status: "pending" | "processing" | "completed" | "failed"
  progress: number
  startTime: string
  endTime?: string
  error?: string
  changes: {
    avatar?: boolean
    displayName?: boolean
    bio?: boolean
    website?: boolean
    posts?: number
  }
}

export default function StylingProgress() {
  const [tasks] = useState<StylingTask[]>([
    {
      id: "1",
      accountUsername: "@fashion_style_2024",
      taskType: "full",
      status: "completed",
      progress: 100,
      startTime: "2024-01-15T10:30:00",
      endTime: "2024-01-15T10:35:00",
      changes: {
        avatar: true,
        displayName: true,
        bio: true,
        website: true,
        posts: 6,
      },
    },
    {
      id: "2",
      accountUsername: "@travel_blogger_pro",
      taskType: "full",
      status: "processing",
      progress: 67,
      startTime: "2024-01-15T10:32:00",
      changes: {
        avatar: true,
        displayName: true,
        bio: true,
        website: false,
        posts: 3,
      },
    },
    {
      id: "3",
      accountUsername: "@fitness_motivation",
      taskType: "bio",
      status: "completed",
      progress: 100,
      startTime: "2024-01-15T10:28:00",
      endTime: "2024-01-15T10:29:00",
      changes: {
        bio: true,
      },
    },
    {
      id: "4",
      accountUsername: "@food_lover_daily",
      taskType: "avatar",
      status: "failed",
      progress: 0,
      startTime: "2024-01-15T10:25:00",
      error: "Не удалось загрузить изображение",
      changes: {},
    },
    {
      id: "5",
      accountUsername: "@tech_reviews_hub",
      taskType: "content",
      status: "pending",
      progress: 0,
      startTime: "2024-01-15T10:40:00",
      changes: {},
    },
    {
      id: "6",
      accountUsername: "@beauty_tips_daily",
      taskType: "full",
      status: "processing",
      progress: 23,
      startTime: "2024-01-15T10:38:00",
      changes: {
        avatar: true,
        displayName: false,
        bio: false,
        website: false,
        posts: 0,
      },
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Play className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getTaskTypeLabel = (type: string) => {
    switch (type) {
      case "avatar":
        return "Аватар"
      case "bio":
        return "Описание"
      case "website":
        return "Веб-сайт"
      case "content":
        return "Контент"
      case "full":
        return "Полное оформление"
      default:
        return type
    }
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "avatar":
        return <User className="h-4 w-4" />
      case "bio":
        return <AlertCircle className="h-4 w-4" />
      case "website":
        return <Link className="h-4 w-4" />
      case "content":
        return <ImageIcon className="h-4 w-4" />
      case "full":
        return <Users className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateDuration = (start: string, end?: string) => {
    const startTime = new Date(start)
    const endTime = end ? new Date(end) : new Date()
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000)

    if (duration < 60) return `${duration}с`
    if (duration < 3600) return `${Math.floor(duration / 60)}м ${duration % 60}с`
    return `${Math.floor(duration / 3600)}ч ${Math.floor((duration % 3600) / 60)}м`
  }

  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const processingTasks = tasks.filter((task) => task.status === "processing").length
  const failedTasks = tasks.filter((task) => task.status === "failed").length
  const pendingTasks = tasks.filter((task) => task.status === "pending").length

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{completedTasks}</p>
                <p className="text-sm text-slate-400">Завершено</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Play className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{processingTasks}</p>
                <p className="text-sm text-slate-400">В процессе</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingTasks}</p>
                <p className="text-sm text-slate-400">В очереди</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{failedTasks}</p>
                <p className="text-sm text-slate-400">Ошибки</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Общий прогресс оформления</CardTitle>
          <CardDescription className="text-slate-400">
            Прогресс выполнения всех задач оформления профилей
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Выполнено задач</span>
              <span className="text-white">
                {completedTasks} из {tasks.length}
              </span>
            </div>
            <Progress value={(completedTasks / tasks.length) * 100} className="h-3" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-green-400 font-medium">{Math.round((completedTasks / tasks.length) * 100)}%</div>
              <div className="text-slate-400">Успешность</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 font-medium">
                {calculateDuration(tasks[0]?.startTime || new Date().toISOString())}
              </div>
              <div className="text-slate-400">Время работы</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-medium">2.5 мин</div>
              <div className="text-slate-400">Среднее время</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 font-medium">15 мин</div>
              <div className="text-slate-400">Осталось</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Список задач</CardTitle>
            <CardDescription className="text-slate-400">Детальный прогресс по каждому аккаунту</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Pause className="h-4 w-4 mr-2" />
              Приостановить все
            </Button>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Экспорт отчета
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{task.accountUsername}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1 capitalize">
                            {task.status === "completed"
                              ? "Завершено"
                              : task.status === "processing"
                                ? "В процессе"
                                : task.status === "pending"
                                  ? "В очереди"
                                  : "Ошибка"}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {getTaskTypeIcon(task.taskType)}
                          <span className="ml-1">{getTaskTypeLabel(task.taskType)}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-white font-medium">{task.progress}%</div>
                    <div className="text-slate-400 text-sm">
                      {formatTime(task.startTime)} - {task.endTime ? formatTime(task.endTime) : "в процессе"}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {task.status === "processing" && (
                  <div className="mb-3">
                    <Progress value={task.progress} className="h-2" />
                  </div>
                )}

                {/* Changes Made */}
                <div className="space-y-2">
                  <h5 className="text-slate-300 font-medium text-sm">Изменения:</h5>
                  <div className="flex flex-wrap gap-2">
                    {task.changes.avatar && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        <User className="h-3 w-3 mr-1" />
                        Аватар
                      </Badge>
                    )}
                    {task.changes.displayName && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Имя
                      </Badge>
                    )}
                    {task.changes.bio && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Описание
                      </Badge>
                    )}
                    {task.changes.website && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        <Link className="h-3 w-3 mr-1" />
                        Веб-сайт
                      </Badge>
                    )}
                    {task.changes.posts && task.changes.posts > 0 && (
                      <Badge variant="outline" className="border-green-500/30 text-green-400">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {task.changes.posts} постов
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {task.error && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-300 text-sm">
                    {task.error}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-600">
                  <div className="text-slate-400 text-sm">
                    Длительность: {calculateDuration(task.startTime, task.endTime)}
                  </div>
                  <div className="flex gap-2">
                    {task.status === "processing" && (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-yellow-400">
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {task.status === "failed" && (
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Eye className="h-4 w-4" />
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
