"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Clock, Target, Zap, Download, RefreshCw } from "lucide-react"

export default function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [metric, setMetric] = useState("engagement")

  const performanceData = {
    engagement: [
      { period: "Неделя 1", value: 4.2, target: 5.0 },
      { period: "Неделя 2", value: 4.8, target: 5.0 },
      { period: "Неделя 3", value: 5.3, target: 5.0 },
      { period: "Неделя 4", value: 5.7, target: 5.0 },
    ],
    reach: [
      { period: "Неделя 1", value: 125000, target: 150000 },
      { period: "Неделя 2", value: 142000, target: 150000 },
      { period: "Неделя 3", value: 158000, target: 150000 },
      { period: "Неделя 4", value: 167000, target: 150000 },
    ],
    growth: [
      { period: "Неделя 1", value: 2.1, target: 3.0 },
      { period: "Неделя 2", value: 2.8, target: 3.0 },
      { period: "Неделя 3", value: 3.2, target: 3.0 },
      { period: "Неделя 4", value: 3.5, target: 3.0 },
    ],
  }

  const kpiMetrics = [
    {
      title: "ROI кампаний",
      value: "324%",
      target: "300%",
      progress: 108,
      trend: "+24%",
      color: "green",
    },
    {
      title: "Конверсия подписчиков",
      value: "12.8%",
      target: "15%",
      progress: 85,
      trend: "+2.3%",
      color: "blue",
    },
    {
      title: "Время отклика",
      value: "2.4 мин",
      target: "3 мин",
      progress: 120,
      trend: "-0.6 мин",
      color: "purple",
    },
    {
      title: "Качество контента",
      value: "8.7/10",
      target: "8.5/10",
      progress: 102,
      trend: "+0.3",
      color: "orange",
    },
  ]

  const automationStats = [
    { task: "Публикация постов", completed: 1247, failed: 23, success: 98.2 },
    { task: "Лайки и комментарии", completed: 8934, failed: 156, success: 98.3 },
    { task: "Подписки/отписки", completed: 2156, failed: 45, success: 97.9 },
    { task: "Просмотр Stories", completed: 5678, failed: 89, success: 98.4 },
    { task: "Прогрев аккаунтов", completed: 67, failed: 3, success: 95.7 },
  ]

  const timeAnalysis = [
    { hour: "00-02", activity: 5, efficiency: 85 },
    { hour: "02-04", activity: 3, efficiency: 90 },
    { hour: "04-06", activity: 8, efficiency: 88 },
    { hour: "06-08", activity: 15, efficiency: 92 },
    { hour: "08-10", activity: 25, efficiency: 95 },
    { hour: "10-12", activity: 35, efficiency: 97 },
    { hour: "12-14", activity: 45, efficiency: 94 },
    { hour: "14-16", activity: 40, efficiency: 96 },
    { hour: "16-18", activity: 50, efficiency: 98 },
    { hour: "18-20", activity: 55, efficiency: 97 },
    { hour: "20-22", activity: 35, efficiency: 93 },
    { hour: "22-00", activity: 20, efficiency: 89 },
  ]

  const currentData = performanceData[metric as keyof typeof performanceData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Аналитика производительности</h2>
          <p className="text-slate-400">Эффективность автоматизации и достижение целей</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="7d">7 дней</SelectItem>
              <SelectItem value="30d">30 дней</SelectItem>
              <SelectItem value="90d">90 дней</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((kpi, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-300 text-sm">{kpi.title}</h3>
                  <Badge
                    className={`${
                      kpi.color === "green"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : kpi.color === "blue"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : kpi.color === "purple"
                            ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                    }`}
                  >
                    {kpi.trend}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{kpi.value}</span>
                    <span className="text-slate-400 text-sm">/ {kpi.target}</span>
                  </div>
                  <Progress value={kpi.progress} className="h-2" />
                  <div className="text-xs text-slate-400">Прогресс: {kpi.progress}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Динамика показателей
              </CardTitle>
              <CardDescription className="text-slate-400">Прогресс в достижении целевых показателей</CardDescription>
            </div>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-[160px] bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Метрика" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                <SelectItem value="engagement">Вовлеченность</SelectItem>
                <SelectItem value="reach">Охват</SelectItem>
                <SelectItem value="growth">Рост</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end gap-4">
            {currentData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full h-[250px] flex flex-col-reverse gap-2">
                  <div
                    className="w-full bg-blue-500/70 rounded-t"
                    style={{ height: `${(data.value / Math.max(...currentData.map((d) => d.target))) * 200}px` }}
                    title={`Текущее: ${data.value}`}
                  ></div>
                  <div
                    className="w-full border-2 border-dashed border-slate-500 rounded"
                    style={{ height: `${(data.target / Math.max(...currentData.map((d) => d.target))) * 200}px` }}
                    title={`Цель: ${data.target}`}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-2 text-center">{data.period}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/70 rounded"></div>
              <span className="text-sm text-slate-300">Текущие показатели</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-dashed border-slate-500 rounded"></div>
              <span className="text-sm text-slate-300">Целевые показатели</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="automation" className="space-y-4">
        <TabsList className="bg-slate-700 border-slate-600">
          <TabsTrigger value="automation" className="data-[state=active]:bg-blue-600">
            <Zap className="h-4 w-4 mr-2" />
            Автоматизация
          </TabsTrigger>
          <TabsTrigger value="timing" className="data-[state=active]:bg-green-600">
            <Clock className="h-4 w-4 mr-2" />
            Временной анализ
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-purple-600">
            <Target className="h-4 w-4 mr-2" />
            Достижение целей
          </TabsTrigger>
        </TabsList>

        <TabsContent value="automation">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Статистика автоматизации</CardTitle>
              <CardDescription className="text-slate-400">
                Эффективность выполнения автоматических задач
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">{stat.task}</h4>
                      <Badge
                        className={`${
                          stat.success >= 98
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : stat.success >= 95
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {stat.success}%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-green-400 font-medium">{stat.completed.toLocaleString()}</div>
                        <div className="text-slate-400">Выполнено</div>
                      </div>
                      <div>
                        <div className="text-red-400 font-medium">{stat.failed.toLocaleString()}</div>
                        <div className="text-slate-400">Ошибки</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-medium">{stat.success}%</div>
                        <div className="text-slate-400">Успешность</div>
                      </div>
                    </div>
                    <Progress value={stat.success} className="h-2 mt-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Анализ активности по времени</CardTitle>
              <CardDescription className="text-slate-400">
                Оптимальные часы для максимальной эффективности
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeAnalysis.map((time, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-16 text-center">
                      <div className="text-white font-medium">{time.hour}</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Активность</span>
                        <span className="text-white">{time.activity}%</span>
                      </div>
                      <Progress value={time.activity} className="h-2" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Эффективность</span>
                        <span className="text-white">{time.efficiency}%</span>
                      </div>
                      <Progress value={time.efficiency} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Месячные цели</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { goal: "Новые подписчики", current: 12500, target: 15000, unit: "" },
                  { goal: "Публикации", current: 247, target: 300, unit: "" },
                  { goal: "Вовлеченность", current: 5.7, target: 6.0, unit: "%" },
                  { goal: "Охват", current: 890000, target: 1000000, unit: "" },
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">{goal.goal}</span>
                      <span className="text-white">
                        {goal.current.toLocaleString()}
                        {goal.unit} / {goal.target.toLocaleString()}
                        {goal.unit}
                      </span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    <div className="text-xs text-slate-400">
                      {Math.round((goal.current / goal.target) * 100)}% выполнено
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Прогноз достижения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { metric: "Подписчики", forecast: "16 дней", probability: 85, trend: "positive" },
                  { metric: "Публикации", forecast: "12 дней", probability: 92, trend: "positive" },
                  { metric: "Вовлеченность", forecast: "8 дней", probability: 78, trend: "positive" },
                  { metric: "Охват", forecast: "20 дней", probability: 67, trend: "neutral" },
                ].map((forecast, index) => (
                  <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{forecast.metric}</span>
                      <Badge
                        className={`${
                          forecast.trend === "positive"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : forecast.trend === "neutral"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {forecast.probability}%
                      </Badge>
                    </div>
                    <div className="text-slate-400 text-sm">Ожидаемое достижение: {forecast.forecast}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
