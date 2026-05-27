'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Leaf, Footprints, Bike, Zap, Car, MapPin, Users, Filter, ChevronLeft, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FilterMode = 'tous' | 'pied' | 'velo' | 'trottinette' 

const modeFilters: { id: FilterMode; label: string; icon: React.ElementType; color: string; activeColor: string }[] = [
  { id: 'tous', label: 'Tous', icon: Filter, color: 'bg-muted text-muted-foreground', activeColor: 'bg-foreground text-white' },
  { id: 'pied', label: 'À pied', icon: Footprints, color: 'bg-muted text-muted-foreground', activeColor: 'bg-primary text-white' },
  { id: 'velo', label: 'Vélo', icon: Bike, color: 'bg-muted text-muted-foreground', activeColor: 'bg-secondary text-white' },
  { id: 'trottinette', label: 'Trottinette', icon: Zap, color: 'bg-muted text-muted-foreground', activeColor: 'bg-amber-500 text-white' },
  { id: 'voiture', label: 'Voiture', icon: Car, color: 'bg-muted text-muted-foreground', activeColor: 'bg-rose-500 text-white' },
]

const chemins = [
  { id: 1, nom: 'Rue des Roses → Lycée', mode: 'pied' as FilterMode, eleves: 8, distance: '1.2 km', temps: '15 min', populaire: true },
  { id: 2, nom: 'Avenue Foch → Lycée', mode: 'velo' as FilterMode, eleves: 5, distance: '2.4 km', temps: '10 min', populaire: true },
  { id: 3, nom: 'Boulevard Nord → Lycée', mode: 'trottinette' as FilterMode, eleves: 4, distance: '1.8 km', temps: '9 min', populaire: false },
  { id: 4, nom: 'Quartier Est → Lycée', mode: 'voiture' as FilterMode, eleves: 12, distance: '5.2 km', temps: '12 min', populaire: true },
  { id: 5, nom: 'Résidence des Pins → Lycée', mode: 'pied' as FilterMode, eleves: 3, distance: '0.9 km', temps: '11 min', populaire: false },
  { id: 6, nom: 'Parc des Sports → Lycée', mode: 'velo' as FilterMode, eleves: 6, distance: '3.1 km', temps: '13 min', populaire: false },
]

const modeColorMap: Record<FilterMode, string> = {
  tous: '#64748b',
  pied: '#16a34a',
  velo: '#1d4ed8',
  trottinette: '#d97706',
  voiture: '#e11d48',
}

const modeStrokeMap: Record<FilterMode, string> = {
  tous: '#64748b',
  pied: '#22c55e',
  velo: '#3b82f6',
  trottinette: '#f59e0b',
  voiture: '#f43f5e',
}

// Itinéraires SVG fictifs
const svgPaths: { mode: FilterMode; points: string; label: string; x: number; y: number }[] = [
  { mode: 'pied', points: '30,170 30,120 80,120 80,60 200,60 320,60', label: 'Rue des Roses', x: 120, y: 55 },
  { mode: 'velo', points: '370,170 370,120 200,120 200,60 320,60', label: 'Av. Foch', x: 290, y: 115 },
  { mode: 'trottinette', points: '200,190 200,120 320,120 320,60', label: 'Bd Nord', x: 260, y: 115 },
  { mode: 'voiture', points: '30,30 80,30 80,60 200,60 320,60', label: 'Quartier Est', x: 150, y: 25 },
  { mode: 'pied', points: '30,70 80,70 80,60 200,60 320,60', label: 'Résidence Pins', x: 100, y: 65 },
  { mode: 'velo', points: '370,30 370,60 320,60', label: 'Parc Sports', x: 345, y: 42 },
]

