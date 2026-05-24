'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Navigation,
  MessageSquare,
  Map,
  Settings,
  LogOut,
  Leaf,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type ProfileType = 'enseignant' | 'parent' | 'admin'

interface SidebarProps {
  profile: ProfileType
  userName?: string
}

const menuByProfile: Record<ProfileType, { href: string; label: string; icon: React.ElementType }[]> = {
  enseignant: [
    { href: '/dashboard/enseignant', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/dashboard/enseignant/trajets', label: 'Mes trajets', icon: Navigation },
    { href: '/carte', label: 'Carte mobilité', icon: Map },
    { href: '/tchat', label: 'Tchat', icon: MessageSquare },
    { href: '/dashboard/enseignant/parametres', label: 'Paramètres', icon: Settings },
  ],
  parent: [
    { href: '/dashboard/parent', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/dashboard/parent/covoiturage', label: 'Covoiturage', icon: Navigation },
    { href: '/carte', label: 'Carte mobilité', icon: Map },
    { href: '/tchat', label: 'Tchat', icon: MessageSquare },
    { href: '/dashboard/parent/parametres', label: 'Paramètres', icon: Settings },
  ],
  admin: [
    { href: '/dashboard/admin', label: 'Administration', icon: LayoutDashboard },
    { href: '/dashboard/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
    { href: '/carte', label: 'Carte mobilité', icon: Map },
    { href: '/dashboard/admin/parametres', label: 'Paramètres', icon: Settings },
  ],
}

const profileLabels: Record<ProfileType, string> = {
  enseignant: 'Enseignant',
  parent: 'Parent / Élève',
  admin: 'Administration',
}

export function DashboardSidebar({ profile, userName = 'Utilisateur' }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const menu = menuByProfile[profile]

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 bg-sidebar text-sidebar-foreground transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-sidebar-border', collapsed ? 'justify-center' : 'gap-2')}>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm">
            <span className="text-primary">Eco</span>Trajet École
          </span>
        )}
      </div>

      {/* Profile badge */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/50 uppercase tracking-wide font-medium mb-1">Connecté en tant que</div>
          <div className="font-semibold text-sm">{userName}</div>
          <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary border border-primary/30 font-medium">
            {profileLabels[profile]}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {menu.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                collapsed ? 'justify-center' : '',
                active
                  ? 'bg-primary text-white'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-sidebar-border space-y-1">
        <Link
          href="/connexion"
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors',
            collapsed ? 'justify-center' : ''
          )}
          title={collapsed ? 'Déconnexion' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </Link>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-sidebar border border-sidebar-border rounded-full flex items-center justify-center text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors shadow-sm"
        aria-label={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  )
}
