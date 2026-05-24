'use client'

import Link from 'next/link'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { StatCard } from '@/components/stat-card'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Leaf,
  Euro,
  Star,
  Car,
  Footprints,
  Bike,
  Zap,
  Clock,
  MapPin,
  Users,
  Bell,
  ChevronRight,
  Navigation,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const voitures = [
  { conducteur: 'M. Leroux', places: 2, total: 4, heure: '07:45', depart: 'Rue des Lilas', avatar: 'ML', note: 4.9 },
  { conducteur: 'Mme Dupont', places: 1, total: 3, heure: '08:00', depart: 'Avenue Victor Hugo', avatar: 'MD', note: 5.0 },
  { conducteur: 'M. Thomas', places: 3, total: 5, heure: '08:15', depart: 'Place de la République', avatar: 'MT', note: 4.7 },
]

type ModeDouce = 'pied' | 'velo' | 'trottinette'

const modeOptions: { id: ModeDouce; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'pied', label: 'À pied', icon: Footprints, color: 'bg-eco-green-light text-eco-green-dark border-eco-green/30' },
  { id: 'velo', label: 'Vélo', icon: Bike, color: 'bg-inst-blue-light/40 text-secondary border-secondary/20' },
  { id: 'trottinette', label: 'Trottinette', icon: Zap, color: 'bg-amber-50 text-amber-700 border-amber-200' },
]

const itineraires = [
  { rue: 'Rue des Roses → Rue du Moulin', eleves: 5, distance: '1.2 km', temps: '15 min', mode: 'pied' as ModeDouce },
  { rue: 'Avenue de la Paix → Boulevard Est', eleves: 3, distance: '2.4 km', temps: '12 min', mode: 'velo' as ModeDouce },
  { rue: 'Chemin du Bois → Allée des Pins', eleves: 2, distance: '1.8 km', temps: '10 min', mode: 'trottinette' as ModeDouce },
]

