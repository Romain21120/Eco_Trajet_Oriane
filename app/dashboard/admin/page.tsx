'use client'

import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { StatCard } from '@/components/stat-card'
import { Button } from '@/components/ui/button'
import {
  Users,
  Leaf,
  Euro,
  Navigation,
  Download,
  TrendingUp,
  GraduationCap,
  Baby,
  BookOpen,
  Bell,
  MoreVertical,
  CheckCircle2,
  Clock,
  Shield,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type FilterType = 'tous' | 'enseignants' | 'parents' | 'eleves'

const utilisateurs = [
  { nom: 'M. Thomas', role: 'enseignant' as const, email: 'thomas@lycee-jeanmoulin.fr', trajets: 23, statut: 'actif' },
  { nom: 'Mme Leclerc', role: 'parent' as const, email: 'leclerc@famille.fr', trajets: 19, statut: 'actif' },
  { nom: 'Emma Leclerc', role: 'eleve' as const, email: 'emma.leclerc@lycee-jeanmoulin.fr', trajets: 19, statut: 'actif' },
  { nom: 'M. Leroux', role: 'enseignant' as const, email: 'leroux@lycee-jeanmoulin.fr', trajets: 31, statut: 'actif' },
  { nom: 'Mme Dupont', role: 'parent' as const, email: 'dupont@famille.fr', trajets: 12, statut: 'inactif' },
  { nom: 'Lucas Moreau', role: 'eleve' as const, email: 'lucas.moreau@lycee-jeanmoulin.fr', trajets: 8, statut: 'actif' },
  { nom: 'Mme Martin', role: 'parent' as const, email: 'martin@famille.fr', trajets: 27, statut: 'actif' },
  { nom: 'M. Bernard', role: 'enseignant' as const, email: 'bernard@lycee-jeanmoulin.fr', trajets: 15, statut: 'actif' },
]

const roleConfig = {
  enseignant: { label: 'Enseignant', icon: GraduationCap, color: 'bg-secondary/10 text-secondary border-secondary/20' },
  parent: { label: 'Parent', icon: Users, color: 'bg-primary/10 text-primary border-primary/20' },
  eleve: { label: 'Élève', icon: Baby, color: 'bg-amber-50 text-amber-700 border-amber-200' },
}

const monthlyData = [
  { mois: 'Jan', trajets: 48, co2: 12.4 },
  { mois: 'Fév', trajets: 62, co2: 16.1 },
  { mois: 'Mar', trajets: 71, co2: 18.4 },
  { mois: 'Avr', trajets: 85, co2: 22.1 },
  { mois: 'Mai', trajets: 94, co2: 24.4 },
]

export default function DashboardAdminPage() {
  const [filterRole, setFilterRole] = useState<FilterType>('tous')
  const [exportDone, setExportDone] = useState(false)

  const filtered = filterRole === 'tous' ? utilisateurs : utilisateurs.filter((u) => {
    if (filterRole === 'enseignants') return u.role === 'enseignant'
    if (filterRole === 'parents') return u.role === 'parent'
    if (filterRole === 'eleves') return u.role === 'eleve'
    return true
  })

  const handleExport = () => {
    setExportDone(true)
    setTimeout(() => setExportDone(false), 2500)
  }

  const maxTrajets = Math.max(...monthlyData.map((d) => d.trajets))

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar profile="admin" userName="Direction" />

      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-border px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Administration</h1>
            <p className="text-xs text-muted-foreground">Lycée Jean Moulin — Dijon · Mai 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className={cn('gap-2 transition-all', exportDone && 'border-primary text-primary')}
            >
              {exportDone ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Download className="w-4 h-4" />}
              {exportDone ? 'Exporté !' : 'Exporter les données du mois'}
            </Button>
            <button className="relative p-2 rounded-lg hover:bg-muted" aria-label="Notifications">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center text-xs font-bold">DIR</div>
          </div>
        </header>

        <div className="p-6 space-y-8 max-w-6xl">

          {/* Statistiques globales */}
          <section>
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Statistiques établissement — Mai 2025
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Utilisateurs inscrits" value="247" icon={Users} color="blue" trend="+12 ce mois" />
              <StatCard label="Trajets proposés" value="94" icon={Navigation} color="green" trend="ce mois-ci" />
              <StatCard label="CO₂ total économisé" value="24.4" unit="kg" icon={Leaf} color="green" trend="+18% vs avril" />
              <StatCard label="Économies totales" value="312" unit="€" icon={Euro} color="amber" trend="collectivement" />
            </div>
          </section>

          {/* Répartition */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profils */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Répartition des profils
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Élèves', count: 189, total: 247, icon: Baby, color: 'bg-amber-500' },
                  { label: 'Parents', count: 42, total: 247, icon: Users, color: 'bg-primary' },
                  { label: 'Enseignants', count: 16, total: 247, icon: GraduationCap, color: 'bg-secondary' },
                ].map((p) => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <p.icon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-medium">{p.label}</span>
                      </div>
                      <span className="font-bold">{p.count}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', p.color)}
                        style={{ width: `${(p.count / p.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Évolution mensuelle */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Trajets par mois
              </h3>
              <div className="flex items-end gap-2 h-28">
                {monthlyData.map((d) => (
                  <div key={d.mois} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-primary">{d.trajets}</span>
                    <div
                      className="w-full rounded-t-md bg-primary/70 transition-all"
                      style={{ height: `${(d.trajets / maxTrajets) * 80}px` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{d.mois}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Badges récents */}
          <section>
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Indicateurs clés
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Taux de remplissage', value: '78%', sub: 'places occupées', color: 'text-primary' },
                { label: 'Élèves jamais seuls', value: '96%', sub: 'grâce aux trajets groupés', color: 'text-secondary' },
                { label: 'Satisfaction parents', value: '4.8/5', sub: '42 avis', color: 'text-amber-600' },
                { label: 'Réductions CO₂', value: '-34%', sub: 'vs trajets solo', color: 'text-eco-green-dark' },
              ].map((k) => (
                <div key={k.label} className="bg-card rounded-xl border border-border p-4 text-center">
                  <div className={cn('text-2xl font-extrabold mb-1', k.color)}>{k.value}</div>
                  <div className="text-xs font-semibold text-foreground">{k.label}</div>
                  <div className="text-xs text-muted-foreground">{k.sub}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Liste utilisateurs */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-bold text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Liste des profils ({filtered.length})
              </h2>
              <div className="flex rounded-xl overflow-hidden border border-border">
                {([
                  { id: 'tous', label: 'Tous' },
                  { id: 'enseignants', label: 'Enseignants' },
                  { id: 'parents', label: 'Parents' },
                  { id: 'eleves', label: 'Élèves' },
                ] as { id: FilterType; label: string }[]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFilterRole(t.id)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium transition-colors',
                      filterRole === t.id ? 'bg-primary text-white' : 'bg-white text-muted-foreground hover:bg-muted'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Nom</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Rôle</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Trajets</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u, i) => {
                      const cfg = roleConfig[u.role]
                      return (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                                {u.nom.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </div>
                              <span className="text-sm font-semibold">{u.nom}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border', cfg.color)}>
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 text-sm font-semibold">
                              <Navigation className="w-3.5 h-3.5 text-muted-foreground" />
                              {u.trajets}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium', u.statut === 'actif' ? 'bg-eco-green-light text-eco-green-dark' : 'bg-muted text-muted-foreground')}>
                              {u.statut === 'actif' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {u.statut === 'actif' ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" aria-label="Options">
                              <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
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
