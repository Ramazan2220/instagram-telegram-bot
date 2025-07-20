"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw, Users, MessageSquare, Heart, Bookmark, Eye, ImageIcon } from "lucide-react"
import { COMPACT_STYLES } from "@/components/global-optimization"

export default function WarmupSettings() {
  const [activityLevel, setActivityLevel] = useState(50)
  const [duration, setDuration] = useState(14)
  const [enableAdvancedSettings, setEnableAdvancedSettings] = useState(false)

  return (
    <div className={`grid lg:grid-cols-3 ${COMPACT_STYLES.gridGap}`}>
      <div className="lg:col-span-2">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className={COMPACT_STYLES.cardHeaderPadding}>
            <CardTitle className="text-white text-sm">Настройки прогрева</CardTitle>
            <CardDescription className="text-slate-400 text-[10px]">
              Настройте параметры прогрева для ваших Instagram аккаунтов
            </CardDescription>
          </CardHeader>
          <CardContent className={COMPACT_STYLES.cardContentPadding}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="bg-slate-700 h-6 mb-2">
                <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600 text-[10px] h-4 px-1.5">
                  Основные
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-purple-600 text-[10px] h-4 px-1.5">
                  Расширенные
                </TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-green-600 text-[10px] h-4 px-1.5">
                  Расписание
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className={`space-y-2`}>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="activity-level" className="text-white text-xs">
                      Уровень активности
                    </Label>
                    <span className="text-white text-xs font-medium">{activityLevel}%</span>
                  </div>
                  <Slider
                    id="activity-level"
                    min={10}
                    max={100}
                    step={5}
                    value={[activityLevel]}
                    onValueChange={(value) => setActivityLevel(value[0])}
                    className="py-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Минимальный</span>
                    <span>Средний</span>
                    <span>Максимальный</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="duration" className="text-white text-xs">
                      Продолжительность прогрева (дней)
                    </Label>
                    <span className="text-white text-xs font-medium">{duration} дней</span>
                  </div>
                  <Slider
                    id="duration"
                    min={7}
                    max={30}
                    step={1}
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    className="py-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>7 дней</span>
                    <span>14 дней</span>
                    <span>30 дней</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="proxy-selection" className="text-white text-xs">
                    Выбор прокси
                  </Label>
                  <Select defaultValue="auto">
                    <SelectTrigger
                      id="proxy-selection"
                      className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                    >
                      <SelectValue placeholder="Выберите тип прокси" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      <SelectItem value="auto" className="text-xs">
                        Автоматический выбор
                      </SelectItem>
                      <SelectItem value="dedicated" className="text-xs">
                        Выделенные прокси
                      </SelectItem>
                      <SelectItem value="rotating" className="text-xs">
                        Ротация прокси
                      </SelectItem>
                      <SelectItem value="none" className="text-xs">
                        Без прокси
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="advanced-toggle" className="text-white text-xs">
                      Расширенные настройки
                    </Label>
                    <p className="text-slate-400 text-[9px]">Включите для тонкой настройки параметров</p>
                  </div>
                  <Switch
                    id="advanced-toggle"
                    checked={enableAdvancedSettings}
                    onCheckedChange={setEnableAdvancedSettings}
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className={`space-y-2`}>
                <div className={`grid grid-cols-2 ${COMPACT_STYLES.gridGap}`}>
                  <div className="space-y-1">
                    <Label htmlFor="likes-per-day" className="text-white text-xs">
                      Лайков в день
                    </Label>
                    <div className="flex gap-1">
                      <Input
                        id="likes-per-day-min"
                        type="number"
                        placeholder="Мин"
                        defaultValue="10"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                      <Input
                        id="likes-per-day-max"
                        type="number"
                        placeholder="Макс"
                        defaultValue="30"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="comments-per-day" className="text-white text-xs">
                      Комментариев в день
                    </Label>
                    <div className="flex gap-1">
                      <Input
                        id="comments-per-day-min"
                        type="number"
                        placeholder="Мин"
                        defaultValue="5"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                      <Input
                        id="comments-per-day-max"
                        type="number"
                        placeholder="Макс"
                        defaultValue="15"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="follows-per-day" className="text-white text-xs">
                      Подписок в день
                    </Label>
                    <div className="flex gap-1">
                      <Input
                        id="follows-per-day-min"
                        type="number"
                        placeholder="Мин"
                        defaultValue="5"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                      <Input
                        id="follows-per-day-max"
                        type="number"
                        placeholder="Макс"
                        defaultValue="15"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="views-per-day" className="text-white text-xs">
                      Просмотров историй в день
                    </Label>
                    <div className="flex gap-1">
                      <Input
                        id="views-per-day-min"
                        type="number"
                        placeholder="Мин"
                        defaultValue="20"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                      <Input
                        id="views-per-day-max"
                        type="number"
                        placeholder="Макс"
                        defaultValue="50"
                        className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="delay-between-actions" className="text-white text-xs">
                    Задержка между действиями (минуты)
                  </Label>
                  <div className="flex gap-1">
                    <Input
                      id="delay-min"
                      type="number"
                      placeholder="Мин"
                      defaultValue="5"
                      className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                    />
                    <Input
                      id="delay-max"
                      type="number"
                      placeholder="Макс"
                      defaultValue="15"
                      className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="target-audience" className="text-white text-xs">
                    Целевая аудитория
                  </Label>
                  <Select defaultValue="similar">
                    <SelectTrigger
                      id="target-audience"
                      className="bg-slate-700 border-slate-600 text-white h-6 text-xs"
                    >
                      <SelectValue placeholder="Выберите целевую аудиторию" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      <SelectItem value="similar" className="text-xs">
                        Похожие аккаунты
                      </SelectItem>
                      <SelectItem value="competitors" className="text-xs">
                        Конкуренты
                      </SelectItem>
                      <SelectItem value="hashtags" className="text-xs">
                        По хэштегам
                      </SelectItem>
                      <SelectItem value="location" className="text-xs">
                        По локации
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className={`space-y-2`}>
                <div className="space-y-1">
                  <Label htmlFor="schedule-type" className="text-white text-xs">
                    Тип расписания
                  </Label>
                  <Select defaultValue="auto">
                    <SelectTrigger id="schedule-type" className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                      <SelectValue placeholder="Выберите тип расписания" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600 text-white">
                      <SelectItem value="auto" className="text-xs">
                        Автоматическое
                      </SelectItem>
                      <SelectItem value="custom" className="text-xs">
                        Пользовательское
                      </SelectItem>
                      <SelectItem value="real" className="text-xs">
                        Имитация реального пользователя
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-white text-xs">Активные дни</Label>
                  <div className="flex gap-1 flex-wrap">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
                      <Button
                        key={index}
                        variant={index < 5 ? "default" : "outline"}
                        className={`flex-1 h-6 text-[10px] ${
                          index < 5 ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300"
                        }`}
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-white text-xs">Активное время</Label>
                  <div className="flex gap-1">
                    <Select defaultValue="9">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                        <SelectValue placeholder="От" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600 text-white">
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()} className="text-xs">
                            {i}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select defaultValue="18">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-6 text-xs">
                        <SelectValue placeholder="До" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600 text-white">
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()} className="text-xs">
                            {i}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="random-schedule" className="text-white text-xs">
                      Случайные интервалы
                    </Label>
                    <p className="text-slate-400 text-[9px]">Добавляет случайность в расписание</p>
                  </div>
                  <Switch id="random-schedule" defaultChecked />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-1 mt-2">
              <Button variant="outline" className="border-slate-600 text-slate-300 h-6 text-[10px]">
                <RefreshCw className="h-2.5 w-2.5 mr-1" />
                Сбросить
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 h-6 text-[10px]">
                <Save className="h-2.5 w-2.5 mr-1" />
                Сохранить настройки
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={`space-y-2`}>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className={COMPACT_STYLES.cardHeaderPadding}>
            <CardTitle className="text-white text-xs">Активности прогрева</CardTitle>
          </CardHeader>
          <CardContent className={`space-y-1.5 ${COMPACT_STYLES.cardContentPadding}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Heart className="h-2.5 w-2.5 text-blue-400" />
                </div>
                <span className="text-white text-[10px]">Лайки</span>
              </div>
              <Switch id="likes-toggle" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-2.5 w-2.5 text-green-400" />
                </div>
                <span className="text-white text-[10px]">Комментарии</span>
              </div>
              <Switch id="comments-toggle" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-2.5 w-2.5 text-purple-400" />
                </div>
                <span className="text-white text-[10px]">Подписки</span>
              </div>
              <Switch id="follows-toggle" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Eye className="h-2.5 w-2.5 text-yellow-400" />
                </div>
                <span className="text-white text-[10px]">Просмотр историй</span>
              </div>
              <Switch id="stories-toggle" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Bookmark className="h-2.5 w-2.5 text-red-400" />
                </div>
                <span className="text-white text-[10px]">Сохранения</span>
              </div>
              <Switch id="saves-toggle" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <ImageIcon className="h-2.5 w-2.5 text-orange-400" />
                </div>
                <span className="text-white text-[10px]">Публикации</span>
              </div>
              <Switch id="posts-toggle" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className={COMPACT_STYLES.cardHeaderPadding}>
            <CardTitle className="text-white text-xs">Рекомендации</CardTitle>
          </CardHeader>
          <CardContent className={`space-y-1.5 ${COMPACT_STYLES.cardContentPadding}`}>
            <div className="space-y-1">
              <h4 className="text-white font-medium text-[11px]">Оптимальные настройки:</h4>
              <ul className="text-[10px] text-slate-300 space-y-0.5">
                <li>• 14-21 день для новых аккаунтов</li>
                <li>• Активность 40-60% от максимума</li>
                <li>• Использование выделенных прокси</li>
                <li>• Имитация реального пользователя</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
