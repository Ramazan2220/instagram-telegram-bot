"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, CheckCircle, Eye, FileText, Lock, RefreshCw, Shield, XCircle } from "lucide-react"

interface AccountRisk {
  id: string
  username: string
  riskScore: number
  riskLevel: "low" | "medium" | "high"
  lastCheck: string
  issues: {
    activitySpikes: boolean
    suspiciousLogins: boolean
    contentWarnings: boolean
    apiLimitReached: boolean
    actionBlocks: boolean
  }
}

export default function RiskMonitoring() {
  const [accounts, setAccounts] = useState<AccountRisk[]>([
    {
      id: "1",
      username: "@fashion_style_2024",
      riskScore: 15,
      riskLevel: "low",
      lastCheck: "10 минут назад",
      issues: {
        activitySpikes: false,
        suspiciousLogins: false,
        contentWarnings: false,
        apiLimitReached: false,
        actionBlocks: false,
      },
    },
    {
      id: "2",
      username: "@travel_blogger_pro",
      riskScore: 45,
      riskLevel: "medium",
      lastCheck: "25 минут назад",
      issues: {
        activitySpikes: true,
        suspiciousLogins: false,
        contentWarnings: false,
        apiLimitReached: true,
        actionBlocks: false,
      },
    },
    {
      id: "3",
      username: "@fitness_motivation",
      riskScore: 10,
      riskLevel: "low",
      lastCheck: "5 минут назад",
      issues: {
        activitySpikes: false,
        suspiciousLogins: false,
        contentWarnings: false,
        apiLimitReached: false,
        actionBlocks: false,
      },
    },
    {
      id: "4",
      username: "@food_lover_daily",
      riskScore: 75,
      riskLevel: "high",
      lastCheck: "15 минут назад",
      issues: {
        activitySpikes: true,
        suspiciousLogins: true,
        contentWarnings: true,
        apiLimitReached: true,
        actionBlocks: true,
      },
    },
    {
      id: "5",
      username: "@tech_reviews_hub",
      riskScore: 25,
      riskLevel: "low",
      lastCheck: "30 минут назад",
      issues: {
        activitySpikes: false,
        suspiciousLogins: false,
        contentWarnings: true,
        apiLimitReached: false,
        actionBlocks: false,
      },
    },
  ])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getProgressColor = (score: number) => {
    if (score <= 30) return "bg-green-500"
    if (score <= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-yellow-400" />
            Мониторинг рисков
          </CardTitle>
          <CardDescription className="text-slate-400">
            Отслеживание рисков блокировки для всех аккаунтов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-sm text-slate-400">Низкий риск</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">1</div>
                    <div className="text-sm text-slate-400">Средний риск</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">1</div>
                    <div className="text-sm text-slate-400">Высокий риск</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Аккаунт</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Уровень риска</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Проблемы</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Последняя проверка</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id} className="border-b border-slate-700/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {account.username.charAt(1).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{account.username}</div>
                            <div className="text-xs text-slate-400">ID: {account.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-2">
                          <Badge className={getRiskColor(account.riskLevel)}>
                            {getRiskIcon(account.riskLevel)}
                            <span className="ml-1 capitalize">{account.riskLevel}</span>
                          </Badge>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(account.riskScore)}`}
                              style={{ width: `${account.riskScore}%` }}
                            />
                          </div>
                          <div className="text-xs text-slate-400">{account.riskScore}/100</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {account.issues.activitySpikes && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                              Всплески активности
                            </Badge>
                          )}
                          {account.issues.suspiciousLogins && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                              Подозрительные входы
                            </Badge>
                          )}
                          {account.issues.contentWarnings && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              Предупреждения
                            </Badge>
                          )}
                          {account.issues.apiLimitReached && (
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                              Лимит API
                            </Badge>
                          )}
                          {account.issues.actionBlocks && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                              Блокировка действий
                            </Badge>
                          )}
                          {!Object.values(account.issues).some(Boolean) && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              Нет проблем
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-slate-300">{account.lastCheck}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs border-slate-600 text-slate-300">
                            <Eye className="h-3 w-3 mr-1" />
                            Детали
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs border-slate-600 text-slate-300">
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Проверить
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-400">Показано 5 из 12 аккаунтов</div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Проверить все
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Экспорт отчета</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="alerts" className="data-[state=active]:bg-red-600">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Активные алерты
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-blue-600">
            <FileText className="h-4 w-4 mr-2" />
            История рисков
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-green-600">
            <Shield className="h-4 w-4 mr-2" />
            Настройки мониторинга
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Активные алерты
              </CardTitle>
              <CardDescription className="text-slate-400">
                Критические проблемы, требующие немедленного внимания
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <XCircle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">Блокировка действий</h4>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Критично</Badge>
                      </div>
                      <p className="text-sm text-slate-300 mt-1">
                        Аккаунт @food_lover_daily заблокирован для лайков и комментариев
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">5 минут назад</span>
                        <Button variant="outline" size="sm" className="h-6 text-xs border-red-600 text-red-400">
                          Приостановить активность
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">Превышение лимитов API</h4>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Предупреждение</Badge>
                      </div>
                      <p className="text-sm text-slate-300 mt-1">
                        Аккаунт @travel_blogger_pro достиг дневного лимита подписок
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">15 минут назад</span>
                        <Button variant="outline" size="sm" className="h-6 text-xs border-yellow-600 text-yellow-400">
                          Снизить активность
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-900/20 border border-orange-800/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Lock className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">Подозрительный вход</h4>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Внимание</Badge>
                      </div>
                      <p className="text-sm text-slate-300 mt-1">
                        Обнаружен вход с нового IP-адреса для @food_lover_daily
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">1 час назад</span>
                        <Button variant="outline" size="sm" className="h-6 text-xs border-orange-600 text-orange-400">
                          Проверить безопасность
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                История рисков
              </CardTitle>
              <CardDescription className="text-slate-400">
                Журнал всех событий безопасности за последние 30 дней
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      Сегодня
                    </Button>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      7 дней
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-600 text-blue-400 bg-blue-600/20">
                      30 дней
                    </Button>
                  </div>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <FileText className="h-4 w-4 mr-2" />
                    Экспорт
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Блокировка действий</span>
                        <span className="text-xs text-slate-400">Сегодня, 14:30</span>
                      </div>
                      <p className="text-sm text-slate-400">@food_lover_daily - заблокированы лайки</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Превышение лимитов</span>
                        <span className="text-xs text-slate-400">Сегодня, 12:15</span>
                      </div>
                      <p className="text-sm text-slate-400">@travel_blogger_pro - лимит подписок</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Подозрительный вход</span>
                        <span className="text-xs text-slate-400">Вчера, 18:45</span>
                      </div>
                      <p className="text-sm text-slate-400">@food_lover_daily - новый IP</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Риск снижен</span>
                        <span className="text-xs text-slate-400">2 дня назад, 10:20</span>
                      </div>
                      <p className="text-sm text-slate-400">@fashion_style_2024 - нормализация активности</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Настройки мониторинга
              </CardTitle>
              <CardDescription className="text-slate-400">
                Настройте параметры отслеживания рисков и уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Частота проверок</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Автоматическая проверка</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Каждые 5 минут</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Глубокий анализ</span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Каждый час</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Отчет безопасности</span>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Ежедневно</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-medium">Пороги уведомлений</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Низкий риск</span>
                        <span className="text-sm text-green-400">0-30 баллов</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Средний риск</span>
                        <span className="text-sm text-yellow-400">31-60 баллов</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">Высокий риск</span>
                        <span className="text-sm text-red-400">61-100 баллов</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    Сбросить
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">Сохранить настройки</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
