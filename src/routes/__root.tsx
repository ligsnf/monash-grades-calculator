import React from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { SiteHeader } from "@/components/site-header"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "@/components/ui/sonner";

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

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-4 md:py-6">
          <Outlet />
        </div>
      </main>
      <Toaster closeButton richColors position="top-center" />
      <ScrollToTop minHeight={100} scrollTo={0} className="right-4 bottom-4 md:right-8 md:bottom-8 lg:right-12 lg:bottom-12" />
      <React.Suspense>
        <TanStackRouterDevtools />
      </React.Suspense>
    </div>
  )
}
      
export const Route = createRootRoute({
  component: RootLayout,
})