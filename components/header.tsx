'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              <span className="text-primary">Eco</span>Trajet
              <span className="text-secondary"> École</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#principe" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Le principe
            </Link>
            <Link href="/#pour-qui" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pour qui ?
            </Link>
            <Link href="/#partenaires" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Partenaires
            </Link>
          </nav>

          {/* Actions desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/connexion">
              <Button variant="outline" size="sm">Connexion</Button>
            </Link>
            <Link href="/connexion">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-eco-green-dark">
                Rejoindre la plateforme
              </Button>
            </Link>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2 space-y-2">
          <Link href="/#principe" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Le principe</Link>
          <Link href="/#pour-qui" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Pour qui ?</Link>
          <Link href="/#partenaires" className="block py-2 text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Partenaires</Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/connexion" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">Connexion</Button>
            </Link>
            <Link href="/connexion" onClick={() => setOpen(false)}>
              <Button className="w-full bg-primary text-primary-foreground">Rejoindre</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
