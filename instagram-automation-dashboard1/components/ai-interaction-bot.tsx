"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Bot, MessageSquare, Heart, UserPlus, Settings, Play, Pause, Target, Zap, Shield, Brain } from "lucide-react"

interface InteractionRule {
  id: string
  name: string
  type: "like" | "comment" | "follow" | "dm"
  trigger: string
  response: string
  isActive: boolean
  success: number
  total: number
}

export default function AIInteractionBot() {
  const [isActive, setIsActive] = useState(false)
  const [interactionRules, setInteractionRules] = useState<InteractionRule[]>([
    {
      id: "1",
      name: "Автолайки на посты с хештегами",
      type: "like",
      trigger: "#мотивация, #успех, #бизнес",
      response: "Автоматический лайк",
      isActive: true,
      success: 847,
      total: 1000,
    },
    {
      id: "2",
      name: "Умные комментарии",
      type: "comment",
      trigger: "Посты о достижениях",
      response: "Поздравляем! 🎉 Отличный результат!",
      isActive: true,
      success: 234,
      total: 300,
    },
    {
      id: "3",
      name: "Подписка на активных пользователей",
      type: "follow",
      trigger: "Высокая активность в нише",
      response: "Автоподписка",
      isActive: false,
      success: 156,
      total: 200,
    },
  ])

  const [newRule, setNewRule] = useState({
    name: "",
    type: "like" as const,
    trigger: "",
    response: "",
  })

  const [botSettings, setBotSettings] = useState({
    activityLevel: [0.6],
    responseDelay: [30],
    dailyLimit: [100],
    smartMode: true,
    contextAware: true,
    safetyMode: true,
  })

  const interactionTypes = [
    { value: "like", label: "Лайки", icon: Heart, color: "text-red-400" },
    { value: "comment", label: "Комментарии", icon: MessageSquare, color: "text-blue-400" },
    { value: "follow", label: "Подписки", icon: UserPlus, color: "text-green-400" },
    { value: "dm", label: "Сообщения", icon: MessageSquare, color: "text-purple-400" },
  ]

  const smartResponses = [
    "Отличный контент! 👏",
    "Вдохновляет! ✨",
    "Супер! 🔥",
    "Классно! 💪",
    "Браво! 🎉",
    "Потрясающе! ⭐",
    "Круто! 😍",
    "Замечательно! 🌟",
  ]

  const toggleBot = () => {
    setIsActive(!isActive)
  }

  const toggleRule = (ruleId: string) => {
    setInteractionRules((prev) =>
      prev.map((rule) => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule)),
    )
  }

  const addNewRule = () => {
    if (newRule.name && newRule.trigger) {
      const rule: InteractionRule = {
        id: Date.now().toString(),
        ...newRule,
        isActive: true,
        success: 0,
        total: 0,
      }
      setInteractionRules((prev) => [...prev, rule])
      setNewRule({ name: "", type: "like", trigger: "", response: "" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Bot Status */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">ИИ Бот взаимодействий</CardTitle>
              <Badge className={isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                {isActive ? "Активен" : "Остановлен"}
              </Badge>
            </div>
            <Button
              onClick={toggleBot}
              className={isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {isActive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Остановить
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Запустить
                </>
              )}
            </Button>
          </div>
          <CardDescription className="text-slate-400">
            Автоматические взаимодействия с использованием ИИ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-slate-300 text-sm">Лайки сегодня</span>
              </div>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-slate-400">+12% от вчера</p>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">Комментарии</span>
              </div>
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-xs text-slate-400">+5% от вчера</p>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <UserPlus className="h-4 w-4 text-green-400" />
                <span className="text-slate-300 text-sm">Подписки</span>
              </div>
              <p className="text-2xl font-bold text-white">34</p>
              <p className="text-xs text-slate-400">-2% от вчера</p>
            </div>

            <div className="bg-slate-700/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-400" />
                <span className="text-slate-300 text-sm">Конверсия</span>
              </div>
              <p className="text-2xl font-bold text-white">12.5%</p>
              <p className="text-xs text-slate-400">+3% от вчера</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interaction Rules */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-400" />
              Правила взаимодействий
            </CardTitle>
            <CardDescription className="text-slate-400">Настройте автоматические действия бота</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interactionRules.map((rule) => {
              const TypeIcon = interactionTypes.find((t) => t.type === rule.type)?.icon || Heart
              const typeColor = interactionTypes.find((t) => t.type === rule.type)?.color || "text-gray-400"
              const successRate = rule.total > 0 ? (rule.success / rule.total) * 100 : 0

              return (
                <div key={rule.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TypeIcon className={`h-4 w-4 ${typeColor}`} />
                      <h4 className="text-white font-medium">{rule.name}</h4>
                    </div>
                    <Switch checked={rule.isActive} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Триггер: </span>
                      <span className="text-slate-300">{rule.trigger}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Ответ: </span>
                      <span className="text-slate-300">{rule.response}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Успешность: {successRate.toFixed(1)}%</span>
                      <span>
                        {rule.success}/{rule.total}
                      </span>
                    </div>
                    <Progress value={successRate} className="h-2" />
                  </div>
                </div>
              )
            })}

            {/* Add New Rule */}
            <div className="p-4 bg-slate-700/20 rounded-lg border-2 border-dashed border-slate-600">
              <h4 className="text-white font-medium mb-3">Добавить новое правило</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Название правила"
                    value={newRule.name}
                    onChange={(e) => setNewRule((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                  <Select
                    value={newRule.type}
                    onValueChange={(value: any) => setNewRule((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {interactionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className={`h-4 w-4 ${type.color}`} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Триггер (хештеги, ключевые слова)"
                  value={newRule.trigger}
                  onChange={(e) => setNewRule((prev) => ({ ...prev, trigger: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Input
                  placeholder="Ответ/действие"
                  value={newRule.response}
                  onChange={(e) => setNewRule((prev) => ({ ...prev, response: e.target.value }))}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <Button onClick={addNewRule} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Добавить правило
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bot Settings */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              Настройки ИИ бота
            </CardTitle>
            <CardDescription className="text-slate-400">Конфигурация поведения и безопасности</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Activity Level */}
            <div className="space-y-3">
              <Label className="text-slate-300">
                Уровень активности: {(botSettings.activityLevel[0] * 100).toFixed(0)}%
              </Label>
              <Slider
                value={botSettings.activityLevel}
                onValueChange={(value) => setBotSettings((prev) => ({ ...prev, activityLevel: value }))}
                max={1}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>Низкая</span>
                <span>Высокая</span>
              </div>
            </div>

            {/* Response Delay */}
            <div className="space-y-3">
              <Label className="text-slate-300">Задержка ответа: {botSettings.responseDelay[0]} сек</Label>
              <Slider
                value={botSettings.responseDelay}
                onValueChange={(value) => setBotSettings((prev) => ({ ...prev, responseDelay: value }))}
                max={300}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>5 сек</span>
                <span>5 мин</span>
              </div>
            </div>

            {/* Daily Limit */}
            <div className="space-y-3">
              <Label className="text-slate-300">Дневной лимит: {botSettings.dailyLimit[0]} действий</Label>
              <Slider
                value={botSettings.dailyLimit}
                onValueChange={(value) => setBotSettings((prev) => ({ ...prev, dailyLimit: value }))}
                max={1000}
                min={10}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>10</span>
                <span>1000</span>
              </div>
            </div>

            {/* Smart Features */}
            <div className="space-y-4">
              <h4 className="text-white font-medium">Умные функции</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-300">Умный режим</span>
                    <p className="text-xs text-slate-400">ИИ анализирует контекст</p>
                  </div>
                  <Switch
                    checked={botSettings.smartMode}
                    onCheckedChange={(checked) => setBotSettings((prev) => ({ ...prev, smartMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-300">Контекстная осведомленность</span>
                    <p className="text-xs text-slate-400">Учитывает историю взаимодействий</p>
                  </div>
                  <Switch
                    checked={botSettings.contextAware}
                    onCheckedChange={(checked) => setBotSettings((prev) => ({ ...prev, contextAware: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-300">Режим безопасности</span>
                    <p className="text-xs text-slate-400">Дополнительные проверки</p>
                  </div>
                  <Switch
                    checked={botSettings.safetyMode}
                    onCheckedChange={(checked) => setBotSettings((prev) => ({ ...prev, safetyMode: checked }))}
                  />
                </div>
              </div>
            </div>

            {/* Smart Responses */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Умные ответы</h4>
              <div className="flex flex-wrap gap-2">
                {smartResponses.map((response, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700"
                  >
                    {response}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Zap className="h-4 w-4 mr-2" />
                Добавить ответ
              </Button>
            </div>

            {/* Safety Indicators */}
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">Безопасность</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Риск блокировки:</span>
                  <span className="text-green-400">Низкий</span>
                </div>
                <div className="flex justify-between">
                  <span>Соответствие лимитам:</span>
                  <span className="text-green-400">✓ Да</span>
                </div>
                <div className="flex justify-between">
                  <span>Последняя проверка:</span>
                  <span className="text-slate-400">2 мин назад</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
