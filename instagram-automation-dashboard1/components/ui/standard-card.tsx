import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StandardCardProps {
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerAction?: React.ReactNode
}

export function StandardCard({ title, description, children, className, headerAction }: StandardCardProps) {
  return (
    <Card className={cn("bg-slate-800/50 border-slate-700", className)}>
      {(title || description) && (
        <CardHeader className="card-header">
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle className="text-white">{title}</CardTitle>}
              {description && <CardDescription className="text-slate-400">{description}</CardDescription>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className="card-content">{children}</CardContent>
    </Card>
  )
}
