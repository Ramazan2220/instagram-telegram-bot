"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { StandardCard } from "@/components/ui/standard-card"
import { COMPACT_STYLES } from "@/components/global-optimization"
import {
  Wand2,
  Copy,
  RefreshCw,
  Save,
  Download,
  ImageIcon,
  Video,
  Hash,
  MessageSquare,
  Sparkles,
  Brain,
  Target,
  Zap,
} from "lucide-react"

export default function AIContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [contentType, setContentType] = useState("post")
  const [tone, setTone] = useState("friendly")
  const [creativity, setCreativity] = useState([0.7])
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)

  const [contentSettings, setContentSettings] = useState({
    topic: "",
    targetAudience: "",
    callToAction: "",
    brandVoice: "",
    keywords: "",
    length: "medium",
  })

  const contentTypes = [
    { value: "post", label: "Пост", icon: ImageIcon },
    { value: "story", label: "Stories", icon: Video },
    { value: "reel", label: "Reels", icon: Video },
    { value: "caption", label: "Подпись", icon: MessageSquare },
    { value: "comment", label: "Комментарий", icon: MessageSquare },
    { value: "bio", label: "Био", icon: Hash },
  ]

  const tones = [
    { value: "friendly", label: "Дружелюбный", emoji: "😊" },
    { value: "professional", label: "Профессиональный", emoji: "💼" },
    { value: "casual", label: "Неформальный", emoji: "😎" },
    { value: "inspiring", label: "Вдохновляющий", emoji: "✨" },
    { value: "humorous", label: "Юмористический", emoji: "😄" },
    { value: "educational", label: "Образовательный", emoji: "📚" },
    { value: "promotional", label: "Рекламный", emoji: "🎯" },
    { value: "storytelling", label: "Повествовательный", emoji: "📖" },
  ]

  const generateContent = async () => {
    setIsGenerating(true)

    // Симуляция AI генерации
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const sampleContent = `🌟 Откройте для себя новые возможности роста!

Каждый день - это шанс стать лучше. Не важно, с чего вы начинаете, важно то, что вы начинаете. 

✨ Ключевые принципы успеха:
• Постоянное обучение
• Настойчивость в достижении целей  
• Открытость к новому опыту
• Работа над собой каждый день

Какой шаг к своей мечте вы сделаете сегодня? Поделитесь в комментариях! 👇

#мотивация #успех #развитие #цели #вдохновение #рост #достижения #мечты`

    setGeneratedContent(sampleContent)
    setIsGenerating(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  return (
    <div className={`w-full ${COMPACT_STYLES.sectionGap}`}>
      <StandardCard
        title={
          <div className="flex items-center gap-1">
            <Wand2 className={`${COMPACT_STYLES.smallIconSize} text-purple-400`} />
            ИИ Генератор контента
          </div>
        }
        description="Создавайте уникальный контент с помощью искусственного интеллекта"
      >
        <Tabs defaultValue="generator" className={`w-full ${COMPACT_STYLES.sectionGap}`}>
          <TabsList className="bg-slate-700 border-slate-600 h-7">
            <TabsTrigger
              value="generator"
              className={`data-[state=active]:bg-purple-600 ${COMPACT_STYLES.smallTextSize} h-5 px-2`}
            >
              <Brain className={`${COMPACT_STYLES.smallIconSize} mr-1`} />
              Генератор
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className={`data-[state=active]:bg-purple-600 ${COMPACT_STYLES.smallTextSize} h-5 px-2`}
            >
              <Sparkles className={`${COMPACT_STYLES.smallIconSize} mr-1`} />
              Шаблоны
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={`data-[state=active]:bg-purple-600 ${COMPACT_STYLES.smallTextSize} h-5 px-2`}
            >
              <Target className={`${COMPACT_STYLES.smallIconSize} mr-1`} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className={`w-full ${COMPACT_STYLES.sectionGap} mt-3`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 ${COMPACT_STYLES.gridGap} w-full`}>
              {/* Input Section */}
              <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Тип контента</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger
                      className={`bg-slate-700 border-slate-600 text-white ${COMPACT_STYLES.inputHeight} ${COMPACT_STYLES.smallTextSize} w-full`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className={COMPACT_STYLES.smallTextSize}>
                          <div className="flex items-center gap-1">
                            <type.icon className={COMPACT_STYLES.smallIconSize} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Тема/Топик</Label>
                  <Input
                    placeholder="О чем будет контент?"
                    value={contentSettings.topic}
                    onChange={(e) => setContentSettings((prev) => ({ ...prev, topic: e.target.value }))}
                    className={`bg-slate-700 border-slate-600 text-white ${COMPACT_STYLES.inputHeight} ${COMPACT_STYLES.smallTextSize} w-full`}
                  />
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Целевая аудитория</Label>
                  <Input
                    placeholder="Для кого предназначен контент?"
                    value={contentSettings.targetAudience}
                    onChange={(e) => setContentSettings((prev) => ({ ...prev, targetAudience: e.target.value }))}
                    className={`bg-slate-700 border-slate-600 text-white ${COMPACT_STYLES.inputHeight} ${COMPACT_STYLES.smallTextSize} w-full`}
                  />
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Тон общения</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger
                      className={`bg-slate-700 border-slate-600 text-white ${COMPACT_STYLES.inputHeight} ${COMPACT_STYLES.smallTextSize} w-full`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {tones.map((toneOption) => (
                        <SelectItem
                          key={toneOption.value}
                          value={toneOption.value}
                          className={COMPACT_STYLES.smallTextSize}
                        >
                          <div className="flex items-center gap-1">
                            <span>{toneOption.emoji}</span>
                            {toneOption.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Призыв к действию</Label>
                  <Input
                    placeholder="Что должна сделать аудитория?"
                    value={contentSettings.callToAction}
                    onChange={(e) => setContentSettings((prev) => ({ ...prev, callToAction: e.target.value }))}
                    className={`bg-slate-700 border-slate-600 text-white ${COMPACT_STYLES.inputHeight} ${COMPACT_STYLES.smallTextSize} w-full`}
                  />
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Ключевые слова</Label>
                  <Input
                    placeholder="Через запятую"
                    value={contentSettings.keywords}
                    onChange={(e) => setContentSettings((prev) => ({ ...prev, keywords: e.target.value }))}
                    className={`bg-slate-700 border-slate-600 text-white ${COMPACT_STYLES.inputHeight} ${COMPACT_STYLES.smallTextSize} w-full`}
                  />
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>
                    Креативность: {creativity[0]}
                  </Label>
                  <Slider
                    value={creativity}
                    onValueChange={setCreativity}
                    max={1}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>Консервативно</span>
                    <span>Креативно</span>
                  </div>
                </div>

                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <div className="flex items-center justify-between">
                    <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Включить хештеги</Label>
                    <Switch checked={includeHashtags} onCheckedChange={setIncludeHashtags} className="scale-75" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Включить эмодзи</Label>
                    <Switch checked={includeEmojis} onCheckedChange={setIncludeEmojis} className="scale-75" />
                  </div>
                </div>

                <Button
                  onClick={generateContent}
                  disabled={isGenerating}
                  className={`w-full bg-purple-600 hover:bg-purple-700 ${COMPACT_STYLES.buttonHeight} ${COMPACT_STYLES.smallTextSize}`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className={`${COMPACT_STYLES.smallIconSize} mr-1 animate-spin`} />
                      Генерируем...
                    </>
                  ) : (
                    <>
                      <Zap className={`${COMPACT_STYLES.smallIconSize} mr-1`} />
                      Сгенерировать контент
                    </>
                  )}
                </Button>
              </div>

              {/* Output Section */}
              <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Сгенерированный контент</Label>
                  <div className="relative w-full">
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      placeholder="Здесь появится сгенерированный контент..."
                      className={`bg-slate-700 border-slate-600 text-white h-[200px] resize-none ${COMPACT_STYLES.smallTextSize} w-full`}
                    />
                    {generatedContent && (
                      <div className="absolute top-1 right-1 flex gap-0.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                          className="text-slate-400 hover:text-white h-4 w-4 p-0"
                        >
                          <Copy className="h-2.5 w-2.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white h-4 w-4 p-0">
                          <Save className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {generatedContent && (
                  <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Символов: {generatedContent.length}</span>
                      <span className="text-slate-400">Хештегов: {(generatedContent.match(/#\w+/g) || []).length}</span>
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        className={`border-slate-600 text-slate-300 ${COMPACT_STYLES.buttonHeight} ${COMPACT_STYLES.smallTextSize}`}
                      >
                        <RefreshCw className={`${COMPACT_STYLES.smallIconSize} mr-1`} />
                        Регенерировать
                      </Button>
                      <Button
                        variant="outline"
                        className={`border-slate-600 text-slate-300 ${COMPACT_STYLES.buttonHeight} ${COMPACT_STYLES.smallTextSize}`}
                      >
                        <Download className={`${COMPACT_STYLES.smallIconSize} mr-1`} />
                        Экспорт
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="w-full mt-3">
            {/* Шаблоны контента - упрощенная версия */}
            <div className={`grid grid-cols-2 ${COMPACT_STYLES.gridGap} w-full`}>
              {[1, 2, 3, 4].map((i) => (
                <StandardCard key={i} title={`Шаблон ${i}`} description="Описание шаблона">
                  <div className={`${COMPACT_STYLES.itemGap}`}>
                    <div className="p-1 bg-slate-800/50 rounded text-slate-300 text-[9px] font-mono h-12 overflow-hidden">
                      Пример шаблона контента...
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`w-full border-slate-600 text-slate-300 h-5 ${COMPACT_STYLES.smallTextSize}`}
                    >
                      <Copy className="h-2 w-2 mr-0.5" />
                      Использовать
                    </Button>
                  </div>
                </StandardCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="w-full mt-3">
            {/* Упрощенные настройки */}
            <div className={`grid grid-cols-2 ${COMPACT_STYLES.gridGap} w-full`}>
              <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                <h3 className={`text-white font-medium ${COMPACT_STYLES.smallTextSize}`}>Настройки бренда</h3>
                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <Label className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Голос бренда</Label>
                  <Textarea
                    placeholder="Опишите стиль общения вашего бренда..."
                    value={contentSettings.brandVoice}
                    onChange={(e) => setContentSettings((prev) => ({ ...prev, brandVoice: e.target.value }))}
                    className={`bg-slate-700 border-slate-600 text-white h-16 ${COMPACT_STYLES.smallTextSize} w-full`}
                  />
                </div>
              </div>

              <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                <h3 className={`text-white font-medium ${COMPACT_STYLES.smallTextSize}`}>Настройки ИИ</h3>
                <div className={`${COMPACT_STYLES.itemGap} w-full`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Автосохранение</span>
                    <Switch defaultChecked className="scale-75" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-slate-300 ${COMPACT_STYLES.smallTextSize}`}>Проверка на плагиат</span>
                    <Switch defaultChecked className="scale-75" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </StandardCard>
    </div>
  )
}
