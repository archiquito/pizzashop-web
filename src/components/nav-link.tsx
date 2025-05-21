import type { LinkProps } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'

export type NavLinkTypeProps = LinkProps

export function NavLink(props: NavLinkTypeProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      {...props}
    />
  )
}
