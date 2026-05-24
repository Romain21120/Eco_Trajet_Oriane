'use client'

import Link from 'next/link'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { StatCard } from '@/components/stat-card'
import { Button } from '@/components/ui/button'
import {
  Leaf,
  Euro,
  Car,
  Star,
  Plus,
  Search,
  MessageSquare,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Navigation,
  Bell,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const trajets = [
  { heure: '07:45', conducteur: 'M. Leroux', places: 2, destination: 'Lycée Jean Moulin', distance: '4.2 km', statut: 'disponible' },
  { heure: '08:00', conducteur: 'Mme Dupont', places: 1, destination: 'Lycée Jean Moulin', distance: '3.8 km', statut: 'disponible' },
  { heure: '08:15', conducteur: 'M. Bernard', places: 3, destination: 'Lycée Jean Moulin', distance: '5.1 km', statut: 'disponible' },
  { heure: '17:30', conducteur: 'Mme Martin', places: 2, destination: 'Quartier Saint-Michel', distance: '4.5 km', statut: 'complet' },
  { heure: '17:45', conducteur: 'M. Petit', places: 1, destination: 'Quartier Nord', distance: '6.0 km', statut: 'disponible' },
]

const mesTrajets = [
  { type: 'Domicile → École', heure: '07:55', jours: 'Lun, Mar, Jeu', mode: 'conducteur', passagers: 2 },
  { type: 'École → Domicile', heure: '17:40', jours: 'Lun, Mer, Ven', mode: 'passager', conducteur: 'Mme Dupont' },
  { type: 'Réunion parents', heure: '18:30', jours: 'Mer 15 jan.', mode: 'conducteur', passagers: 3 },
]

export default function DashboardEnseignantPage() {
  const [activeTab, setActiveTab] = useState<'matin' | 'soir' | 'reunion'>('matin')
  const [reservedIds, setReservedIds] = useState<number[]>([])

  const tabs = [
    { id: 'matin' as const, label: 'Trajets matin' },
    { id: 'soir' as const, label: 'Trajets soir' },
    { id: 'reunion' as const, label: 'Réunions' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar profile="enseignant" userName="M. Thomas" />

      {/* Main */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-border px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Tableau de bord</h1>
            <p className="text-xs text-muted-foreground">Lycée Jean Moulin — Dijon</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">MT</div>
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
              <StatCard label="CO₂ économisé" value="18.4" unit="kg" icon={Leaf} color="green" trend="+12% vs mois dernier" />
              <StatCard label="Argent économisé" value="47" unit="€" icon={Euro} color="amber" trend="sur le carburant" />
              <StatCard label="Trajets partagés" value="23" icon={Car} color="blue" trend="ce mois-ci" />
              <StatCard label="Score mobilité" value="87" unit="/100" icon={Star} color="teal" trend="Excellent !" />
            </div>
          </section>

          {/* Actions rapides */}
          <section>
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary" />
              Actions rapides
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-primary text-white hover:bg-eco-green-dark gap-2">
                <Plus className="w-4 h-4" />
                Proposer une place
              </Button>
              <Button variant="outline" className="gap-2 border-secondary text-secondary hover:bg-inst-blue-light/20">
                <Search className="w-4 h-4" />
                Réserver une place
              </Button>
              <Link href="/tchat">
                <Button variant="outline" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Ouvrir le tchat
                </Button>
              </Link>
              <Link href="/carte">
                <Button variant="outline" className="gap-2">
                  <MapPin className="w-4 h-4" />
                  Voir la carte
                </Button>
              </Link>
            </div>
          </section>

          {/* Mes trajets */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                Mes trajets
              </h2>
              <div className="flex rounded-xl overflow-hidden border border-border">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={cn(
                      'px-4 py-2 text-xs font-medium transition-colors',
                      activeTab === t.id ? 'bg-primary text-white' : 'bg-white text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mesTrajets.map((t, i) => (
                <div key={i} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t.type}</span>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', t.mode === 'conducteur' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary')}>
                      {t.mode === 'conducteur' ? 'Conducteur' : 'Passager'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold mb-1">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                    {t.heure}
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">{t.jours}</div>
                  {t.mode === 'conducteur' ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      {t.passagers} passager{(t.passagers ?? 0) > 1 ? 's' : ''} à bord
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Car className="w-3.5 h-3.5" />
                      Conducteur : {t.conducteur}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tableau trajets disponibles */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Trajets disponibles
              </h2>
              <Button variant="outline" size="sm" className="gap-1">
                Voir tous <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Heure</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Conducteur</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Destination</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Distance</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Places</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trajets.map((t, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-sm font-semibold">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                            {t.heure}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{t.conducteur}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-sm">
                            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                            {t.destination}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{t.distance}</td>
                        <td className="px-4 py-3">
                          <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', t.statut === 'disponible' ? 'bg-eco-green-light text-eco-green-dark' : 'bg-muted text-muted-foreground')}>
                            {t.statut === 'disponible' ? `${t.places} place${t.places > 1 ? 's' : ''}` : 'Complet'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {t.statut === 'disponible' ? (
                            <Button
                              size="sm"
                              variant={reservedIds.includes(i) ? 'outline' : 'default'}
                              className={cn('text-xs h-7', !reservedIds.includes(i) && 'bg-primary text-white hover:bg-eco-green-dark')}
                              onClick={() => setReservedIds((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                            >
                              {reservedIds.includes(i) ? 'Réservé ✓' : 'Réserver'}
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
