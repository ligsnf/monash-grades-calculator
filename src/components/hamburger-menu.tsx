import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

type MenuItem = {
  name: string
  to: string
}

interface HamburgerMenuProps {
  items: MenuItem[]
}

export function HamburgerMenu({ items }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {isOpen ? (
            <X strokeWidth={3} />
          ) : (
            <Menu />
          )}
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {items.map((item) => (
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
  )
}