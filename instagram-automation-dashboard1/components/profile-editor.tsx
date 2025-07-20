"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Link, MapPin, Wand2, Copy, Save } from "lucide-react"

export default function ProfileEditor() {
  const [profileData, setProfileData] = useState({
    displayName: "",
    username: "",
    bio: "",
    website: "",
    category: "",
    location: "",
    contactEmail: "",
    phoneNumber: "",
    isPrivate: false,
    isBusinessAccount: false,
  })

  const [bioTemplates] = useState([
    "🌟 Lifestyle & Fashion Blogger\n📍 New York\n💌 Collaborations: email below",
    "🎯 Digital Marketing Expert\n📈 Helping brands grow online\n🔗 Free consultation below",
    "🍕 Food Lover & Recipe Creator\n👨‍🍳 Sharing delicious moments\n📧 Contact for partnerships",
    "💪 Fitness Coach & Motivator\n🏋️‍♀️ Transform your body & mind\n📱 DM for personal training",
    "📸 Travel Photographer\n✈️ Capturing moments worldwide\n🌍 Next destination: [Location]",
  ])

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const generateRandomBio = () => {
    const randomTemplate = bioTemplates[Math.floor(Math.random() * bioTemplates.length)]
    handleInputChange("bio", randomTemplate)
  }

  const copyFromTemplate = (template: string) => {
    handleInputChange("bio", template)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5 text-blue-400" />
          Редактор профиля
        </CardTitle>
        <CardDescription className="text-slate-400">
          Настройте параметры профиля для массового применения
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="bg-slate-700 border-slate-600">
            <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600">
              Основное
            </TabsTrigger>
            <TabsTrigger value="bio" className="data-[state=active]:bg-blue-600">
              Описание
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-blue-600">
              Бизнес
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-blue-600">
              Дополнительно
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName" className="text-slate-300">
                  Отображаемое имя
                </Label>
                <Input
                  id="displayName"
                  placeholder="Имя профиля"
                  value={profileData.displayName}
                  onChange={(e) => handleInputChange("displayName", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-400">Будет отображаться под аватаром</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-300">
                  Username (только для новых)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">@</span>
                  <Input
                    id="username"
                    placeholder="username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="pl-8 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <p className="text-xs text-slate-400">Только для новых аккаунтов</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-slate-300 flex items-center gap-2">
                <Link className="h-4 w-4" />
                Веб-сайт
              </Label>
              <Input
                id="website"
                placeholder="https://example.com"
                value={profileData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-slate-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Местоположение
                </Label>
                <Input
                  id="location"
                  placeholder="Город, Страна"
                  value={profileData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-slate-300">
                  Категория
                </Label>
                <Select value={profileData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="personal">Личный блог</SelectItem>
                    <SelectItem value="business">Бизнес</SelectItem>
                    <SelectItem value="creator">Контент-мейкер</SelectItem>
                    <SelectItem value="brand">Бренд</SelectItem>
                    <SelectItem value="public-figure">Публичная личность</SelectItem>
                    <SelectItem value="artist">Художник</SelectItem>
                    <SelectItem value="musician">Музыкант</SelectItem>
                    <SelectItem value="photographer">Фотограф</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Приватный аккаунт</Label>
                  <p className="text-sm text-slate-400">Требует подтверждения подписчиков</p>
                </div>
                <Switch
                  checked={profileData.isPrivate}
                  onCheckedChange={(checked) => handleInputChange("isPrivate", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Бизнес-аккаунт</Label>
                  <p className="text-sm text-slate-400">Доступ к аналитике и рекламе</p>
                </div>
                <Switch
                  checked={profileData.isBusinessAccount}
                  onCheckedChange={(checked) => handleInputChange("isBusinessAccount", checked)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bio" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="bio" className="text-slate-300">
                  Описание профиля
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateRandomBio}
                    className="border-slate-600 text-slate-300"
                  >
                    <Wand2 className="h-4 w-4 mr-1" />
                    Случайное
                  </Button>
                </div>
              </div>
              <Textarea
                id="bio"
                placeholder="Расскажите о себе или своем бренде..."
                value={profileData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
              />
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">{profileData.bio.length}/150 символов</span>
                <span className="text-slate-400">
                  Эмодзи:{" "}
                  {
                    (
                      profileData.bio.match(
                        /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
                      ) || []
                    ).length
                  }
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Шаблоны описаний</Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {bioTemplates.map((template, index) => (
                  <div key={index} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className="text-slate-300 text-sm whitespace-pre-line mb-2">{template}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyFromTemplate(template)}
                      className="border-slate-600 text-slate-300"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Использовать
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Популярные хештеги</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "#lifestyle",
                  "#fashion",
                  "#travel",
                  "#food",
                  "#fitness",
                  "#business",
                  "#motivation",
                  "#photography",
                  "#art",
                  "#music",
                ].map((hashtag) => (
                  <Badge
                    key={hashtag}
                    variant="outline"
                    className="border-slate-600 text-slate-300 cursor-pointer hover:bg-slate-700"
                    onClick={() => handleInputChange("bio", profileData.bio + " " + hashtag)}
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-slate-300">
                  Email для связи
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="contact@example.com"
                  value={profileData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-slate-300">
                  Номер телефона
                </Label>
                <Input
                  id="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Тип бизнеса</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Выберите тип бизнеса" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="retail">Розничная торговля</SelectItem>
                  <SelectItem value="restaurant">Ресторан</SelectItem>
                  <SelectItem value="beauty">Красота и здоровье</SelectItem>
                  <SelectItem value="fitness">Фитнес</SelectItem>
                  <SelectItem value="education">Образование</SelectItem>
                  <SelectItem value="technology">Технологии</SelectItem>
                  <SelectItem value="consulting">Консалтинг</SelectItem>
                  <SelectItem value="creative">Креативные услуги</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Кнопки действий</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Связаться", icon: "📞" },
                  { label: "Email", icon: "📧" },
                  { label: "Направления", icon: "🗺️" },
                  { label: "Забронировать", icon: "📅" },
                  { label: "Заказать", icon: "🛒" },
                  { label: "Узнать цену", icon: "💰" },
                ].map((action) => (
                  <div
                    key={action.label}
                    className="flex items-center gap-2 p-2 bg-slate-700/50 rounded border border-slate-600 cursor-pointer hover:bg-slate-700"
                  >
                    <span>{action.icon}</span>
                    <span className="text-slate-300 text-sm">{action.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Переменные для персонализации</Label>
                <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                  <p className="text-slate-300 text-sm mb-2">Доступные переменные:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "{username}",
                      "{display_name}",
                      "{follower_count}",
                      "{post_count}",
                      "{location}",
                      "{random_number}",
                      "{current_date}",
                      "{random_emoji}",
                    ].map((variable) => (
                      <Badge
                        key={variable}
                        variant="outline"
                        className="border-blue-500/30 text-blue-400 cursor-pointer"
                        onClick={() => handleInputChange("bio", profileData.bio + " " + variable)}
                      >
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Настройки применения</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Пропускать уже оформленные</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Создавать резервные копии</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Добавлять случайные задержки</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Уведомлять о завершении</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Интервал между изменениями</Label>
                <Select defaultValue="30s">
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Выберите интервал" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    <SelectItem value="10s">10 секунд</SelectItem>
                    <SelectItem value="30s">30 секунд</SelectItem>
                    <SelectItem value="1m">1 минута</SelectItem>
                    <SelectItem value="2m">2 минуты</SelectItem>
                    <SelectItem value="5m">5 минут</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-6 border-t border-slate-700">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Сохранить как шаблон
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Copy className="h-4 w-4 mr-2" />
            Копировать настройки
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
