"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function RouteChangeAnimation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timeout = setTimeout(() => setIsAnimating(false), 500)
    return () => clearTimeout(timeout)
  }, [pathname, searchParams])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 z-50"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: isAnimating ? 1 : 0,
        opacity: isAnimating ? 1 : 0,
        transition: {
          duration: isAnimating ? 0.5 : 0.2,
        },
      }}
      style={{ transformOrigin: "0% 50%" }}
    />
  )
}
