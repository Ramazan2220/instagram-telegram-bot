import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GLOBAL_STYLES } from "@/styles/global-styles"

interface AppCardProps {
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  headerAction?: ReactNode
  noPadding?: boolean
}

export function AppCard({
  title,
  description,
  children,
  className = "",
  headerAction,
  noPadding = false,
}: AppCardProps) {
  return (
    <Card className={`${GLOBAL_STYLES.cardBg} ${GLOBAL_STYLES.cardBorder} ${GLOBAL_STYLES.shadow} ${className}`}>
      {(title || description) && (
        <CardHeader className={GLOBAL_STYLES.cardHeaderPadding}>
          <div className="flex items-center justify-between">
            <div>
              {title && <CardTitle className={`text-white ${GLOBAL_STYLES.titleSize}`}>{title}</CardTitle>}
              {description && (
                <CardDescription className={`text-slate-400 ${GLOBAL_STYLES.smallTextSize}`}>
                  {description}
                </CardDescription>
              )}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={noPadding ? "p-0" : GLOBAL_STYLES.cardContentPadding}>{children}</CardContent>
    </Card>
  )
}