export default function DashboardParentPage() {
  const [selectedMode, setSelectedMode] = useState<ModeDouce>('pied')
  const [reservedVoiture, setReservedVoiture] = useState<number | null>(null)
  const [selectedItineraire, setSelectedItineraire] = useState<number | null>(null)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar profile="parent" userName="Mme Leclerc" />

      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-border px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Mon espace famille</h1>
            <p className="text-xs text-muted-foreground">Lycée Jean Moulin — Emma Leclerc, 2nde B</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-muted" aria-label="Notifications">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center text-sm font-bold">ML</div>
          </div>
        </header>

        <div className="p-6 space-y-8 max-w-6xl">

          {/* Stats */}
          <section>
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Ce mois-ci — Mai 2025
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Trajets sécurisés" value="19" icon={Shield} color="blue" trend="ce mois-ci" />
              <StatCard label="CO₂ évité" value="12.6" unit="kg" icon={Leaf} color="green" trend="+8% vs mois dernier" />
              <StatCard label="Argent économisé" value="32" unit="€" icon={Euro} color="amber" trend="sur le carburant" />
              <StatCard label="Score mobilité" value="92" unit="/100" icon={Star} color="teal" trend="Excellent !" />
            </div>
          </section>

          {/* Covoiturage */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Covoiturage disponible — Demain matin
              </h2>
              <Button variant="outline" size="sm" className="gap-1">
                Voir tout <ChevronRight className="w-3 h-3" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {voitures.map((v, i) => {
                const reserved = reservedVoiture === i
                return (
                  <div key={i} className={cn('bg-card rounded-xl border p-5 flex flex-col gap-3 transition-all', reserved ? 'border-primary ring-1 ring-primary' : 'border-border')}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{v.avatar}</div>
                      <div>
                        <div className="font-semibold text-sm">{v.conducteur}</div>
                        <div className="flex items-center gap-1 text-xs text-amber-600">
                          <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                          {v.note}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-medium">{v.heure}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        {v.depart}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        {v.places}/{v.total} places disponibles
                      </div>
                    </div>
                    {/* Places visuelles */}
                    <div className="flex gap-1">
                      {Array.from({ length: v.total }).map((_, j) => (
                        <div key={j} className={cn('h-2 flex-1 rounded-full', j < v.total - v.places ? 'bg-muted-foreground/30' : 'bg-primary')} />
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className={cn('w-full text-xs', reserved ? 'bg-eco-green-light text-eco-green-dark border border-primary hover:bg-eco-green-light' : 'bg-primary text-white hover:bg-eco-green-dark')}
                      onClick={() => setReservedVoiture(reserved ? null : i)}
                      variant={reserved ? 'outline' : 'default'}
                    >
                      {reserved ? 'Place réservée ✓' : 'Réserver cette place'}
                    </Button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Trajet accompagné */}
          <section>
            <h2 className="font-bold text-base mb-2 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary" />
              Trajet accompagné — Mobilité douce
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Choisissez un itinéraire déjà emprunté par d&apos;autres élèves pour que votre enfant ne soit jamais seul.
            </p>

            {/* Mode selector */}
            <div className="flex gap-2 flex-wrap mb-5">
              {modeOptions.map((m) => {
                const Icon = m.icon
                const active = selectedMode === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                      active ? m.color + ' ring-1 ring-current' : 'bg-card border-border text-muted-foreground hover:bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {m.label}
                  </button>
                )
              })}
            </div>

            {/* Carte fictive */}
            <div className="rounded-2xl overflow-hidden border border-border bg-card mb-5">
              <div className="relative h-48 bg-gradient-to-br from-eco-green-light/40 to-inst-blue-light/30 overflow-hidden">
                {/* Rues fictives SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
                  {/* Grille de rues */}
                  <line x1="0" y1="60" x2="400" y2="60" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="0" y1="120" x2="400" y2="120" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="80" y1="0" x2="80" y2="200" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="200" y1="0" x2="200" y2="200" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                  <line x1="320" y1="0" x2="320" y2="200" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

                  {/* Itinéraire actif */}
                  <polyline
                    points="40,160 80,160 80,120 200,120 200,60 320,60 360,60"
                    fill="none"
                    stroke={selectedMode === 'pied' ? '#22c55e' : selectedMode === 'velo' ? '#3b82f6' : '#f59e0b'}
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="0"
                    opacity="0.9"
                  />

                  {/* Points élèves */}
                  <circle cx="120" cy="120" r="6" fill={selectedMode === 'pied' ? '#16a34a' : selectedMode === 'velo' ? '#1d4ed8' : '#d97706'} opacity="0.9" />
                  <circle cx="200" cy="90" r="6" fill={selectedMode === 'pied' ? '#16a34a' : selectedMode === 'velo' ? '#1d4ed8' : '#d97706'} opacity="0.9" />
                  <circle cx="280" cy="60" r="6" fill={selectedMode === 'pied' ? '#16a34a' : selectedMode === 'velo' ? '#1d4ed8' : '#d97706'} opacity="0.9" />

                  {/* Départ */}
                  <circle cx="40" cy="160" r="8" fill="#1e293b" />
                  <circle cx="40" cy="160" r="4" fill="white" />

                  {/* Arrivée = école */}
                  <rect x="340" y="46" width="28" height="20" rx="3" fill="#1e293b" />
                  <text x="354" y="60" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">ÉCOLE</text>
                </svg>

                {/* Légende */}
                <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                  {selectedMode === 'pied' ? '3 élèves sur ce trajet' : selectedMode === 'velo' ? '2 élèves sur ce trajet' : '1 élève sur ce trajet'}
                </div>
                <div className="absolute top-3 right-3 bg-primary/90 text-white rounded-lg px-2 py-1 text-xs font-semibold">
                  Carte fictive — maquette
                </div>
              </div>
            </div>

            {/* Liste itinéraires */}
            <div className="space-y-3">
              {itineraires.map((it, i) => {
                const ModeIcon = modeOptions.find((m) => m.id === it.mode)?.icon ?? Footprints
                const active = selectedItineraire === i
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedItineraire(active ? null : i)}
                    className={cn(
                      'bg-card rounded-xl border p-4 flex items-center gap-4 cursor-pointer transition-all',
                      active ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-primary/40'
                    )}
                  >
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', modeOptions.find((m) => m.id === it.mode)?.color ?? '')}>
                      <ModeIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{it.rue}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {it.distance} · {it.temps}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={cn('text-xs font-semibold px-2 py-1 rounded-full', 'bg-primary/10 text-primary')}>
                        {it.eleves} élèves
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">passent par ici</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
