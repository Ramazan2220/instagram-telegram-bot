"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  BarChart3,
  RefreshCw,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
} from "lucide-react"

export default function ProxyMonitoring() {
  const [timeRange, setTimeRange] = useState("24h")

  const performanceData = [
    { time: "00:00", success: 98, warning: 1, error: 1 },
    { time: "02:00", success: 97, warning: 2, error: 1 },
    { time: "04:00", success: 95, warning: 3, error: 2 },
    { time: "06:00", success: 92, warning: 5, error: 3 },
    { time: "08:00", success: 90, warning: 6, error: 4 },
    { time: "10:00", success: 94, warning: 4, error: 2 },
    { time: "12:00", success: 96, warning: 3, error: 1 },
    { time: "14:00", success: 98, warning: 1, error: 1 },
    { time: "16:00", success: 97, warning: 2, error: 1 },
    { time: "18:00", success: 99, warning: 1, error: 0 },
    { time: "20:00", success: 98, warning: 1, error: 1 },
    { time: "22:00", success: 97, warning: 2, error: 1 },
  ]

  const recentAlerts = [
    { id: 1, type: "error", message: "Прокси 192.168.1.4 недоступен", time: "15 мин назад" },
    { id: 2, type: "warning", message: "Высокая задержка на прокси 192.168.1.3", time: "45 мин назад" },
    { id: 3, type: "warning", message: "Снижение производительности прокси 192.168.1.7", time: "1 час назад" },
    { id: 4, type: "error", message: "Прокси 192.168.1.9 заблокирован Instagram", time: "3 часа назад" },
    { id: 5, type: "info", message: "Автоматическая ротация прокси выполнена", time: "4 часа назад" },
  ]

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98.2%</p>
                <p className="text-sm text-slate-400">Доступность</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">142 мс</p>
                <p className="text-sm text-slate-400">Средний пинг</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-sm text-slate-400">Предупреждения</p>
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
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-sm text-slate-400">Ошибки</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Производительность прокси
                </CardTitle>
                <CardDescription className="text-slate-400">Мониторинг доступности и скорости работы</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px] bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Период" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="6h">6 часов</SelectItem>
                    <SelectItem value="24h">24 часа</SelectItem>
                    <SelectItem value="7d">7 дней</SelectItem>
                    <SelectItem value="30d">30 дней</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="border-slate-600 text-slate-300">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Chart Visualization */}
              <div className="h-[300px] flex items-end gap-2">
                {performanceData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full h-[250px] flex flex-col-reverse">
                      <div className="w-full bg-green-500/70" style={{ height: `${data.success * 2.5}px` }}></div>
                      <div className="w-full bg-yellow-500/70" style={{ height: `${data.warning * 2.5}px` }}></div>
                      <div className="w-full bg-red-500/70" style={{ height: `${data.error * 2.5}px` }}></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">{data.time}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500/70"></div>
                  <span className="text-sm text-slate-300">Успешно</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500/70"></div>
                  <span className="text-sm text-slate-300">Предупреждения</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500/70"></div>
                  <span className="text-sm text-slate-300">Ошибки</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Notifications */}
        <div>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Последние оповещения
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border flex items-start gap-3 ${
                    alert.type === "error"
                      ? "bg-red-500/10 border-red-500/30"
                      : alert.type === "warning"
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : "bg-blue-500/10 border-blue-500/30"
                  }`}
                >
                  {alert.type === "error" && <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />}
                  {alert.type === "warning" && <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />}
                  {alert.type === "info" && <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />}

                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        alert.type === "error"
                          ? "text-red-300"
                          : alert.type === "warning"
                            ? "text-yellow-300"
                            : "text-blue-300"
                      }`}
                    >
                      {alert.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                Показать все оповещения
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Stats */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            Детальная статистика
          </CardTitle>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Экспорт отчета
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="bg-slate-700 border-slate-600">
              <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
                Производительность
              </TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-blue-600">
                Использование
              </TabsTrigger>
              <TabsTrigger value="errors" className="data-[state=active]:bg-blue-600">
                Ошибки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Средний пинг</span>
                    <span className="text-white">142 мс</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Пропускная способность</span>
                    <span className="text-white">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Стабильность</span>
                    <span className="text-white">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Использование по странам</h4>
                  <div className="space-y-2">
                    {[
                      { country: "США", usage: 35, count: 8 },
                      { country: "Германия", usage: 25, count: 6 },
                      { country: "Великобритания", usage: 20, count: 4 },
                      { country: "Франция", usage: 15, count: 3 },
                      { country: "Другие", usage: 5, count: 2 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300">{item.country}</span>
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            {item.count}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.usage}%` }}></div>
                          </div>
                          <span className="text-white text-sm w-8">{item.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Нагрузка по времени</h4>
                  <div className="space-y-2">
                    {[
                      { time: "00:00-06:00", load: 15 },
                      { time: "06:00-12:00", load: 45 },
                      { time: "12:00-18:00", load: 85 },
                      { time: "18:00-24:00", load: 65 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-slate-300">{item.time}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-700 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${item.load}%` }}></div>
                          </div>
                          <span className="text-white text-sm w-8">{item.load}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Типы ошибок за последние 24 часа</h4>
                <div className="space-y-3">
                  {[
                    { type: "Таймаут соединения", count: 12, severity: "warning" },
                    { type: "Блокировка Instagram", count: 5, severity: "error" },
                    { type: "Недоступность прокси", count: 8, severity: "error" },
                    { type: "Медленный отклик", count: 15, severity: "warning" },
                    { type: "Ошибка авторизации", count: 3, severity: "error" },
                  ].map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            error.severity === "error"
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          }
                        >
                          {error.severity === "error" ? "Критично" : "Предупреждение"}
                        </Badge>
                        <span className="text-white">{error.type}</span>
                      </div>
                      <span className="text-slate-300">{error.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
