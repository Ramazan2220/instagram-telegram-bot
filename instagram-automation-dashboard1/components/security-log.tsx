"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Search,
  Download,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
} from "lucide-react"

interface SecurityLogEntry {
  id: string
  timestamp: string
  type: "login" | "action" | "security" | "system" | "error"
  severity: "low" | "medium" | "high" | "critical"
  event: string
  description: string
  account?: string
  ip?: string
  userAgent?: string
  status: "success" | "failed" | "blocked" | "warning"
}

export default function SecurityLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")

  const [logs, setLogs] = useState<SecurityLogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-15 14:30:25",
      type: "security",
      severity: "critical",
      event: "Account Block Detected",
      description: "Аккаунт @food_lover_daily заблокирован для выполнения лайков",
      account: "@food_lover_daily",
      ip: "192.168.1.100",
      status: "blocked",
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:25:10",
      type: "action",
      severity: "medium",
      event: "API Limit Reached",
      description: "Достигнут дневной лимит подписок для аккаунта @travel_blogger_pro",
      account: "@travel_blogger_pro",
      ip: "192.168.1.101",
      status: "warning",
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:20:45",
      type: "login",
      severity: "high",
      event: "Suspicious Login",
      description: "Обнаружен вход с нового IP-адреса",
      account: "@food_lover_daily",
      ip: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "warning",
    },
    {
      id: "4",
      timestamp: "2024-01-15 14:15:30",
      type: "system",
      severity: "low",
      event: "Proxy Rotation",
      description: "Автоматическая смена прокси для аккаунта @fashion_style_2024",
      account: "@fashion_style_2024",
      ip: "198.51.100.25",
      status: "success",
    },
    {
      id: "5",
      timestamp: "2024-01-15 14:10:15",
      type: "security",
      severity: "medium",
      event: "Rate Limit Warning",
      description: "Предупреждение о приближении к лимиту комментариев",
      account: "@tech_reviews_hub",
      ip: "192.168.1.102",
      status: "warning",
    },
    {
      id: "6",
      timestamp: "2024-01-15 14:05:00",
      type: "action",
      severity: "low",
      event: "Successful Automation",
      description: "Успешно выполнено 25 лайков для аккаунта @fitness_motivation",
      account: "@fitness_motivation",
      ip: "192.168.1.103",
      status: "success",
    },
    {
      id: "7",
      timestamp: "2024-01-15 14:00:45",
      type: "login",
      severity: "low",
      event: "Successful Login",
      description: "Успешный вход в систему",
      account: "@fashion_style_2024",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      status: "success",
    },
    {
      id: "8",
      timestamp: "2024-01-15 13:55:30",
      type: "error",
      severity: "high",
      event: "Connection Failed",
      description: "Не удалось подключиться к Instagram API",
      account: "@travel_blogger_pro",
      ip: "192.168.1.101",
      status: "failed",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "login":
        return <Lock className="h-4 w-4" />
      case "action":
        return <RefreshCw className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "system":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "login":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "action":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "security":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "system":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      default:
        return <FileText className="h-4 w-4 text-slate-400" />
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.account && log.account.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = filterType === "all" || log.type === filterType
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity

    return matchesSearch && matchesType && matchesSeverity
  })

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-400" />
            Журнал безопасности
          </CardTitle>
          <CardDescription className="text-slate-400">
            Подробный журнал всех событий безопасности и активности системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Поиск по событиям, описанию или аккаунту..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Тип события" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="login">Входы</SelectItem>
                  <SelectItem value="action">Действия</SelectItem>
                  <SelectItem value="security">Безопасность</SelectItem>
                  <SelectItem value="system">Система</SelectItem>
                  <SelectItem value="error">Ошибки</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Критичность" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Все уровни</SelectItem>
                  <SelectItem value="low">Низкая</SelectItem>
                  <SelectItem value="medium">Средняя</SelectItem>
                  <SelectItem value="high">Высокая</SelectItem>
                  <SelectItem value="critical">Критическая</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-white">{logs.length}</div>
                <div className="text-xs text-slate-400">Всего событий</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-red-400">
                  {logs.filter((log) => log.severity === "critical").length}
                </div>
                <div className="text-xs text-slate-400">Критических</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-yellow-400">
                  {logs.filter((log) => log.status === "warning").length}
                </div>
                <div className="text-xs text-slate-400">Предупреждений</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-400">
                  {logs.filter((log) => log.status === "success").length}
                </div>
                <div className="text-xs text-slate-400">Успешных</div>
              </div>
            </div>

            <div className="space-y-2">
              {filteredLogs.map((log) => (
                <div key={log.id} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{getStatusIcon(log.status)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-medium">{log.event}</h4>
                          <Badge className={getTypeColor(log.type)}>
                            {getTypeIcon(log.type)}
                            <span className="ml-1 capitalize">{log.type}</span>
                          </Badge>
                          <Badge className={getSeverityColor(log.severity)}>
                            <span className="capitalize">{log.severity}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{log.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            {log.timestamp}
                          </span>
                          {log.account && (
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {log.account}
                            </span>
                          )}
                          {log.ip && (
                            <span className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {log.ip}
                            </span>
                          )}
                        </div>
                        {log.userAgent && (
                          <div className="mt-2 text-xs text-slate-500 truncate">User-Agent: {log.userAgent}</div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2">Нет событий</h3>
                <p className="text-slate-400">
                  {searchTerm || filterType !== "all" || filterSeverity !== "all"
                    ? "Попробуйте изменить фильтры поиска"
                    : "События безопасности будут отображаться здесь"}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-slate-700">
              <div className="text-sm text-slate-400">
                Показано {filteredLogs.length} из {logs.length} событий
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Предыдущая
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                  Следующая
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Настройки журналирования
          </CardTitle>
          <CardDescription className="text-slate-400">Настройте параметры ведения журнала безопасности</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-white font-medium">Уровни логирования</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Критические события</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Включено</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Предупреждения</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Включено</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Информационные</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Включено</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Отладочные</span>
                    <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Отключено</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-medium">Хранение логов</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Период хранения</span>
                    <span className="text-sm text-white">90 дней</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Автоархивирование</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Включено</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Сжатие старых логов</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Включено</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Размер журнала</span>
                    <span className="text-sm text-white">2.4 МБ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                Очистить старые логи
              </Button>
              <Button className="bg-slate-600 hover:bg-slate-700">Настроить</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
