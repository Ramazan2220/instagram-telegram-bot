"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Lock,
  Fingerprint,
  KeyRound,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  Smartphone,
  Mail,
} from "lucide-react"

interface SecuritySettingsProps {
  onScoreChange?: (score: number) => void
}

export default function SecuritySettings({ onScoreChange }: SecuritySettingsProps) {
  const [settings, setSettings] = useState({
    twoFactor: true,
    loginNotifications: true,
    suspiciousLoginDetection: true,
    deviceManagement: true,
    passwordStrength: "strong",
    passwordExpiration: true,
    ipRestriction: false,
    apiKeyRotation: true,
    sessionTimeout: true,
    recoveryEmail: true,
    recoveryPhone: false,
  })

  const handleSettingChange = (setting: keyof typeof settings, value: boolean | string) => {
    const newSettings = { ...settings, [setting]: value }
    setSettings(newSettings)

    // Calculate security score
    if (onScoreChange) {
      const scoreMap: Record<keyof typeof settings, number> = {
        twoFactor: 15,
        loginNotifications: 5,
        suspiciousLoginDetection: 10,
        deviceManagement: 5,
        passwordStrength: settings.passwordStrength === "strong" ? 15 : 5,
        passwordExpiration: 5,
        ipRestriction: 10,
        apiKeyRotation: 10,
        sessionTimeout: 5,
        recoveryEmail: 10,
        recoveryPhone: 10,
      }

      let score = 0
      for (const [key, value] of Object.entries(newSettings)) {
        if (value === true || (key === "passwordStrength" && value === "strong")) {
          score += scoreMap[key as keyof typeof settings]
        }
      }

      // Normalize score to 100
      score = Math.min(100, score)
      onScoreChange(score)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Основные настройки безопасности
          </CardTitle>
          <CardDescription className="text-slate-400">
            Настройте базовые параметры безопасности для защиты вашего аккаунта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Two-Factor Authentication */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Fingerprint className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Двухфакторная аутентификация</h3>
                    <p className="text-sm text-slate-400 mt-1">Дополнительный уровень защиты при входе в аккаунт</p>
                  </div>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) => handleSettingChange("twoFactor", checked)}
                />
              </div>

              {settings.twoFactor && (
                <div className="mt-4 pl-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активно</Badge>
                    <span className="text-xs text-slate-400">Последняя проверка: 2 часа назад</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs border-slate-600 text-slate-300">
                      <Smartphone className="h-3 w-3 mr-1" />
                      SMS
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-slate-600 text-slate-300">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs border-slate-600 text-slate-300 bg-blue-600/20"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      Приложение
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Password Security */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <KeyRound className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Безопасность пароля</h3>
                    <p className="text-sm text-slate-400 mt-1">Настройки надежности и срока действия пароля</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${
                      settings.passwordStrength === "medium"
                        ? "bg-yellow-600/20 border-yellow-600/30 text-yellow-400"
                        : "border-slate-600 text-slate-300"
                    }`}
                    onClick={() => handleSettingChange("passwordStrength", "medium")}
                  >
                    Средний
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-7 text-xs ${
                      settings.passwordStrength === "strong"
                        ? "bg-green-600/20 border-green-600/30 text-green-400"
                        : "border-slate-600 text-slate-300"
                    }`}
                    onClick={() => handleSettingChange("passwordStrength", "strong")}
                  >
                    Сильный
                  </Button>
                </div>
              </div>

              <div className="mt-4 pl-8">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password-expiration" className="text-sm text-slate-300">
                    Срок действия пароля (90 дней)
                  </Label>
                  <Switch
                    id="password-expiration"
                    checked={settings.passwordExpiration}
                    onCheckedChange={(checked) => handleSettingChange("passwordExpiration", checked)}
                  />
                </div>
                <div className="text-xs text-slate-400">
                  {settings.passwordExpiration ? "Пароль будет истекать каждые 90 дней" : "Пароль не будет истекать"}
                </div>
              </div>
            </div>

            {/* Login Notifications */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Уведомления о входе</h3>
                    <p className="text-sm text-slate-400 mt-1">Получайте уведомления о новых входах в аккаунт</p>
                  </div>
                </div>
                <Switch
                  checked={settings.loginNotifications}
                  onCheckedChange={(checked) => handleSettingChange("loginNotifications", checked)}
                />
              </div>

              {settings.loginNotifications && (
                <div className="mt-4 pl-8 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="suspicious-login" className="text-sm text-slate-300">
                      Обнаружение подозрительных входов
                    </Label>
                    <Switch
                      id="suspicious-login"
                      checked={settings.suspiciousLoginDetection}
                      onCheckedChange={(checked) => handleSettingChange("suspiciousLoginDetection", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="device-management" className="text-sm text-slate-300">
                      Управление устройствами
                    </Label>
                    <Switch
                      id="device-management"
                      checked={settings.deviceManagement}
                      onCheckedChange={(checked) => handleSettingChange("deviceManagement", checked)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Session Security */}
            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Безопасность сессий</h3>
                    <p className="text-sm text-slate-400 mt-1">Настройки управления сессиями и таймаутами</p>
                  </div>
                </div>
                <Switch
                  checked={settings.sessionTimeout}
                  onCheckedChange={(checked) => handleSettingChange("sessionTimeout", checked)}
                />
              </div>

              {settings.sessionTimeout && (
                <div className="mt-4 pl-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-slate-300">Таймаут сессии:</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">30 минут</Badge>
                  </div>
                  <div className="text-xs text-slate-400">Автоматический выход после 30 минут неактивности</div>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-slate-700" />

          <div className="space-y-4">
            <h3 className="text-white font-medium">Дополнительные настройки безопасности</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <div>
                    <h4 className="text-sm text-white">Ограничение по IP</h4>
                    <p className="text-xs text-slate-400">Доступ только с доверенных IP-адресов</p>
                  </div>
                </div>
                <Switch
                  checked={settings.ipRestriction}
                  onCheckedChange={(checked) => handleSettingChange("ipRestriction", checked)}
                />
              </div>

              <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <RefreshCw className="h-5 w-5 text-slate-400" />
                  <div>
                    <h4 className="text-sm text-white">Ротация API ключей</h4>
                    <p className="text-xs text-slate-400">Автоматическая смена ключей каждые 30 дней</p>
                  </div>
                </div>
                <Switch
                  checked={settings.apiKeyRotation}
                  onCheckedChange={(checked) => handleSettingChange("apiKeyRotation", checked)}
                />
              </div>

              <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <div>
                    <h4 className="text-sm text-white">Резервный email</h4>
                    <p className="text-xs text-slate-400">Дополнительный email для восстановления</p>
                  </div>
                </div>
                <Switch
                  checked={settings.recoveryEmail}
                  onCheckedChange={(checked) => handleSettingChange("recoveryEmail", checked)}
                />
              </div>

              <div className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-slate-400" />
                  <div>
                    <h4 className="text-sm text-white">Резервный телефон</h4>
                    <p className="text-xs text-slate-400">Дополнительный телефон для восстановления</p>
                  </div>
                </div>
                <Switch
                  checked={settings.recoveryPhone}
                  onCheckedChange={(checked) => handleSettingChange("recoveryPhone", checked)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Отменить
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Сохранить настройки</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            Проверка безопасности
          </CardTitle>
          <CardDescription className="text-slate-400">
            Результаты последней проверки безопасности системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Двухфакторная аутентификация</div>
                  <div className="text-xs text-green-400">Активна</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Надежность пароля</div>
                  <div className="text-xs text-green-400">Сильный пароль</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Ограничение по IP</div>
                  <div className="text-xs text-yellow-400">Не настроено</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Уведомления о входе</div>
                  <div className="text-xs text-green-400">Активны</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Ротация API ключей</div>
                  <div className="text-xs text-green-400">Активна</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-300">Резервный телефон</div>
                  <div className="text-xs text-red-400">Не настроен</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <RefreshCw className="h-4 w-4 mr-2" />
                Запустить проверку
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
