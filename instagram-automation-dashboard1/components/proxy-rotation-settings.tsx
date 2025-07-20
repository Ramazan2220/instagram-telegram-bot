"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Clock, Shield, Settings, Save, Users, AlertTriangle } from "lucide-react"

export default function ProxyRotationSettings() {
  const [autoRotation, setAutoRotation] = useState(true)
  const [rotationInterval, setRotationInterval] = useState(60)
  const [rotationStrategy, setRotationStrategy] = useState("round-robin")
  const [errorThreshold, setErrorThreshold] = useState(3)

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Settings */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-purple-400" />
              Настройки ротации прокси
            </CardTitle>
            <CardDescription className="text-slate-400">
              Настройте автоматическую смену прокси для повышения безопасности аккаунтов
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Автоматическая ротация</h3>
                <p className="text-sm text-slate-400">Автоматически менять прокси для аккаунтов</p>
              </div>
              <Switch checked={autoRotation} onCheckedChange={setAutoRotation} />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Интервал ротации</Label>
                  <span className="text-white font-medium">{rotationInterval} мин</span>
                </div>
                <Slider
                  value={[rotationInterval]}
                  min={15}
                  max={240}
                  step={15}
                  onValueChange={(value) => setRotationInterval(value[0])}
                  disabled={!autoRotation}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>15 мин</span>
                  <span>1 час</span>
                  <span>2 часа</span>
                  <span>4 часа</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategy" className="text-slate-300">
                  Стратегия ротации
                </Label>
                <Select defaultValue={rotationStrategy} onValueChange={setRotationStrategy} disabled={!autoRotation}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Выберите стратегию" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="round-robin">Последовательная (Round-Robin)</SelectItem>
                    <SelectItem value="random">Случайная</SelectItem>
                    <SelectItem value="geo-based">По геолокации</SelectItem>
                    <SelectItem value="performance">По производительности</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-400">
                  {rotationStrategy === "round-robin" && "Последовательный перебор всех доступных прокси"}
                  {rotationStrategy === "random" && "Случайный выбор прокси из доступного пула"}
                  {rotationStrategy === "geo-based" && "Выбор прокси с учетом геолокации аккаунта"}
                  {rotationStrategy === "performance" && "Приоритет отдается прокси с лучшей производительностью"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Порог ошибок для смены прокси</Label>
                  <span className="text-white font-medium">{errorThreshold}</span>
                </div>
                <Slider
                  value={[errorThreshold]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setErrorThreshold(value[0])}
                  disabled={!autoRotation}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
                <p className="text-xs text-slate-400">
                  Прокси будет автоматически заменен после {errorThreshold} последовательных ошибок
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />
              Привязка прокси к аккаунтам
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="auto" className="space-y-4">
              <TabsList className="bg-slate-700 border-slate-600">
                <TabsTrigger value="auto" className="data-[state=active]:bg-blue-600">
                  Автоматическая привязка
                </TabsTrigger>
                <TabsTrigger value="manual" className="data-[state=active]:bg-blue-600">
                  Ручная привязка
                </TabsTrigger>
              </TabsList>

              <TabsContent value="auto" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-strategy" className="text-slate-300">
                    Стратегия привязки
                  </Label>
                  <Select defaultValue="geo-match">
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Выберите стратегию" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      <SelectItem value="geo-match">Соответствие геолокации</SelectItem>
                      <SelectItem value="load-balance">Балансировка нагрузки</SelectItem>
                      <SelectItem value="performance">По производительности</SelectItem>
                      <SelectItem value="random">Случайная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Максимум аккаунтов на один прокси</Label>
                    <Badge className="bg-blue-600">5</Badge>
                  </div>
                  <Slider defaultValue={[5]} min={1} max={10} step={1} className="py-4" />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="sticky-sessions" defaultChecked />
                  <Label htmlFor="sticky-sessions" className="text-slate-300">
                    Использовать постоянные сессии
                  </Label>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700">Применить автоматическую привязку</Button>
              </TabsContent>

              <TabsContent value="manual">
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300">Ручная привязка доступна в разделе управления аккаунтами</p>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Перейти к управлению аккаунтами</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Info and Stats */}
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              Статистика ротации
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Последняя ротация:</span>
                <span className="text-white">12 мин назад</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Следующая ротация:</span>
                <span className="text-white">48 мин</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ротаций сегодня:</span>
                <span className="text-white">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Аварийных замен:</span>
                <span className="text-yellow-400">3</span>
              </div>
            </div>

            <div className="pt-2">
              <Button variant="outline" className="w-full border-slate-600 text-slate-300">
                <RefreshCw className="h-4 w-4 mr-2" />
                Запустить ротацию сейчас
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-400" />
              Безопасность
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-yellow-300">
                Рекомендуется менять прокси не реже чем раз в 2 часа для максимальной безопасности
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Рекомендации</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>Используйте разные прокси для разных действий</li>
                <li>Избегайте частой смены прокси (менее 15 минут)</li>
                <li>Для критичных аккаунтов используйте выделенные прокси</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Уровень защиты</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Текущий уровень:</span>
                  <span className="text-green-400">Высокий</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
