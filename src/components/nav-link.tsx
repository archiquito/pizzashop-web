import type { NavLinkProps } from 'react-router'
import { NavLink as RouterNavLink, useLocation } from 'react-router'

export type NavLinkTypeProps = NavLinkProps

export function NavLink(props: NavLinkTypeProps) {
  const { pathname } = useLocation()

  return (
    <RouterNavLink
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      {...props}
    />
  )
}
