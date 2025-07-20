"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, TrendingDown, Users, Heart, Upload, Download, Target } from "lucide-react"

export default function AnalyticsOverview() {
  const [timeRange, setTimeRange] = useState("7d")

  const overviewStats = [
    {
      title: "Общий охват",
      value: "2.4M",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue",
      description: "Суммарные подписчики всех аккаунтов",
    },
    {
      title: "Активность сегодня",
      value: "15,247",
      change: "+8.3%",
      trend: "up",
      icon: Heart,
      color: "red",
      description: "Лайки, комментарии, подписки",
    },
    {
      title: "Публикаций",
      value: "1,847",
      change: "+23.1%",
      trend: "up",
      icon: Upload,
      color: "green",
      description: "Опубликовано за выбранный период",
    },
    {
      title: "Вовлеченность",
      value: "4.2%",
      change: "-0.3%",
      trend: "down",
      icon: Target,
      color: "purple",
      description: "Средний уровень вовлеченности",
    },
  ]

  const activityData = [
    { date: "01.01", posts: 45, likes: 1250, comments: 89, follows: 234 },
    { date: "02.01", posts: 52, likes: 1420, comments: 102, follows: 267 },
    { date: "03.01", posts: 38, likes: 1180, comments: 76, follows: 198 },
    { date: "04.01", posts: 61, likes: 1680, comments: 134, follows: 312 },
    { date: "05.01", posts: 47, likes: 1340, comments: 95, follows: 245 },
    { date: "06.01", posts: 55, likes: 1520, comments: 118, follows: 289 },
    { date: "07.01", posts: 49, likes: 1390, comments: 87, follows: 256 },
  ]

  const topPerformers = [
    { username: "@fashion_style_2024", followers: "125K", engagement: "6.8%", posts: 156, growth: "+2.3K" },
    { username: "@travel_blogger_pro", followers: "89K", engagement: "5.4%", posts: 234, growth: "+1.8K" },
    { username: "@fitness_motivation", followers: "67K", engagement: "7.2%", posts: 189, growth: "+1.5K" },
    { username: "@food_lover_daily", followers: "45K", engagement: "4.9%", posts: 298, growth: "+1.2K" },
    { username: "@tech_reviews_hub", followers: "78K", engagement: "3.8%", posts: 145, growth: "+0.9K" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Обзор аналитики</h2>
          <p className="text-slate-400">Ключевые метрики и показатели эффективности</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Период" />
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

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === "blue"
                      ? "bg-blue-500/20"
                      : stat.color === "red"
                        ? "bg-red-500/20"
                        : stat.color === "green"
                          ? "bg-green-500/20"
                          : "bg-purple-500/20"
                  }`}
                >
                  <stat.icon
                    className={`h-6 w-6 ${
                      stat.color === "blue"
                        ? "text-blue-400"
                        : stat.color === "red"
                          ? "text-red-400"
                          : stat.color === "green"
                            ? "text-green-400"
                            : "text-purple-400"
                    }`}
                  />
                </div>
                <Badge
                  className={`${
                    stat.trend === "up"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.title}</p>
                <p className="text-slate-500 text-xs">{stat.description}</p>
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
            Активность за период
          </CardTitle>
          <CardDescription className="text-slate-400">Динамика публикаций и взаимодействий</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-end gap-2">
            {activityData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full h-[250px] flex flex-col-reverse gap-1">
                  <div
                    className="w-full bg-blue-500/70 rounded-t"
                    style={{ height: `${(data.posts / 70) * 60}px` }}
                    title={`Посты: ${data.posts}`}
                  ></div>
                  <div
                    className="w-full bg-red-500/70"
                    style={{ height: `${(data.likes / 2000) * 60}px` }}
                    title={`Лайки: ${data.likes}`}
                  ></div>
                  <div
                    className="w-full bg-green-500/70"
                    style={{ height: `${(data.comments / 150) * 60}px` }}
                    title={`Комментарии: ${data.comments}`}
                  ></div>
                  <div
                    className="w-full bg-purple-500/70 rounded-t"
                    style={{ height: `${(data.follows / 350) * 60}px` }}
                    title={`Подписки: ${data.follows}`}
                  ></div>
                </div>
                <div className="text-xs text-slate-400 mt-2">{data.date}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/70 rounded"></div>
              <span className="text-sm text-slate-300">Посты</span>
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
              <span className="text-sm text-slate-300">Подписки</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            Топ аккаунты по эффективности
          </CardTitle>
          <CardDescription className="text-slate-400">Лучшие результаты по вовлеченности и росту</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{account.username}</h4>
                    <p className="text-slate-400 text-sm">{account.posts} публикаций</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-white font-medium">{account.followers}</div>
                    <div className="text-slate-400 text-xs">Подписчики</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-medium">{account.engagement}</div>
                    <div className="text-slate-400 text-xs">Вовлеченность</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-medium">{account.growth}</div>
                    <div className="text-slate-400 text-xs">Рост за период</div>
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
