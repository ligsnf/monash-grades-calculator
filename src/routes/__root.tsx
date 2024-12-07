import { createRootRoute, Outlet } from '@tanstack/react-router'
import { SiteHeader } from "@/components/site-header"
import React from 'react'
import { ScrollToTop } from "@/components/scroll-to-top"

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-4 md:py-6">
          <Outlet />
          <ScrollToTop minHeight={20} scrollTo={0} className="right-4 bottom-4 md:right-8 md:bottom-8 lg:right-12 lg:bottom-12" />
        </div>
      </main>
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </div>
  ),
})