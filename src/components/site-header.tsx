import { Link } from '@tanstack/react-router'
import { ModeToggle } from "@/components/mode-toggle"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GraduationCap, Menu } from "lucide-react"
import { useState } from 'react'

const navigationItems = [
  { name: 'Calculator', to: '/' },
  { name: 'About', to: '/about' },
]

function SiteLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
      <GraduationCap className="h-6 w-6" />
      <span className="whitespace-nowrap">Monash Grades</span>
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 font-medium">
                <SheetClose asChild>
                  <SiteLogo />
                </SheetClose>
                {navigationItems.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      className="text-muted-foreground hover:text-foreground/70 [&.active]:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Mobile Logo (centered) */}
          <div className="md:hidden flex-1 flex justify-center">
            <SiteLogo />
          </div>

          {/* Right side items */}
          <nav className="flex items-center gap-1">
            <Button asChild variant="outline" size="icon">
              <a
                href="https://github.com/ligsnf/monash-grades-calculator"
                target="_blank"
                rel="noreferrer"
              >
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