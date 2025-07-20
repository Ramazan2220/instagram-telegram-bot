"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Lock, Shield, Database, Trash2, Download, AlertTriangle, Info } from "lucide-react"

export default function PrivacySettings() {
  const [privacySettings, setPrivacySettings] = useState({
    dataEncryption: true,
    anonymousMode: false,
    hideActivity: true,
    secureStorage: true,
    autoDeleteLogs: true,
    shareAnalytics: false,
    cookieConsent: true,
    trackingProtection: true,
    dataMinimization: true,
    rightToForget: false,
    exportData: true,
    thirdPartySharing: false,
  })

  const handleSettingChange = (setting: keyof typeof privacySettings, value: boolean) => {
    setPrivacySettings({ ...privacySettings, [setting]: value })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-400" />
            Настройки приватности
          </CardTitle>
          <CardDescription className="text-slate-400">
            Управляйте конфиденциальностью ваших данных и активности
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data Protection */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Защита данных</h3>
                    <p className="text-sm text-slate-400 mt-1">Шифрование и безопасное хранение ваших данных</p>
                  </div>
                </div>
                <Switch
                  checked={privacySettings.dataEncryption}
                  onCheckedChange={(checked) => handleSettingChange("dataEncryption", checked)}
                />
              </div>

              {privacySettings.dataEncryption && (
                <div className="pl-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="secure-storage" className="text-sm text-slate-300">
                      Безопасное хранение
                    </Label>
                    <Switch
                      id="secure-storage"
                      checked={privacySettings.secureStorage}
                      onCheckedChange={(checked) => handleSettingChange("secureStorage", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-delete" className="text-sm text-slate-300">
                      Автоудаление логов (30 дней)
                    </Label>
                    <Switch
                      id="auto-delete"
                      checked={privacySettings.autoDeleteLogs}
                      onCheckedChange={(checked) => handleSettingChange("autoDeleteLogs", checked)}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    <div className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span>Данные зашифрованы с использованием AES-256</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Activity Privacy */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <EyeOff className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Приватность активности</h3>
                    <p className="text-sm text-slate-400 mt-1">Скрытие вашей активности от посторонних</p>
                  </div>
                </div>
                <Switch
                  checked={privacySettings.hideActivity}
                  onCheckedChange={(checked) => handleSettingChange("hideActivity", checked)}
                />
              </div>

              {privacySettings.hideActivity && (
                <div className="pl-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="anonymous-mode" className="text-sm text-slate-300">
                      Анонимный режим
                    </Label>
                    <Switch
                      id="anonymous-mode"
                      checked={privacySettings.anonymousMode}
                      onCheckedChange={(checked) => handleSettingChange("anonymousMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tracking-protection" className="text-sm text-slate-300">
                      Защита от отслеживания
                    </Label>
                    <Switch
                      id="tracking-protection"
                      checked={privacySettings.trackingProtection}
                      onCheckedChange={(checked) => handleSettingChange("trackingProtection", checked)}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-2">
                    <div className="flex items-center gap-1">
                      <EyeOff className="h-3 w-3" />
                      <span>Ваша активность скрыта от аналитики</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Data Sharing */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Database className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Обмен данными</h3>
                    <p className="text-sm text-slate-400 mt-1">Контроль над передачей ваших данных</p>
                  </div>
                </div>
              </div>

              <div className="pl-8 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="share-analytics" className="text-sm text-slate-300">
                    Делиться аналитикой для улучшения сервиса
                  </Label>
                  <Switch
                    id="share-analytics"
                    checked={privacySettings.shareAnalytics}
                    onCheckedChange={(checked) => handleSettingChange("shareAnalytics", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="third-party" className="text-sm text-slate-300">
                    Передача данных третьим лицам
                  </Label>
                  <Switch
                    id="third-party"
                    checked={privacySettings.thirdPartySharing}
                    onCheckedChange={(checked) => handleSettingChange("thirdPartySharing", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cookie-consent" className="text-sm text-slate-300">
                    Согласие на использование cookies
                  </Label>
                  <Switch
                    id="cookie-consent"
                    checked={privacySettings.cookieConsent}
                    onCheckedChange={(checked) => handleSettingChange("cookieConsent", checked)}
                  />
                </div>
              </div>
            </div>

            {/* Data Rights */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Download className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Права на данные</h3>
                    <p className="text-sm text-slate-400 mt-1">Управление вашими правами на данные</p>
                  </div>
                </div>
              </div>

              <div className="pl-8 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="export-data" className="text-sm text-slate-300">
                    Право на экспорт данных
                  </Label>
                  <Switch
                    id="export-data"
                    checked={privacySettings.exportData}
                    onCheckedChange={(checked) => handleSettingChange("exportData", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-minimization" className="text-sm text-slate-300">
                    Минимизация данных
                  </Label>
                  <Switch
                    id="data-minimization"
                    checked={privacySettings.dataMinimization}
                    onCheckedChange={(checked) => handleSettingChange("dataMinimization", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="right-forget" className="text-sm text-slate-300">
                    Право на забвение
                  </Label>
                  <Switch
                    id="right-forget"
                    checked={privacySettings.rightToForget}
                    onCheckedChange={(checked) => handleSettingChange("rightToForget", checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          <div className="space-y-4">
            <h3 className="text-white font-medium">Управление данными</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 justify-start">
                <Download className="h-4 w-4 mr-2" />
                Экспорт всех данных
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Просмотр собранных данных
              </Button>
              <Button variant="outline" className="border-red-600 text-red-400 justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить все данные
              </Button>
            </div>
          </div>

          <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">Информация о конфиденциальности</h4>
                <ul className="mt-2 space-y-1 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Мы используем только необходимые данные для работы сервиса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Все данные шифруются и хранятся в безопасных дата-центрах</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Мы не продаем ваши данные третьим лицам</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Вы можете в любое время запросить удаление ваших данных</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Отменить
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Сохранить настройки</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            Статус конфиденциальности
          </CardTitle>
          <CardDescription className="text-slate-400">Текущий уровень защиты ваших данных</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Шифрование</div>
                  <div className="text-xs text-green-400">Активно</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <EyeOff className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Приватность</div>
                  <div className="text-xs text-purple-400">Высокая</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Данные</div>
                  <div className="text-xs text-blue-400">Защищены</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Lock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Доступ</div>
                  <div className="text-xs text-yellow-400">Ограничен</div>
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Высокий уровень защиты</h4>
                  <p className="text-sm text-slate-300">
                    Ваши настройки конфиденциальности обеспечивают максимальную защиту данных
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
