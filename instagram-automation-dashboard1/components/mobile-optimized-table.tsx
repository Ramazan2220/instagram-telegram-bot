"use client"

import type React from "react"

import { useMobile } from "@/hooks/use-mobile"
import { Card } from "@/components/ui/card"

interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  className?: string
}

interface MobileOptimizedTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  className?: string
}

export default function MobileOptimizedTable<T>({
  data,
  columns,
  keyField,
  className = "",
}: MobileOptimizedTableProps<T>) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className={`space-y-4 ${className}`}>
        {data.map((item) => (
          <Card key={String(item[keyField])} className="p-4">
            {columns.map((column, index) => {
              const value = typeof column.accessor === "function" ? column.accessor(item) : item[column.accessor]

              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-1.5 border-b border-slate-700 last:border-0"
                >
                  <span className="text-sm font-medium text-slate-400">{column.header}</span>
                  <div className={`text-sm text-white ${column.className || ""}`}>{value as React.ReactNode}</div>
                </div>
              )
            })}
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${className}`}>
        <thead>
          <tr className="bg-slate-800">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left text-sm font-medium text-slate-300 border-b border-slate-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={String(item[keyField])} className="border-b border-slate-700 last:border-0 hover:bg-slate-800/50">
              {columns.map((column, index) => {
                const value = typeof column.accessor === "function" ? column.accessor(item) : item[column.accessor]

                return (
                  <td key={index} className={`px-4 py-3 text-sm ${column.className || ""}`}>
                    {value as React.ReactNode}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
