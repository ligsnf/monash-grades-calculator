import { createRootRoute, Outlet } from '@tanstack/react-router'
import { SiteHeader } from "@/components/site-header"
import React from 'react'

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
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </div>
  ),
})