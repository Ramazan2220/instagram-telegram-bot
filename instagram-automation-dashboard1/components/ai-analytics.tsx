"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  Zap,
  Clock,
  Users,
  MessageSquare,
  Heart,
  Eye,
  Download,
} from "lucide-react"

export default function AIAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")

  const aiMetrics = {
    contentGenerated: 1247,
    interactionsAutomated: 8934,
    engagementRate: 12.5,
    timesSaved: 156,
    successRate: 89.2,
    costSavings: 2340,
  }

  const contentPerformance = [
    {
      type: "Мотивационные посты",
      generated: 234,
      avgEngagement: 8.7,
      bestTime: "18:00-20:00",
      trend: "up",
    },
    {
      type: "Продуктовые посты",
      generated: 156,
      avgEngagement: 12.3,
      bestTime: "12:00-14:00",
      trend: "up",
    },
    {
      type: "Образовательный контент",
      generated: 189,
      avgEngagement: 6.4,
      bestTime: "09:00-11:00",
      trend: "down",
    },
    {
      type: "Stories",
      generated: 445,
      avgEngagement: 15.2,
      bestTime: "19:00-21:00",
      trend: "up",
    },
  ]

  const interactionStats = [
    {
      type: "Автолайки",
      count: 5234,
      success: 94.2,
      avgResponse: "2.3 сек",
      engagement: "+23%",
    },
    {
      type: "Умные комментарии",
      count: 1456,
      success: 87.8,
      avgResponse: "15.7 сек",
      engagement: "+45%",
    },
    {
      type: "Автоподписки",
      count: 789,
      success: 76.4,
      avgResponse: "8.2 сек",
      engagement: "+12%",
    },
    {
      type: "DM ответы",
      count: 234,
      success: 91.3,
      avgResponse: "45.1 сек",
      engagement: "+67%",
    },
  ]

  const aiInsights = [
    {
      title: "Оптимальное время публикации",
      description: "ИИ определил, что посты в 18:00-20:00 получают на 34% больше взаимодействий",
      impact: "high",
      action: "Настроить автопубликацию",
    },
    {
      title: "Эффективные хештеги",
      description: "Комбинация #мотивация + #успех показывает лучшие результаты",
      impact: "medium",
      action: "Обновить шаблоны",
    },
    {
      title: "Стиль комментариев",
      description: "Короткие эмоциональные комментарии получают больше ответов",
      impact: "medium",
      action: "Адаптировать стратегию",
    },
    {
      title: "Частота публикаций",
      description: "Рекомендуется снизить частоту до 2-3 постов в день",
      impact: "low",
      action: "Изменить расписание",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">ИИ Аналитика</h2>
          <p className="text-slate-400">Анализ эффективности ИИ автоматизации</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="bg-slate-800 border-slate-700 text-white w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="24h">24 часа</SelectItem>
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
              <SelectItem value="90d">90 дней</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span className="text-slate-300 text-sm">Контент сгенерирован</span>
            </div>
            <p className="text-2xl font-bold text-white">{aiMetrics.contentGenerated.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">+15% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-slate-300 text-sm">Взаимодействий</span>
            </div>
            <p className="text-2xl font-bold text-white">{aiMetrics.interactionsAutomated.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">+23% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-400" />
              <span className="text-slate-300 text-sm">Вовлеченность</span>
            </div>
            <p className="text-2xl font-bold text-white">{aiMetrics.engagementRate}%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">+2.1% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-green-400" />
              <span className="text-slate-300 text-sm">Время сэкономлено</span>
            </div>
            <p className="text-2xl font-bold text-white">{aiMetrics.timesSaved}ч</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">+8ч за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-orange-400" />
              <span className="text-slate-300 text-sm">Успешность</span>
            </div>
            <p className="text-2xl font-bold text-white">{aiMetrics.successRate}%</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">+1.2% за неделю</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-cyan-400" />
              <span className="text-slate-300 text-sm">Экономия</span>
            </div>
            <p className="text-2xl font-bold text-white">${aiMetrics.costSavings}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-xs text-green-400">+$340 за неделю</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Performance */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              Эффективность контента
            </CardTitle>
            <CardDescription className="text-slate-400">Анализ сгенерированного ИИ контента</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contentPerformance.map((item, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{item.type}</h4>
                  <div className="flex items-center gap-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <Badge
                      className={item.trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
                    >
                      {item.avgEngagement}%
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Сгенерировано:</span>
                    <p className="text-white font-medium">{item.generated}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Лучшее время:</span>
                    <p className="text-white font-medium">{item.bestTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Interaction Statistics */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Статистика взаимодействий
            </CardTitle>
            <CardDescription className="text-slate-400">Результаты автоматических взаимодействий</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interactionStats.map((stat, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {stat.type === "Автолайки" && <Heart className="h-4 w-4 text-red-400" />}
                    {stat.type === "Умные комментарии" && <MessageSquare className="h-4 w-4 text-blue-400" />}
                    {stat.type === "Автоподписки" && <Users className="h-4 w-4 text-green-400" />}
                    {stat.type === "DM ответы" && <MessageSquare className="h-4 w-4 text-purple-400" />}
                    <h4 className="text-white font-medium">{stat.type}</h4>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">{stat.engagement}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm mb-3">
                  <div>
                    <span className="text-slate-400">Выполнено:</span>
                    <p className="text-white font-medium">{stat.count.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Успешность:</span>
                    <p className="text-white font-medium">{stat.success}%</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Ср. время:</span>
                    <p className="text-white font-medium">{stat.avgResponse}</p>
                  </div>
                </div>

                <Progress value={stat.success} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-cyan-400" />
            ИИ Инсайты и рекомендации
          </CardTitle>
          <CardDescription className="text-slate-400">
            Автоматические рекомендации для улучшения результатов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{insight.title}</h4>
                  <Badge
                    className={
                      insight.impact === "high"
                        ? "bg-red-500/20 text-red-400"
                        : insight.impact === "medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }
                  >
                    {insight.impact === "high" ? "Высокий" : insight.impact === "medium" ? "Средний" : "Низкий"}
                  </Badge>
                </div>
                <p className="text-slate-300 text-sm mb-3">{insight.description}</p>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  {insight.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
