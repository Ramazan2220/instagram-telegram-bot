"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Users, CheckCircle, AlertTriangle, XCircle, Activity, Zap } from "lucide-react"

interface AccountStatus {
  id: string
  username: string
  status: "active" | "warning" | "error" | "paused"
  activity: number
  lastAction: string
  proxy: string
  riskLevel: number
}

export default function AccountStatusMonitor() {
  const [accounts, setAccounts] = useState<AccountStatus[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  // Симуляция данных аккаунтов
  useEffect(() => {
    const generateAccounts = () => {
      const statuses: AccountStatus["status"][] = ["active", "warning", "error", "paused"]
      const actions = ["Лайк поста", "Комментарий", "Подписка", "Просмотр Stories", "DM отправлено"]

      return Array.from({ length: 20 }, (_, i) => ({
        id: `acc_${i + 1}`,
        username: `@account_${i + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        activity: Math.floor(Math.random() * 100),
        lastAction: actions[Math.floor(Math.random() * actions.length)],
        proxy: `Proxy-${Math.floor(Math.random() * 10) + 1}`,
        riskLevel: Math.floor(Math.random() * 100),
      }))
    }

    setAccounts(generateAccounts())

    // Обновление данных каждые 5 секунд
    const interval = setInterval(() => {
      setAccounts((prev) =>
        prev.map((account) => ({
          ...account,
          activity: Math.max(0, account.activity + (Math.random() - 0.5) * 20),
          riskLevel: Math.max(0, Math.min(100, account.riskLevel + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "paused":
        return <Activity className="h-4 w-4 text-slate-400" />
      default:
        return <Activity className="h-4 w-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "paused":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getRiskColor = (risk: number) => {
    if (risk < 30) return "text-green-400"
    if (risk < 70) return "text-yellow-400"
    return "text-red-400"
  }

  const filteredAccounts = accounts.filter((account) => {
    if (selectedStatus === "all") return true
    return account.status === selectedStatus
  })

  const statusCounts = {
    active: accounts.filter((a) => a.status === "active").length,
    warning: accounts.filter((a) => a.status === "warning").length,
    error: accounts.filter((a) => a.status === "error").length,
    paused: accounts.filter((a) => a.status === "paused").length,
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-400" />
          Мониторинг аккаунтов
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Статистика статусов */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{statusCounts.active}</div>
            <div className="text-xs text-slate-400">Активные</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.warning}</div>
            <div className="text-xs text-slate-400">Предупреждения</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{statusCounts.error}</div>
            <div className="text-xs text-slate-400">Ошибки</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
            <div className="text-2xl font-bold text-slate-400">{statusCounts.paused}</div>
            <div className="text-xs text-slate-400">Приостановлены</div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "warning", "error", "paused"].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className={
                selectedStatus === status
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }
            >
              {status === "all"
                ? "Все"
                : status === "active"
                  ? "Активные"
                  : status === "warning"
                    ? "Предупреждения"
                    : status === "error"
                      ? "Ошибки"
                      : "Приостановлены"}
            </Button>
          ))}
        </div>

        {/* Список аккаунтов */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredAccounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {account.username.charAt(1).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-medium">{account.username}</span>
                  <Badge className={getStatusColor(account.status)} variant="outline">
                    {getStatusIcon(account.status)}
                    <span className="ml-1 capitalize">{account.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-400">Последнее: {account.lastAction}</span>
                  <span className="text-slate-400">Прокси: {account.proxy}</span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-blue-400" />
                  <span className="text-sm text-white">{Math.round(account.activity)}%</span>
                </div>
                <Progress value={account.activity} className="w-16 h-1" />
              </div>

              <div className="text-right space-y-1">
                <div className={`text-sm font-medium ${getRiskColor(account.riskLevel)}`}>
                  Риск: {Math.round(account.riskLevel)}%
                </div>
                <Progress value={account.riskLevel} className="w-16 h-1" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
