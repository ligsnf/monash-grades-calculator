import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter, createHashHistory } from '@tanstack/react-router'
import { ThemeProvider } from "@/components/theme/theme-provider"

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a hash history
const hashHistory = createHashHistory()

// Create a new router instance
const router = createRouter({ 
    routeTree,
    basepath: "/monash-grades-calculator/",
    history: hashHistory,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  )
}