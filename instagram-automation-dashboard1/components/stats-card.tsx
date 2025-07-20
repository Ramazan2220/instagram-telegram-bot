import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: "blue" | "green" | "purple" | "orange"
}

export default function StatsCard({ title, value, icon, trend, color, ...props }: StatsCardProps) {
  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500/20 text-blue-400"
      case "green":
        return "bg-green-500/20 text-green-400"
      case "purple":
        return "bg-purple-500/20 text-purple-400"
      case "orange":
        return "bg-orange-500/20 text-orange-400"
      default:
        return "bg-blue-500/20 text-blue-400"
    }
  }

  const getTrendClass = () => {
    if (trend.startsWith("+")) return "text-green-400"
    if (trend.startsWith("-")) return "text-red-400"
    return "text-blue-400"
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700" {...props}>
      <CardContent className="p-1.5">
        <div className="flex items-center gap-1.5">
          <div className={`w-6 h-6 ${getColorClass()} rounded-full flex items-center justify-center`}>{icon}</div>
          <div>
            <p className="text-base font-bold text-white leading-tight">{value}</p>
            <p className="text-[10px] text-slate-400 leading-tight">{title}</p>
          </div>
          <div className={`ml-auto ${getTrendClass()} text-[10px]`}>{trend}</div>
        </div>
      </CardContent>
    </Card>
  )
}
