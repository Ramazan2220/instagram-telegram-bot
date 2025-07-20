import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react"
import { COMPACT_STYLES } from "@/components/global-optimization"

export function NotificationsSettings() {
  return (
    <div className="h-full">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm h-full">
        <CardHeader className={COMPACT_STYLES.cardHeaderPadding}>
          <CardTitle className="text-white text-sm">Настройки уведомлений</CardTitle>
          <CardDescription className="text-slate-400 text-[10px]">
            Настройте способы получения уведомлений и их типы
          </CardDescription>
        </CardHeader>
        <CardContent className={COMPACT_STYLES.cardContentPadding}>
          <div className="space-y-6">
            {/* Notification Channels */}
            <div className="space-y-3">
              <h3 className="text-white text-xs font-medium">Каналы уведомлений</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-3 w-3 text-blue-400" />
                    <div>
                      <p className="text-white text-xs">В приложении</p>
                      <p className="text-slate-400 text-[9px]">Уведомления в интерфейсе системы</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-green-400" />
                    <div>
                      <p className="text-white text-xs">Email</p>
                      <p className="text-slate-400 text-[9px]">Отправка уведомлений на email</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-3 w-3 text-purple-400" />
                    <div>
                      <p className="text-white text-xs">Push-уведомления</p>
                      <p className="text-slate-400 text-[9px]">Уведомления в браузере</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3 w-3 text-yellow-400" />
                    <div>
                      <p className="text-white text-xs">Telegram</p>
                      <p className="text-slate-400 text-[9px]">Отправка уведомлений в Telegram</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="space-y-3">
              <h3 className="text-white text-xs font-medium">Типы уведомлений</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-white text-xs">Успешные операции</p>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white text-xs">Ошибки и проблемы</p>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white text-xs">Предупреждения</p>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white text-xs">Информационные сообщения</p>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-white text-xs">Обновления системы</p>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Notification Frequency */}
            <div className="space-y-3">
              <h3 className="text-white text-xs font-medium">Частота уведомлений</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs">Мгновенные уведомления</p>
                    <p className="text-slate-400 text-[9px]">Получать уведомления сразу</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs">Дайджест (раз в день)</p>
                    <p className="text-slate-400 text-[9px]">Получать сводку за день</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs">Не беспокоить</p>
                    <p className="text-slate-400 text-[9px]">С 22:00 до 8:00</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
