import { Home, Pizza, UtensilsCrossed } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-8">
        <Pizza className="hidden h-6 w-6 md:block" />
        <Separator orientation="vertical" className="hidden h-6 md:block" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            <span className="hidden md:block">Início</span>
          </NavLink>
          <NavLink to="orders/">
            <UtensilsCrossed className="h-4 w-4" />
            <span className="hidden md:block">Pedidos</span>
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
