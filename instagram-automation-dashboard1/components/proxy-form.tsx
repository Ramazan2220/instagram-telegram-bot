"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Globe, Shield, Upload, Save, RefreshCw } from "lucide-react"

export default function ProxyForm() {
  const [proxyType, setProxyType] = useState("single")
  const [proxyProtocol, setProxyProtocol] = useState("http")
  const [testAfterAdd, setTestAfterAdd] = useState(true)
  const [bulkProxies, setBulkProxies] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Обработка формы
    console.log("Form submitted")
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Form */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Добавление прокси</CardTitle>
            <CardDescription className="text-slate-400">Добавьте новые прокси-серверы в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="single" className="space-y-6" onValueChange={setProxyType}>
              <TabsList className="bg-slate-700 border-slate-600">
                <TabsTrigger value="single" className="data-[state=active]:bg-blue-600">
                  Одиночный прокси
                </TabsTrigger>
                <TabsTrigger value="bulk" className="data-[state=active]:bg-blue-600">
                  Массовое добавление
                </TabsTrigger>
                <TabsTrigger value="import" className="data-[state=active]:bg-blue-600">
                  Импорт из файла
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ip" className="text-slate-300">
                        IP адрес
                      </Label>
                      <Input
                        id="ip"
                        placeholder="192.168.1.1"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port" className="text-slate-300">
                        Порт
                      </Label>
                      <Input
                        id="port"
                        placeholder="8080"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="protocol" className="text-slate-300">
                      Протокол
                    </Label>
                    <Select defaultValue={proxyProtocol} onValueChange={setProxyProtocol}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Выберите протокол" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="http">HTTP</SelectItem>
                        <SelectItem value="https">HTTPS</SelectItem>
                        <SelectItem value="socks4">SOCKS4</SelectItem>
                        <SelectItem value="socks5">SOCKS5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-slate-300">
                        Имя пользователя (опционально)
                      </Label>
                      <Input
                        id="username"
                        placeholder="username"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-300">
                        Пароль (опционально)
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-slate-300">
                        Страна
                      </Label>
                      <Select defaultValue="us">
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Выберите страну" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700 text-white">
                          <SelectItem value="us">США</SelectItem>
                          <SelectItem value="de">Германия</SelectItem>
                          <SelectItem value="uk">Великобритания</SelectItem>
                          <SelectItem value="fr">Франция</SelectItem>
                          <SelectItem value="jp">Япония</SelectItem>
                          <SelectItem value="ru">Россия</SelectItem>
                          <SelectItem value="other">Другая</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-300">
                        Город (опционально)
                      </Label>
                      <Input id="city" placeholder="Нью-Йорк" className="bg-slate-700 border-slate-600 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="label" className="text-slate-300">
                      Метка (опционально)
                    </Label>
                    <Input
                      id="label"
                      placeholder="Метка для прокси"
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="test" checked={testAfterAdd} onCheckedChange={setTestAfterAdd} />
                    <Label htmlFor="test" className="text-slate-300">
                      Протестировать после добавления
                    </Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Добавить прокси
                    </Button>
                    <Button type="button" variant="outline" className="border-slate-600 text-slate-300">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Тестировать
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="bulk">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bulk-proxies" className="text-slate-300">
                      Список прокси
                    </Label>
                    <Textarea
                      id="bulk-proxies"
                      placeholder="Введите прокси в формате ip:port:username:password или ip:port (по одному на строку)"
                      className="bg-slate-700 border-slate-600 text-white min-h-[200px]"
                      value={bulkProxies}
                      onChange={(e) => setBulkProxies(e.target.value)}
                    />
                    <p className="text-sm text-slate-400">
                      Обнаружено прокси: {bulkProxies.split("\n").filter((line) => line.trim()).length}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="protocol-bulk" className="text-slate-300">
                      Протокол по умолчанию
                    </Label>
                    <Select defaultValue={proxyProtocol} onValueChange={setProxyProtocol}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Выберите протокол" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700 text-white">
                        <SelectItem value="http">HTTP</SelectItem>
                        <SelectItem value="https">HTTPS</SelectItem>
                        <SelectItem value="socks4">SOCKS4</SelectItem>
                        <SelectItem value="socks5">SOCKS5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="test-bulk" checked={testAfterAdd} onCheckedChange={setTestAfterAdd} />
                    <Label htmlFor="test-bulk" className="text-slate-300">
                      Протестировать после добавления
                    </Label>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Добавить все прокси
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="import">
                <div className="space-y-6">
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-all">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                          <Upload className="h-8 w-8 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-2">Перетащите файл сюда или нажмите для выбора</p>
                        <p className="text-slate-400 text-sm">Поддерживаются: TXT, CSV (до 1000 прокси)</p>
                      </div>
                      <input type="file" accept=".txt,.csv" className="hidden" id="proxy-file-upload" />
                      <Button asChild variant="outline" className="border-slate-600 text-slate-300">
                        <label htmlFor="proxy-file-upload" className="cursor-pointer">
                          Выбрать файл
                        </label>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="test-import" checked={testAfterAdd} onCheckedChange={setTestAfterAdd} />
                    <Label htmlFor="test-import" className="text-slate-300">
                      Протестировать после импорта
                    </Label>
                  </div>

                  <Button className="bg-blue-600 hover:bg-blue-700" disabled>
                    <Upload className="h-4 w-4 mr-2" />
                    Импортировать прокси
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Help and Info */}
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              Информация о прокси
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-white font-medium">Типы прокси</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>
                  <span className="text-blue-400">HTTP</span> - Базовый тип, подходит для большинства задач
                </li>
                <li>
                  <span className="text-blue-400">HTTPS</span> - Шифрованное соединение для безопасной работы
                </li>
                <li>
                  <span className="text-blue-400">SOCKS4</span> - Поддерживает TCP соединения
                </li>
                <li>
                  <span className="text-blue-400">SOCKS5</span> - Наиболее функциональный тип, поддерживает UDP
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Форматы ввода</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>
                  <span className="text-blue-400">IP:Port</span> - Базовый формат без авторизации
                </li>
                <li>
                  <span className="text-blue-400">IP:Port:Username:Password</span> - С авторизацией
                </li>
                <li>
                  <span className="text-blue-400">Protocol://Username:Password@IP:Port</span> - URL формат
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Рекомендации</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>Используйте прокси из разных подсетей для безопасности</li>
                <li>Для Instagram рекомендуется использовать мобильные прокси</li>
                <li>Оптимальное соотношение: 1 прокси на 3-5 аккаунтов</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Проверка прокси
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 text-sm">
              Система автоматически проверяет прокси на работоспособность и совместимость с Instagram.
            </p>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Что проверяется</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>Доступность и скорость соединения</li>
                <li>Блокировка со стороны Instagram</li>
                <li>Геолокация и страна прокси</li>
                <li>Анонимность и уровень защиты</li>
              </ul>
            </div>

            <Button variant="outline" className="w-full border-slate-600 text-slate-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Запустить полную проверку
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
