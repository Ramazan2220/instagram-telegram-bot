"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, Users, Heart, MessageCircle, Eye } from "lucide-react"

export default function WarmupAnalytics() {
  const [timeRange, setTimeRange] = useState("7d")

  const analyticsData = [
    { day: "День 1", follows: 5, likes: 15, comments: 1, stories: 8 },
    { day: "День 2", follows: 8, likes: 22, comments: 2, stories: 12 },
    { day: "День 3", follows: 12, likes: 28, comments: 3, stories: 15 },
    { day: "День 4", follows: 15, likes: 35, comments: 4, stories: 18 },
    { day: "День 5", follows: 18, likes: 42, comments: 5, stories: 22 },
    { day: "День 6", follows: 20, likes: 48, comments: 6, stories: 25 },
    { day: "День 7", follows: 22, likes: 52, comments: 7, stories: 28 },
  ]

  const successMetrics = [
    { metric: "Успешность прогрева", value: "94.2%", change: "+2.1%", color: "green" },
    { metric: "Средняя длительность", value: "12.5 дней", change: "-1.2 дня", color: "blue" },
    { metric: "Блокировок", value: "0.8%", change: "-0.3%", color: "red" },
    { metric: "Активных аккаунтов", value: "47", change: "+12", color: "purple" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Аналитика прогрева</h2>
          <p className="text-slate-400">Статистика и эффективность процесса прогрева аккаунтов</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="14d">14 дней</SelectItem>
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

      {/* Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {successMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-slate-400 text-sm">{metric.metric}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <Badge
                    className={
                      metric.color === "green"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : metric.color === "blue"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : metric.color === "red"
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    }
                  >
                    {metric.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Chart */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Динамика активности
          </CardTitle>
          <CardDescription className="text-slate-400">
            Прогресс увеличения активности в процессе прогрева
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end gap-4">
            {analyticsData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full h-[250px] flex flex-col-reverse gap-1">
                  <div
                    className="w-full bg-blue-500/70 rounded-t"
                    style={{ height: `${(data.follows / 25) * 60}px` }}
                    title={`Подписки: ${data.follows}`}
                  ></div>
                  <div
                    className="w-full bg-red-500/70"
                    style={{ height: `${(data.likes / 60) * 60}px` }}
                    title={`Лайки: ${data.likes}`}
                  ></div>
                  <div
                    className="w-full bg-green-500/70"
                    style={{ height: `${(data.comments / 10) * 60}px` }}
                    title={`Комментарии: ${data.comments}`}
                  ></div>
                  <div
                    className="w-full bg-purple-500/70 rounded-t"
                    style={{ height: `${(data.stories / 30) * 60}px` }}
                    title={`Stories: ${data.stories}`}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-2">{data.day}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/70 rounded"></div>
              <span className="text-sm text-slate-300">Подписки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/70 rounded"></div>
              <span className="text-sm text-slate-300">Лайки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/70 rounded"></div>
              <span className="text-sm text-slate-300">Комментарии</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500/70 rounded"></div>
              <span className="text-sm text-slate-300">Stories</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Statistics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Статистика по типам активности</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: "Подписки", icon: Users, current: 1247, target: 1500, color: "blue" },
              { type: "Лайки", icon: Heart, current: 3892, target: 4200, color: "red" },
              { type: "Комментарии", icon: MessageCircle, current: 156, target: 200, color: "green" },
              { type: "Stories", icon: Eye, current: 892, target: 1000, color: "purple" },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon
                      className={`h-4 w-4 ${
                        item.color === "blue"
                          ? "text-blue-400"
                          : item.color === "red"
                            ? "text-red-400"
                            : item.color === "green"
                              ? "text-green-400"
                              : "text-purple-400"
                      }`}
                    />
                    <span className="text-slate-300">{item.type}</span>
                  </div>
                  <span className="text-white">
                    {item.current}/{item.target}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.color === "blue"
                        ? "bg-blue-500"
                        : item.color === "red"
                          ? "bg-red-500"
                          : item.color === "green"
                            ? "bg-green-500"
                            : "bg-purple-500"
                    }`}
                    style={{ width: `${(item.current / item.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Результаты прогрева</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {[
                { period: "Последние 7 дней", accounts: 12, success: 11, failed: 1 },
                { period: "Последние 14 дней", accounts: 28, success: 26, failed: 2 },
                { period: "Последний месяц", accounts: 67, success: 63, failed: 4 },
                { period: "Всего", accounts: 156, success: 147, failed: 9 },
              ].map((period, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{period.period}</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {period.accounts} аккаунтов
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Успешно: {period.success}</span>
                    <span className="text-red-400">Неудачно: {period.failed}</span>
                    <span className="text-slate-400">
                      Успешность: {Math.round((period.success / period.accounts) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
