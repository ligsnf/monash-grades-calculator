import { Link } from '@tanstack/react-router'
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { GraduationCap } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4">
          <nav className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="h-6 w-6" />
              <span className="whitespace-nowrap">Monash Grades</span>
            </Link>
            <div className="flex gap-4 text-muted-foreground font-medium">
              <Link to="/" className="[&.active]:text-foreground">
                Calculator
              </Link>
              <Link to="/about" className="[&.active]:text-foreground">
                About
              </Link>
            </div>
          </nav>
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