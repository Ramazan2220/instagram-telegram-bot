"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Search,
  Star,
  Download,
  Upload,
  Plus,
  Edit,
  Copy,
  Eye,
  Heart,
  User,
  Briefcase,
  Utensils,
  Dumbbell,
  Plane,
  Music,
  Gamepad2,
} from "lucide-react"

interface ProfileTemplate {
  id: string
  name: string
  category: string
  description: string
  displayName: string
  bio: string
  website: string
  isPrivate: boolean
  isBusinessAccount: boolean
  tags: string[]
  rating: number
  downloads: number
  preview: {
    avatar: string
    posts: number
    followers: string
    following: string
  }
}

interface ProfileTemplatesProps {
  activeTemplate: string | null
  onTemplateSelect: (templateId: string) => void
}

export default function ProfileTemplates({ activeTemplate, onTemplateSelect }: ProfileTemplatesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const templates: ProfileTemplate[] = [
    {
      id: "1",
      name: "Fashion Influencer",
      category: "lifestyle",
      description: "Стильный шаблон для модных блогеров",
      displayName: "Fashion Forward",
      bio: "✨ Style Enthusiast\n👗 Fashion Tips & Trends\n📍 NYC\n💌 Collaborations: DM",
      website: "fashionforward.com",
      isPrivate: false,
      isBusinessAccount: true,
      tags: ["fashion", "style", "influencer", "lifestyle"],
      rating: 4.8,
      downloads: 1247,
      preview: {
        avatar: "👗",
        posts: 156,
        followers: "12.5K",
        following: "892",
      },
    },
    {
      id: "2",
      name: "Food Blogger",
      category: "food",
      description: "Аппетитный шаблон для кулинарных блогеров",
      displayName: "Tasty Adventures",
      bio: "🍕 Food Lover & Recipe Creator\n👨‍🍳 Sharing delicious moments\n📧 Partnerships: email below\n🌟 #FoodieLife",
      website: "tastyadventures.com",
      isPrivate: false,
      isBusinessAccount: true,
      tags: ["food", "cooking", "recipes", "restaurant"],
      rating: 4.9,
      downloads: 2156,
      preview: {
        avatar: "🍕",
        posts: 234,
        followers: "18.2K",
        following: "456",
      },
    },
    {
      id: "3",
      name: "Fitness Coach",
      category: "fitness",
      description: "Мотивирующий шаблон для фитнес-тренеров",
      displayName: "FitLife Coach",
      bio: "💪 Certified Personal Trainer\n🏋️‍♀️ Transform your body & mind\n📱 DM for personal training\n🔥 #FitnessMotivation",
      website: "fitlifecoach.com",
      isPrivate: false,
      isBusinessAccount: true,
      tags: ["fitness", "health", "training", "motivation"],
      rating: 4.7,
      downloads: 987,
      preview: {
        avatar: "💪",
        posts: 189,
        followers: "15.8K",
        following: "234",
      },
    },
    {
      id: "4",
      name: "Travel Photographer",
      category: "travel",
      description: "Вдохновляющий шаблон для путешественников",
      displayName: "Wanderlust Lens",
      bio: "📸 Travel Photographer\n✈️ Capturing moments worldwide\n🌍 Next destination: Bali\n📧 Collaborations welcome",
      website: "wanderlustlens.com",
      isPrivate: false,
      isBusinessAccount: false,
      tags: ["travel", "photography", "adventure", "wanderlust"],
      rating: 4.6,
      downloads: 1543,
      preview: {
        avatar: "📸",
        posts: 312,
        followers: "22.1K",
        following: "1.2K",
      },
    },
    {
      id: "5",
      name: "Business Professional",
      category: "business",
      description: "Профессиональный шаблон для бизнеса",
      displayName: "Business Pro",
      bio: "🎯 Digital Marketing Expert\n📈 Helping brands grow online\n🔗 Free consultation below\n💼 #BusinessGrowth",
      website: "businesspro.com",
      isPrivate: false,
      isBusinessAccount: true,
      tags: ["business", "marketing", "professional", "consulting"],
      rating: 4.5,
      downloads: 876,
      preview: {
        avatar: "💼",
        posts: 98,
        followers: "8.9K",
        following: "567",
      },
    },
    {
      id: "6",
      name: "Music Artist",
      category: "music",
      description: "Креативный шаблон для музыкантов",
      displayName: "Sound Waves",
      bio: "🎵 Independent Artist\n🎸 Creating music that moves souls\n🎧 New single out now!\n📩 Bookings: email below",
      website: "soundwaves.music",
      isPrivate: false,
      isBusinessAccount: true,
      tags: ["music", "artist", "creative", "entertainment"],
      rating: 4.4,
      downloads: 654,
      preview: {
        avatar: "🎵",
        posts: 145,
        followers: "11.3K",
        following: "789",
      },
    },
  ]

  const categories = [
    { id: "all", name: "Все", icon: Palette },
    { id: "lifestyle", name: "Лайфстайл", icon: User },
    { id: "business", name: "Бизнес", icon: Briefcase },
    { id: "food", name: "Еда", icon: Utensils },
    { id: "fitness", name: "Фитнес", icon: Dumbbell },
    { id: "travel", name: "Путешествия", icon: Plane },
    { id: "music", name: "Музыка", icon: Music },
    { id: "gaming", name: "Игры", icon: Gamepad2 },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Поиск шаблонов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>

        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Создать шаблон
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Upload className="h-4 w-4 mr-2" />
            Импорт
          </Button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={categoryFilter === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoryFilter(category.id)}
            className={
              categoryFilter === category.id
                ? "bg-blue-600 hover:bg-blue-700"
                : "border-slate-600 text-slate-300 hover:bg-slate-700"
            }
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 cursor-pointer ${
              activeTemplate === template.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onTemplateSelect(template.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg">{template.name}</CardTitle>
                  <CardDescription className="text-slate-400 mt-1">{template.description}</CardDescription>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm">{template.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Profile Preview */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                    {template.preview.avatar}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{template.displayName}</h4>
                    <p className="text-slate-400 text-sm">@{template.name.toLowerCase().replace(/\s+/g, "_")}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-3 line-clamp-3">{template.bio}</p>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>{template.preview.posts} постов</span>
                  <span>{template.preview.followers} подписчиков</span>
                  <span>{template.preview.following} подписок</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    #{tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Stats and Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {template.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {Math.floor(template.downloads * 0.1)}
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400 h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-green-400 h-8 w-8 p-0">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-yellow-400 h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Palette className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-medium mb-2">Шаблоны не найдены</h3>
          <p className="text-slate-400 mb-4">Попробуйте изменить критерии поиска или создайте новый шаблон</p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Создать шаблон
          </Button>
        </div>
      )}

      {/* Selected Template Actions */}
      {activeTemplate && (
        <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  Выбран шаблон: {templates.find((t) => t.id === activeTemplate)?.name}
                </h4>
                <p className="text-slate-400 text-sm">Готов к применению на выбранные аккаунты</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-blue-500/30 text-blue-400">
                  <Eye className="h-4 w-4 mr-2" />
                  Предпросмотр
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Применить шаблон
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
