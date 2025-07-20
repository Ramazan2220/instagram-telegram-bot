"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, MessageSquare, BarChart3, Sparkles, Settings, Zap } from "lucide-react"
import PageContainer from "@/components/page-container"
import { Card, CardContent } from "@/components/ui/card"
import AIContentGenerator from "@/components/ai-content-generator"
import AIInteractionBot from "@/components/ai-interaction-bot"
import AIAnalytics from "@/components/ai-analytics"

export default function AIPage() {
  const [activeModel, setActiveModel] = useState("gpt-4")

  const actions = (
    <div className="flex gap-2">
      <select
        value={activeModel}
        onChange={(e) => setActiveModel(e.target.value)}
        className="bg-slate-800 border-slate-700 text-white rounded-md px-4 py-2"
      >
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5">GPT-3.5 Turbo</option>
        <option value="claude">Claude 3</option>
        <option value="llama">Llama 3</option>
      </select>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Zap className="h-5 w-5 mr-2" />
        Запустить ИИ
      </Button>
    </div>
  )

  return (
    <PageContainer
      title="ИИ Ассистент"
      description="Генерация контента и автоматизация взаимодействий с помощью искусственного интеллекта"
      actions={actions}
    >
      {/* AI Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-slate-400">Сгенерировано</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3,856</p>
                <p className="text-slate-400">Ответов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98.7%</p>
                <p className="text-slate-400">Точность</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12.5K</p>
                <p className="text-slate-400">Токенов</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="content" className="w-full space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
            <Sparkles className="h-5 w-5 mr-2" />
            Генерация контента
          </TabsTrigger>
          <TabsTrigger value="interaction" className="data-[state=active]:bg-green-600">
            <MessageSquare className="h-5 w-5 mr-2" />
            Автоответчик
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">
            <BarChart3 className="h-5 w-5 mr-2" />
            Аналитика ИИ
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-orange-600">
            <Settings className="h-5 w-5 mr-2" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <AIContentGenerator model={activeModel} />
        </TabsContent>

        <TabsContent value="interaction">
          <AIInteractionBot model={activeModel} />
        </TabsContent>

        <TabsContent value="analytics">
          <AIAnalytics />
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Настройки ИИ</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-lg text-white">API ключ</label>
                    <input
                      type="password"
                      placeholder="sk-..."
                      className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-3 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-lg text-white">Организация</label>
                    <input
                      type="text"
                      placeholder="org-..."
                      className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-3 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-white">Модель по умолчанию</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-3 text-white">
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-3.5">GPT-3.5 Turbo</option>
                    <option value="claude">Claude 3</option>
                    <option value="llama">Llama 3</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-white">Температура</label>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full h-2" />
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>Точный (0.0)</span>
                    <span>Сбалансированный (0.7)</span>
                    <span>Креативный (1.0)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-lg text-white">Максимальная длина ответа</label>
                  <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-3 text-white">
                    <option value="256">256 токенов</option>
                    <option value="512">512 токенов</option>
                    <option value="1024">1024 токена</option>
                    <option value="2048">2048 токенов</option>
                    <option value="4096">4096 токенов</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-lg text-white">Кэширование ответов</label>
                    <p className="text-slate-400">Сохранять ответы для экономии токенов</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-6 w-6" />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" className="border-slate-600 text-slate-300 text-lg py-6 px-8">
                    Отмена
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8">Сохранить настройки</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  )
}
