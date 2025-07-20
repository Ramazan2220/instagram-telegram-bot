import { Bell, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StandardCard } from "@/components/ui/standard-card"
import { COMPACT_STYLES } from "@/components/global-optimization"

type Notification = {
  id: number
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "success",
    title: "Публикация выполнена",
    message: "Успешно опубликовано 12 постов в аккаунтах",
    time: "2 минуты назад",
    read: false,
  },
  {
    id: 2,
    type: "error",
    title: "Ошибка авторизации",
    message: "Не удалось войти в аккаунт @travel_blogger_pro",
    time: "15 минут назад",
    read: false,
  },
  {
    id: 3,
    type: "warning",
    title: "Предупреждение",
    message: "Высокая нагрузка на прокси US-01",
    time: "1 час назад",
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "Обновление системы",
    message: "Доступна новая версия системы 2.5.0",
    time: "3 часа назад",
    read: true,
  },
  {
    id: 5,
    type: "success",
    title: "Прогрев завершен",
    message: "Успешно завершен прогрев 5 аккаунтов",
    time: "5 часов назад",
    read: true,
  },
]

export function NotificationsList({ filter = "all" }: { filter?: string }) {
  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => !n.read)

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className={COMPACT_STYLES.smallIconSize + " text-green-400"} />
      case "error":
        return <XCircle className={COMPACT_STYLES.smallIconSize + " text-red-400"} />
      case "warning":
        return <AlertCircle className={COMPACT_STYLES.smallIconSize + " text-yellow-400"} />
      case "info":
        return <Info className={COMPACT_STYLES.smallIconSize + " text-blue-400"} />
      default:
        return <Bell className={COMPACT_STYLES.smallIconSize + " text-slate-400"} />
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className={`${COMPACT_STYLES.sectionGap} h-full`}>
      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-8">
          <Bell className="h-12 w-12 text-slate-500 mb-2" />
          <p className={`text-slate-400 ${COMPACT_STYLES.textSize}`}>Нет уведомлений</p>
        </div>
      ) : (
        filteredNotifications.map((notification) => (
          <StandardCard
            key={notification.id}
            className={notification.read ? "bg-slate-800/30" : "bg-slate-800/50 border-slate-700"}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${getBadgeColor(notification.type)}`}
              >
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-white ${COMPACT_STYLES.textSize} font-medium truncate`}>{notification.title}</h4>
                  {!notification.read && <Badge className="bg-blue-600 text-[8px] px-1 py-0">Новое</Badge>}
                </div>
                <p className={`text-slate-300 ${COMPACT_STYLES.smallTextSize} mt-0.5`}>{notification.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-slate-400 text-[9px]">{notification.time}</span>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <XCircle className="h-2.5 w-2.5 text-slate-400" />
                  </Button>
                </div>
              </div>
            </div>
          </StandardCard>
        ))
      )}
    </div>
  )
}
