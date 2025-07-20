"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Clock,
  Activity,
  Users,
  MessageSquare,
  Heart,
  ImageIcon,
  RefreshCw,
  AlertTriangle,
  Info,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function BlockProtection() {
  const [activityLimits, setActivityLimits] = useState({
    enabled: true,
    followsPerDay: 40,
    likesPerDay: 120,
    commentsPerDay: 20,
    postsPerDay: 3,
    storiesPerDay: 10,
    messagesPerDay: 50,
    humanBehavior: true,
    randomDelays: true,
    activityDistribution: true,
    naturalPatterns: true,
    avoidPeakHours: true,
    gradualIncrease: true,
    proxyRotation: true,
    userAgentRotation: true,
    cookieManagement: true,
    actionSpacing: true,
    riskLevel: 30, // 0-100, where 0 is safest and 100 is riskiest
  })

  const handleLimitChange = (setting: keyof typeof activityLimits, value: number | boolean) => {
    setActivityLimits({ ...activityLimits, [setting]: value })
  }

  const getRiskLevelColor = (level: number) => {
    if (level <= 30) return "text-green-400"
    if (level <= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getRiskLevelText = (level: number) => {
    if (level <= 30) return "Низкий риск"
    if (level <= 60) return "Средний риск"
    return "Высокий риск"
  }

  const getRiskLevelBg = (level: number) => {
    if (level <= 30) return "bg-green-500/20"
    if (level <= 60) return "bg-yellow-500/20"
    return "bg-red-500/20"
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Защита от блокировок
          </CardTitle>
          <CardDescription className="text-slate-400">
            Настройте лимиты активности и параметры безопасного поведения для предотвращения блокировок
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Система защиты от блокировок</h3>
              <p className="text-sm text-slate-400">
                Автоматически контролирует активность для предотвращения блокировок
              </p>
            </div>
            <Switch
              checked={activityLimits.enabled}
              onCheckedChange={(checked) => handleLimitChange("enabled", checked)}
            />
          </div>

          {activityLimits.enabled && (
            <>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    Уровень риска
                  </h3>
                  <Badge
                    className={`${getRiskLevelBg(activityLimits.riskLevel)} ${getRiskLevelColor(
                      activityLimits.riskLevel,
                    )} border-0`}
                  >
                    {getRiskLevelText(activityLimits.riskLevel)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-green-400">Безопасный</span>
                    <span className="text-xs text-yellow-400">Умеренный</span>
                    <span className="text-xs text-red-400">Рискованный</span>
                  </div>
                  <Slider
                    value={[activityLimits.riskLevel]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleLimitChange("riskLevel", value[0])}
                    className="[&>span:nth-child(2)]:bg-gradient-to-r [&>span:nth-child(2)]:from-green-400 [&>span:nth-child(2)]:via-yellow-400 [&>span:nth-child(2)]:to-red-400"
                  />
                  <div className="text-xs text-slate-400 mt-1">
                    Перемещайте ползунок для настройки баланса между безопасностью и скоростью роста
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    Дневные лимиты активности
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-slate-300 flex items-center gap-1">
                          <Users className="h-4 w-4 text-slate-400" />
                          Подписки в день
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-slate-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  Instagram обычно ограничивает до 100-150 подписок в день для старых аккаунтов
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <span className="text-white font-medium">{activityLimits.followsPerDay}</span>
                      </div>
                      <Slider
                        value={[activityLimits.followsPerDay]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleLimitChange("followsPerDay", value[0])}
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Безопасно: 20-40</span>
                        <span>Макс: 100</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-slate-300 flex items-center gap-1">
                          <Heart className="h-4 w-4 text-slate-400" />
                          Лайки в день
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-slate-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  Instagram обычно ограничивает до 300-500 лайков в день для старых аккаунтов
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <span className="text-white font-medium">{activityLimits.likesPerDay}</span>
                      </div>
                      <Slider
                        value={[activityLimits.likesPerDay]}
                        min={0}
                        max={300}
                        step={5}
                        onValueChange={(value) => handleLimitChange("likesPerDay", value[0])}
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Безопасно: 80-120</span>
                        <span>Макс: 300</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-slate-300 flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-slate-400" />
                          Комментарии в день
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-slate-500" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  Instagram строже относится к комментариям, рекомендуется не более 50 в день
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <span className="text-white font-medium">{activityLimits.commentsPerDay}</span>
                      </div>
                      <Slider
                        value={[activityLimits.commentsPerDay]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleLimitChange("commentsPerDay", value[0])}
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Безопасно: 10-20</span>
                        <span>Макс: 100</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm text-slate-300 flex items-center gap-1">
                          <ImageIcon className="h-4 w-4 text-slate-400" />
                          Публикации в день
                        </Label>
                        <span className="text-white font-medium">{activityLimits.postsPerDay}</span>
                      </div>
                      <Slider
                        value={[activityLimits.postsPerDay]}
                        min={0}
                        max={10}
                        step={1}
                        onValueChange={(value) => handleLimitChange("postsPerDay", value[0])}
                      />
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Безопасно: 1-3</span>
                        <span>Макс: 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    Имитация человеческого поведения
                  </h3>

                  <div className="space-y-3 bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        Случайные задержки между действиями
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3 w-3 text-slate-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                Добавляет случайные паузы между действиями для имитации человеческого поведения
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Switch
                        checked={activityLimits.randomDelays}
                        onCheckedChange={(checked) => handleLimitChange("randomDelays", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <Activity className="h-4 w-4 text-slate-400" />
                        Распределение активности в течение дня
                      </Label>
                      <Switch
                        checked={activityLimits.activityDistribution}
                        onCheckedChange={(checked) => handleLimitChange("activityDistribution", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <Users className="h-4 w-4 text-slate-400" />
                        Естественные паттерны взаимодействия
                      </Label>
                      <Switch
                        checked={activityLimits.naturalPatterns}
                        onCheckedChange={(checked) => handleLimitChange("naturalPatterns", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-slate-400" />
                        Избегать пиковых часов активности
                      </Label>
                      <Switch
                        checked={activityLimits.avoidPeakHours}
                        onCheckedChange={(checked) => handleLimitChange("avoidPeakHours", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <Activity className="h-4 w-4 text-slate-400" />
                        Постепенное увеличение активности
                      </Label>
                      <Switch
                        checked={activityLimits.gradualIncrease}
                        onCheckedChange={(checked) => handleLimitChange("gradualIncrease", checked)}
                      />
                    </div>

                    <Separator className="my-2 bg-slate-600/50" />

                    <h4 className="text-sm text-white font-medium">Техническая защита</h4>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <RefreshCw className="h-4 w-4 text-slate-400" />
                        Ротация прокси
                      </Label>
                      <Switch
                        checked={activityLimits.proxyRotation}
                        onCheckedChange={(checked) => handleLimitChange("proxyRotation", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <RefreshCw className="h-4 w-4 text-slate-400" />
                        Ротация User-Agent
                      </Label>
                      <Switch
                        checked={activityLimits.userAgentRotation}
                        onCheckedChange={(checked) => handleLimitChange("userAgentRotation", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-slate-300 flex items-center gap-1">
                        <Shield className="h-4 w-4 text-slate-400" />
                        Управление cookies
                      </Label>
                      <Switch
                        checked={activityLimits.cookieManagement}
                        onCheckedChange={(checked) => handleLimitChange("cookieManagement", checked)}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        <Info className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Рекомендации по безопасности</h4>
                        <ul className="mt-2 space-y-1 text-sm text-slate-300">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Используйте более низкие лимиты для новых аккаунтов (до 30% от максимальных)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Постепенно увеличивайте активность в течение 2-3 недель</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Делайте перерывы в активности на 1-2 дня каждую неделю</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>Используйте разные прокси для разных аккаунтов</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  Сбросить настройки
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">Сохранить настройки</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Автоматическая защита
          </CardTitle>
          <CardDescription className="text-slate-400">
            Система автоматически реагирует на признаки блокировки и предпринимает защитные действия
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  Обнаружение блокировок
                </h3>
                <p className="text-sm text-slate-400 mb-3">Система мониторит признаки возможной блокировки аккаунта</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Статус:</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активно</Badge>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-400" />
                  Автоматическая пауза
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Приостанавливает активность при обнаружении риска блокировки
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Статус:</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активно</Badge>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-yellow-400" />
                  Смена прокси
                </h3>
                <p className="text-sm text-slate-400 mb-3">Автоматически меняет прокси при обнаружении проблем</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Статус:</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активно</Badge>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Признаки возможной блокировки</h4>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Резкое снижение охвата и взаимодействий</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Невозможность выполнить определенные действия (лайки, комментарии)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Сообщения о подозрительной активности от Instagram</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Запросы на подтверждение личности или телефона</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Временные ограничения на определенные действия</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
