"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface StaggeredListProps {
  children: ReactNode[]
  delay?: number
  staggerDelay?: number
  duration?: number
  className?: string
}

export function StaggeredList({
  children,
  delay = 0,
  staggerDelay = 0.1,
  duration = 0.5,
  className = "",
}: StaggeredListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, delay: delay + index * staggerDelay }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
