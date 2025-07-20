"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, Zap, Users, Heart, MessageCircle, UserPlus } from "lucide-react"

interface Metric {
  id: string
  label: string
  value: number
  change: number
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
  color: string
}

export default function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: "actions_per_minute",
      label: "Действий в минуту",
      value: 47,
      change: 12.5,
      trend: "up",
      icon: <Activity className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: "success_rate",
      label: "Успешность",
      value: 94.2,
      change: -2.1,
      trend: "down",
      icon: <Zap className="h-5 w-5" />,
      color: "green",
    },
    {
      id: "active_accounts",
      label: "Активные аккаунты",
      value: 23,
      change: 0,
      trend: "stable",
      icon: <Users className="h-5 w-5" />,
      color: "purple",
    },
    {
      id: "likes_per_hour",
      label: "Лайков в час",
      value: 1247,
      change: 8.3,
      trend: "up",
      icon: <Heart className="h-5 w-5" />,
      color: "red",
    },
    {
      id: "comments_per_hour",
      label: "Комментариев в час",
      value: 156,
      change: -5.2,
      trend: "down",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: "follows_per_hour",
      label: "Подписок в час",
      value: 89,
      change: 15.7,
      trend: "up",
      icon: <UserPlus className="h-5 w-5" />,
      color: "green",
    },
  ])

  const [systemLoad, setSystemLoad] = useState({
    cpu: 23,
    memory: 67,
    network: 45,
  })

  // Обновление метрик каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const change = (Math.random() - 0.5) * 20
          const newValue = Math.max(0, metric.value + change)
          const newChange = ((newValue - metric.value) / metric.value) * 100

          return {
            ...metric,
            value: newValue,
            change: newChange,
            trend: newChange > 2 ? "up" : newChange < -2 ? "down" : "stable",
          }
        }),
      )

      setSystemLoad((prev) => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20"
      case "green":
        return "text-green-400 bg-green-500/10 border-green-500/20"
      case "purple":
        return "text-purple-400 bg-purple-500/10 border-purple-500/20"
      case "red":
        return "text-red-400 bg-red-500/10 border-red-500/20"
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20"
    }
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-400" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-400" />
    return <div className="w-4 h-4 bg-slate-400 rounded-full" />
  }

  return (
    <div className="space-y-6">
      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${getColorClasses(metric.color)}`}>{metric.icon}</div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend, metric.change)}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === "up"
                        ? "text-green-400"
                        : metric.trend === "down"
                          ? "text-red-400"
                          : "text-slate-400"
                    }`}
                  >
                    {metric.change > 0 ? "+" : ""}
                    {metric.change.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">
                  {metric.id === "success_rate" ? `${metric.value.toFixed(1)}%` : Math.round(metric.value)}
                </div>
                <div className="text-sm text-slate-400">{metric.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Системная нагрузка */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-400" />
            Системная нагрузка
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">CPU</span>
                <span className="text-white font-medium">{Math.round(systemLoad.cpu)}%</span>
              </div>
              <Progress value={systemLoad.cpu} className="h-2" />
              <div className="text-xs text-slate-400">
                {systemLoad.cpu < 50
                  ? "Нормальная нагрузка"
                  : systemLoad.cpu < 80
                    ? "Высокая нагрузка"
                    : "Критическая нагрузка"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Память</span>
                <span className="text-white font-medium">{Math.round(systemLoad.memory)}%</span>
              </div>
              <Progress value={systemLoad.memory} className="h-2" />
              <div className="text-xs text-slate-400">
                {systemLoad.memory < 70 ? "Достаточно памяти" : "Мало памяти"}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Сеть</span>
                <span className="text-white font-medium">{Math.round(systemLoad.network)}%</span>
              </div>
              <Progress value={systemLoad.network} className="h-2" />
              <div className="text-xs text-slate-400">
                {systemLoad.network < 60 ? "Стабильное соединение" : "Высокая нагрузка"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
