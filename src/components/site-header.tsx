import { Link } from '@tanstack/react-router';
import { siteConfig } from '@/config/site';
import { HamburgerMenu } from '@/components/hamburger-menu';
import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { GraduationCap } from 'lucide-react';

const navigationItems = [
  { name: 'Calculator', to: '/' },
  { name: 'About', to: '/about' },
];

function SiteLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-lg text-primary font-bold"
    >
      <GraduationCap className="h-6 w-6" />
      <span className="whitespace-nowrap">Monash Grades</span>
    </Link>
  );
}

export function SiteHeader() {
  const isMobile = useBreakpoint('mobile')
  const isDesktop = !isMobile

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Desktop Navigation */}
          {isDesktop && (
            <nav className="flex items-center gap-8">
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
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <>
              <HamburgerMenu items={navigationItems} />
              {/* Mobile Logo (centered) */}
              <div className="flex-1 flex justify-center">
                <SiteLogo />
              </div>
            </>
          )}

          {/* Right side items */}
          <nav className="flex items-center gap-1">
            {isDesktop && (
              <Button asChild variant="outline" size="icon">
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  <Icons.gitHub className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            )}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