export default function CartePage() {
  const [activeFilter, setActiveFilter] = useState<FilterMode>('tous')
  const [selectedPath, setSelectedPath] = useState<number | null>(null)

  const filteredChemins = activeFilter === 'tous' ? chemins : chemins.filter((c) => c.mode === activeFilter)
  const filteredPaths = activeFilter === 'tous' ? svgPaths : svgPaths.filter((p) => p.mode === activeFilter)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar carte */}
      <aside className="hidden md:flex w-72 flex-col bg-white border-r border-border">
        {/* Header */}
        <div className="px-4 h-16 flex items-center gap-3 border-b border-border">
          <Link href="/" className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Retour">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm">
              <span className="text-primary">Eco</span>Trajet École
            </span>
          </div>
        </div>

        <div className="p-4 border-b border-border">
          <h1 className="font-bold text-base mb-1">Carte mobilité douce</h1>
          <p className="text-xs text-muted-foreground">Lycée Jean Moulin — Dijon</p>
        </div>

        {/* Filtres */}
        <div className="p-4 border-b border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Filtres</div>
          <div className="flex flex-wrap gap-2">
            {modeFilters.map((f) => {
              const Icon = f.icon
              const active = activeFilter === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                    active ? f.activeColor + ' border-transparent' : 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Chemins populaires */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Chemins ({filteredChemins.length})
          </div>
          {filteredChemins.map((c) => {
            const ModeIcon = modeFilters.find((f) => f.id === c.mode)?.icon ?? MapPin
            return (
              <div
                key={c.id}
                className={cn(
                  'p-3 rounded-xl border cursor-pointer transition-all',
                  selectedPath === c.id ? 'border-primary bg-eco-green-light/20' : 'border-border bg-card hover:border-primary/40'
                )}
                onClick={() => setSelectedPath(selectedPath === c.id ? null : c.id)}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: modeColorMap[c.mode] + '25', color: modeColorMap[c.mode] }}
                    >
                      <ModeIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold leading-tight">{c.nom}</span>
                  </div>
                  {c.populaire && (
                    <span className="shrink-0 text-[10px] px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded-full font-medium border border-amber-200">
                      Populaire
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.distance}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.temps}</span>
                  <span className="flex items-center gap-1 font-medium text-primary"><Users className="w-3 h-3" />{c.eleves} élèves</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Nav */}
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/dashboard/parent">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <ChevronLeft className="w-3.5 h-3.5" />
              Mon tableau de bord
            </Button>
          </Link>
        </div>
      </aside>

      {/* Carte principale */}
      <main className="flex-1 flex flex-col">
        {/* Topbar mobile */}
        <div className="md:hidden px-4 h-14 bg-white border-b border-border flex items-center gap-3">
          <Link href="/" aria-label="Retour">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold">Carte mobilité</h1>
          <div className="ml-auto flex gap-1 overflow-x-auto">
            {modeFilters.map((f) => {
              const Icon = f.icon
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={cn('p-2 rounded-lg shrink-0', activeFilter === f.id ? f.activeColor : 'bg-muted text-muted-foreground')}
                  aria-label={f.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              )
            })}
          </div>
        </div>

        {/* Map zone */}
        <div className="flex-1 relative bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 500 400"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Fond */}
            <rect width="500" height="400" fill="#f1f5f9" />

            {/* Zones pâles */}
            <rect x="0" y="0" width="130" height="400" fill="#e8f5e9" opacity="0.4" />
            <rect x="130" y="200" width="240" height="200" fill="#e3f2fd" opacity="0.3" />
            <rect x="370" y="0" width="130" height="400" fill="#fff8e1" opacity="0.4" />

            {/* Parc */}
            <ellipse cx="90" cy="90" rx="55" ry="40" fill="#bbf7d0" opacity="0.6" />
            <text x="90" y="94" textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="600">Parc</text>

            {/* Grille rues */}
            {[40, 120, 200, 280, 360, 440].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#cbd5e1" strokeWidth="2" />
            ))}
            {[60, 120, 180, 240, 300, 360].map((y) => (
              <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#cbd5e1" strokeWidth="2" />
            ))}

            {/* Routes principales */}
            <line x1="0" y1="180" x2="500" y2="180" stroke="#94a3b8" strokeWidth="4" />
            <line x1="240" y1="0" x2="240" y2="400" stroke="#94a3b8" strokeWidth="4" />
            <line x1="0" y1="300" x2="500" y2="300" stroke="#94a3b8" strokeWidth="3" />

            {/* Labels rues */}
            <text x="40" y="175" fill="#64748b" fontSize="7">Rue des Roses</text>
            <text x="250" y="90" fill="#64748b" fontSize="7" transform="rotate(90,250,90)">Avenue Foch</text>
            <text x="40" y="295" fill="#64748b" fontSize="7">Boulevard Nord</text>

            {/* Bâtiments */}
            {[
              [30, 30, 50, 40], [90, 30, 40, 35], [160, 30, 45, 40],
              [30, 210, 55, 50], [30, 320, 40, 40], [90, 320, 50, 35],
              [310, 30, 50, 40], [390, 30, 45, 35], [310, 210, 55, 45],
              [390, 210, 40, 50], [310, 320, 50, 40], [390, 320, 45, 35],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5" />
            ))}

            {/* Itinéraires colorés */}
            {filteredPaths.map((path, i) => (
              <g key={i}>
                <polyline
                  points={path.points}
                  fill="none"
                  stroke={modeStrokeMap[path.mode]}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
                <text x={path.x} y={path.y} fill={modeColorMap[path.mode]} fontSize="8" fontWeight="600">{path.label}</text>
              </g>
            ))}

            {/* Points élèves animés */}
            {filteredPaths.map((path, i) => {
              const pts = path.points.split(' ').map((p) => p.split(',').map(Number))
              const mid = pts[Math.floor(pts.length / 2)]
              return (
                <g key={`dot-${i}`}>
                  <circle cx={mid[0]} cy={mid[1]} r="8" fill={modeColorMap[path.mode]} opacity="0.2" />
                  <circle cx={mid[0]} cy={mid[1]} r="4" fill={modeColorMap[path.mode]} opacity="0.9" />
                </g>
              )
            })}

            {/* École — destination */}
            <rect x="195" y="170" width="90" height="20" rx="4" fill="#1e293b" />
            <text x="240" y="183" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">LYCÉE JEAN MOULIN</text>
            <polygon points="230,190 240,205 250,190" fill="#1e293b" />
          </svg>

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl border border-border p-3 shadow-sm">
            <div className="text-xs font-semibold mb-2 text-muted-foreground">Légende</div>
            <div className="space-y-1.5">
              {modeFilters.filter((f) => f.id !== 'tous').map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.id} className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-1.5 rounded-full" style={{ backgroundColor: modeStrokeMap[f.id as FilterMode] }} />
                    <Icon className="w-3 h-3" style={{ color: modeColorMap[f.id as FilterMode] }} />
                    {f.label}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Badge maquette */}
          <div className="absolute top-4 right-4 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5 text-xs text-amber-700 font-medium">
            Carte fictive — Maquette pédagogique
          </div>

          {/* Stat overlay */}
          <div className="absolute top-4 left-4 bg-white/95 rounded-xl border border-border p-3 shadow-sm">
            <div className="text-xs font-bold mb-2">Aujourd&apos;hui</div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="text-lg font-extrabold text-primary">47</div>
                <div className="text-[10px] text-muted-foreground">élèves</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold text-secondary">12</div>
                <div className="text-[10px] text-muted-foreground">trajets</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-extrabold text-eco-green-dark">8.2 kg</div>
                <div className="text-[10px] text-muted-foreground">CO₂ évité</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
