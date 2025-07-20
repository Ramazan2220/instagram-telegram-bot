"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Heart, MessageCircle, Eye, TrendingUp, Search, MoreHorizontal, Target, Activity } from "lucide-react"

interface AccountData {
  id: string
  username: string
  followers: number
  following: number
  posts: number
  engagement: number
  growth: number
  status: "active" | "warming" | "paused" | "error"
  lastActive: string
  metrics: {
    likes: number
    comments: number
    shares: number
    saves: number
    reach: number
    impressions: number
  }
  weeklyGrowth: number[]
}

export default function AccountAnalytics() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("engagement")
  const [filterStatus, setFilterStatus] = useState("all")

  const accounts: AccountData[] = [
    {
      id: "1",
      username: "@fashion_style_2024",
      followers: 125000,
      following: 892,
      posts: 156,
      engagement: 6.8,
      growth: 12.5,
      status: "active",
      lastActive: "2 мин назад",
      metrics: {
        likes: 8500,
        comments: 340,
        shares: 125,
        saves: 890,
        reach: 45000,
        impressions: 78000,
      },
      weeklyGrowth: [2.1, 3.4, 1.8, 4.2, 2.9, 3.7, 2.5],
    },
    {
      id: "2",
      username: "@travel_blogger_pro",
      followers: 89000,
      following: 1245,
      posts: 234,
      engagement: 5.4,
      growth: 8.3,
      status: "active",
      lastActive: "15 мин назад",
      metrics: {
        likes: 4800,
        comments: 190,
        shares: 67,
        saves: 420,
        reach: 32000,
        impressions: 56000,
      },
      weeklyGrowth: [1.8, 2.1, 2.9, 1.5, 3.2, 2.4, 1.9],
    },
    {
      id: "3",
      username: "@fitness_motivation",
      followers: 67000,
      following: 567,
      posts: 189,
      engagement: 7.2,
      growth: 15.7,
      status: "active",
      lastActive: "1 час назад",
      metrics: {
        likes: 4900,
        comments: 280,
        shares: 95,
        saves: 650,
        reach: 28000,
        impressions: 48000,
      },
      weeklyGrowth: [3.2, 4.1, 2.8, 5.1, 3.9, 4.5, 3.6],
    },
    {
      id: "4",
      username: "@food_lover_daily",
      followers: 45000,
      following: 234,
      posts: 298,
      engagement: 4.9,
      growth: -2.1,
      status: "warming",
      lastActive: "3 часа назад",
      metrics: {
        likes: 2200,
        comments: 89,
        shares: 34,
        saves: 180,
        reach: 18000,
        impressions: 32000,
      },
      weeklyGrowth: [1.2, 0.8, -0.5, 1.1, 0.9, -0.3, 0.7],
    },
    {
      id: "5",
      username: "@tech_reviews_hub",
      followers: 78000,
      following: 445,
      posts: 145,
      engagement: 3.8,
      growth: 5.2,
      status: "paused",
      lastActive: "1 день назад",
      metrics: {
        likes: 2950,
        comments: 125,
        shares: 78,
        saves: 340,
        reach: 25000,
        impressions: 42000,
      },
      weeklyGrowth: [1.5, 1.8, 1.2, 2.1, 1.7, 1.9, 1.4],
    },
  ]

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || account.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    switch (sortBy) {
      case "followers":
        return b.followers - a.followers
      case "engagement":
        return b.engagement - a.engagement
      case "growth":
        return b.growth - a.growth
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warming":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "paused":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Аналитика аккаунтов</h2>
          <p className="text-slate-400">Детальная статистика по каждому аккаунту</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Поиск аккаунтов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="followers">По подписчикам</SelectItem>
              <SelectItem value="engagement">По вовлеченности</SelectItem>
              <SelectItem value="growth">По росту</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-white">
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="warming">Прогрев</SelectItem>
              <SelectItem value="paused">Приостановлены</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {formatNumber(accounts.reduce((sum, acc) => sum + acc.followers, 0))}
                </p>
                <p className="text-sm text-slate-400">Общий охват</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {(accounts.reduce((sum, acc) => sum + acc.engagement, 0) / accounts.length).toFixed(1)}%
                </p>
                <p className="text-sm text-slate-400">Средняя вовлеченность</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  +{(accounts.reduce((sum, acc) => sum + acc.growth, 0) / accounts.length).toFixed(1)}%
                </p>
                <p className="text-sm text-slate-400">Средний рост</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {accounts.filter((acc) => acc.status === "active").length}
                </p>
                <p className="text-sm text-slate-400">Активных аккаунтов</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {sortedAccounts.map((account) => (
          <Card key={account.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{account.username}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(account.status)}>
                        {account.status === "active"
                          ? "Активен"
                          : account.status === "warming"
                            ? "Прогрев"
                            : account.status === "paused"
                              ? "Приостановлен"
                              : "Ошибка"}
                      </Badge>
                      <span className="text-slate-400 text-sm">Активность: {account.lastActive}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Main Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(account.followers)}</div>
                  <div className="text-slate-400 text-sm">Подписчики</div>
                  <div className={`text-xs ${account.growth >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {account.growth >= 0 ? "+" : ""}
                    {account.growth}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(account.following)}</div>
                  <div className="text-slate-400 text-sm">Подписки</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{account.posts}</div>
                  <div className="text-slate-400 text-sm">Публикации</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{account.engagement}%</div>
                  <div className="text-slate-400 text-sm">Вовлеченность</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{formatNumber(account.metrics.reach)}</div>
                  <div className="text-slate-400 text-sm">Охват</div>
                </div>
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <div>
                    <div className="text-white font-medium">{formatNumber(account.metrics.likes)}</div>
                    <div className="text-slate-400 text-xs">Лайки</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-400" />
                  <div>
                    <div className="text-white font-medium">{formatNumber(account.metrics.comments)}</div>
                    <div className="text-slate-400 text-xs">Комментарии</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">{formatNumber(account.metrics.shares)}</div>
                    <div className="text-slate-400 text-xs">Репосты</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">{formatNumber(account.metrics.saves)}</div>
                    <div className="text-slate-400 text-xs">Сохранения</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-orange-400" />
                  <div>
                    <div className="text-white font-medium">{formatNumber(account.metrics.impressions)}</div>
                    <div className="text-slate-400 text-xs">Показы</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-cyan-400" />
                  <div>
                    <div className="text-white font-medium">{formatNumber(account.metrics.reach)}</div>
                    <div className="text-slate-400 text-xs">Охват</div>
                  </div>
                </div>
              </div>

              {/* Weekly Growth Chart */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Рост за неделю</span>
                  <span className="text-white text-sm">
                    {account.weeklyGrowth[account.weeklyGrowth.length - 1] >= 0 ? "+" : ""}
                    {account.weeklyGrowth[account.weeklyGrowth.length - 1]}%
                  </span>
                </div>
                <div className="flex items-end gap-1 h-12">
                  {account.weeklyGrowth.map((growth, index) => (
                    <div
                      key={index}
                      className={`flex-1 rounded-t ${growth >= 0 ? "bg-green-500/70" : "bg-red-500/70"}`}
                      style={{ height: `${Math.abs(growth) * 8}px` }}
                      title={`День ${index + 1}: ${growth >= 0 ? "+" : ""}${growth}%`}
                    ></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
