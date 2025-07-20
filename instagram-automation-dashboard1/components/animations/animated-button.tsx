"use client"

import { motion } from "framer-motion"
import type { ButtonHTMLAttributes } from "react"
import { Button } from "@/components/ui/button"

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export function AnimatedButton({ children, variant = "default", size = "default", ...props }: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
      <Button variant={variant} size={size} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}
