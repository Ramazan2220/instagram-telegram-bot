import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StandardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  className?: string
}

export function StandardButton({
  variant = "default",
  size = "default",
  children,
  className,
  ...props
}: StandardButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("btn-height", variant === "outline" && "border-slate-600 text-slate-300", className)}
      {...props}
    >
      {children}
    </Button>
  )
}
