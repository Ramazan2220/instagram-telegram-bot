import type { ReactNode } from "react"

interface ResponsiveGridProps {
  children: ReactNode
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
  className?: string
}

export default function ResponsiveGrid({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "gap-4",
  className = "",
}: ResponsiveGridProps) {
  const getGridCols = () => {
    return [
      columns.sm && `grid-cols-${columns.sm}`,
      columns.md && `md:grid-cols-${columns.md}`,
      columns.lg && `lg:grid-cols-${columns.lg}`,
      columns.xl && `xl:grid-cols-${columns.xl}`,
    ]
      .filter(Boolean)
      .join(" ")
  }

  return <div className={`grid ${getGridCols()} ${gap} ${className}`}>{children}</div>
}
