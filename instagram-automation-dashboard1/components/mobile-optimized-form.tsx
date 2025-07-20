"use client"

import type React from "react"

import type { ReactNode } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface MobileOptimizedFormProps {
  children: ReactNode
  onSubmit?: (e: React.FormEvent) => void
  className?: string
}

export default function MobileOptimizedForm({ children, onSubmit, className = "" }: MobileOptimizedFormProps) {
  const isMobile = useMobile()

  return (
    <form
      onSubmit={onSubmit}
      className={`${isMobile ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"} ${className}`}
    >
      {children}
    </form>
  )
}

interface FormFieldProps {
  children: ReactNode
  label: string
  htmlFor?: string
  description?: string
  error?: string
  fullWidth?: boolean
}

export function FormField({ children, label, htmlFor, description, error, fullWidth = false }: FormFieldProps) {
  const isMobile = useMobile()

  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      {children}
      {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

interface FormActionsProps {
  children: ReactNode
  className?: string
}

export function FormActions({ children, className = "" }: FormActionsProps) {
  return <div className={`md:col-span-2 flex justify-end gap-2 mt-4 ${className}`}>{children}</div>
}
