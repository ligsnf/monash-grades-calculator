import { Link } from '@tanstack/react-router'
import { siteConfig } from "@/config/site"
import { ModeToggle } from "@/components/theme/mode-toggle"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigationItems = [
  { name: 'Calculator', to: '/' },
  { name: 'About', to: '/about' },
]

function SiteLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-lg text-primary font-bold">
      <GraduationCap className="h-6 w-6" />
      <span className="whitespace-nowrap">Monash Grades</span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-8">
            <SiteLogo />
            <div className="flex gap-4 font-medium">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-muted-foreground hover:text-foreground/70 [&.active]:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.to} asChild>
                  <Link
                    to={item.to}
                    className="w-full cursor-pointer font-medium text-muted-foreground [&.active]:text-foreground"
                  >
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Logo (centered) */}
          <div className="sm:hidden flex-1 flex justify-center">
            <SiteLogo />
          </div>

          {/* Right side items */}
          <nav className="flex items-center gap-1">
            <Button asChild variant="outline" size="icon" className="hidden sm:flex" >
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}