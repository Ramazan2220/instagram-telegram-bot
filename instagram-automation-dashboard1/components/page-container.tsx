"use client"

import type { ReactNode } from "react"
import SidebarNavigation from "@/components/sidebar-navigation"
import MobileHeader from "@/components/mobile-header"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { useMobile } from "@/hooks/use-mobile"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"

interface PageContainerProps {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
  centerContent?: boolean
}

export default function PageContainer({
  title,
  description,
  children,
  actions,
  centerContent = false,
}: PageContainerProps) {
  const isMobile = useMobile()

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-900">
        <MobileHeader title={title} />
        <PageTransition className="flex-1 px-3 py-3 pb-20">
          {description && (
            <FadeIn delay={0.1}>
              <p className="text-sm text-slate-400 mb-4">{description}</p>
            </FadeIn>
          )}
          {actions && (
            <FadeIn delay={0.2} className="mb-4">
              {actions}
            </FadeIn>
          )}
          <div className={centerContent ? "flex flex-col items-center justify-center" : ""}>
            <div className={centerContent ? "w-full max-w-md" : "w-full"}>{children}</div>
          </div>
        </PageTransition>
        <MobileBottomNav />
      </div>
    )
  }

  return (
    <SidebarNavigation>
      <PageTransition className="flex flex-col h-full min-h-[calc(100vh-80px)]">
        <div className="flex justify-between items-center mb-6">
          <div>
            <FadeIn>
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </h1>
            </FadeIn>
            {description && (
              <FadeIn delay={0.1}>
                <p className="text-lg text-slate-300">{description}</p>
              </FadeIn>
            )}
          </div>
          {actions && <FadeIn delay={0.2}>{actions}</FadeIn>}
        </div>

        <div className={`flex-1 ${centerContent ? "flex flex-col items-center justify-center" : ""}`}>
          <div className={centerContent ? "w-full max-w-4xl" : "w-full"}>{children}</div>
        </div>
      </PageTransition>
    </SidebarNavigation>
  )
}
