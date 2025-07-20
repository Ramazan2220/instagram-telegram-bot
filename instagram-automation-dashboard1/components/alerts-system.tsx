import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Shield, AlertTriangle, Bell, Mail, Smartphone } from "lucide-react"
import { COMPACT_STYLES } from "@/components/global-optimization"

export function AlertsSystem() {
  return (
    <div className="h-full">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full">
        <CardHeader className={COMPACT_STYLES.cardHeaderPadding}>
          <CardTitle className="text-white text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-400" />
            Система оповещений
          </CardTitle>
          <CardDescription className="text-slate-400 text-[10px]">
            Настройте критические оповещения для мониторинга аккаунтов
          </CardDescription>
        </CardHeader>
        <CardContent className={COMPACT_STYLES.cardContentPadding}>
          <div className="space-y-6">
            {/* Alert Triggers */}
            <div className="space-y-3">
              <h3 className="text-white text-xs font-medium">Триггеры оповещений</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-red-400" />
                    <div>
                      <p className="text-white text-xs">Блокировка аккаунта</p>
                      <p className="text-slate-400 text-[9px]">Оповещение при блокировке аккаунта</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-yellow-400" />
                    <div>
                      <p className="text-white text-xs">Предупреждение от Instagram</p>
                      <p className="text-slate-400 text-[9px]">Оповещение при получении предупреждения</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-orange-400" />
                    <div>
                      <p className="text-white text-xs">Ошибка авторизации</p>
                      <p className="text-slate-400 text-[9px]">Оповещение при проблемах с входом</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-blue-400" />
                    <div>
                      <p className="text-white text-xs">Проблемы с прокси</p>
                      <p className="text-slate-400 text-[9px]">Оповещение при недоступности прокси</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Alert Channels */}
            <div className="space-y-3">
              <h3 className="text-white text-xs font-medium">Каналы оповещений</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-3 w-3 text-blue-400" />
                    <p className="text-white text-xs">В приложении</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-green-400" />
                    <p className="text-white text-xs">Email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-3 w-3 text-purple-400" />
                    <p className="text-white text-xs">SMS</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-white text-xs font-medium">Контактная информация</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-slate-300 text-[10px] block mb-1">Email для оповещений</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-slate-700 border-slate-600 text-white h-7 text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-[10px] block mb-1">Номер телефона</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    className="bg-slate-700 border-slate-600 text-white h-7 text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-300 text-[10px] block mb-1">Telegram ID</label>
                  <Input
                    type="text"
                    placeholder="@username"
                    className="bg-slate-700 border-slate-600 text-white h-7 text-xs"
                  />
                </div>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 h-7 text-xs">Сохранить настройки оповещений</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
