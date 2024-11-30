import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { SiteHeader } from "@/components/site-header"

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  ),
})