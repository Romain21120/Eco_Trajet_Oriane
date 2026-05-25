'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Car,
  Bike,
  Footprints,
  Plus,
  Calendar,
  MapPin,
  Clock,
  Leaf,
  TrendingUp,
  Edit,
  Trash2,
} from 'lucide-react'

const mesTrajets = [
  {
    id: '1',
    type: 'voiture',
    depart: 'Domicile - 12 Rue Paulmy, Bayonne',
    arrivee: 'Ecole Jules Ferry',
    horaire: '07:45',
    jours: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    distance: '5.2 km',
    co2: '1.3 kg',
    passagers: 2,
  },
  {
    id: '2',
    type: 'velo',
    depart: 'Domicile',
    arrivee: 'Ecole Jules Ferry',
    horaire: '07:30',
    jours: ['Mer'],
    distance: '5.2 km',
    co2: '0 kg',
    passagers: 0,
  },
]

const historiqueRecent = [
  { date: '23 Mai 2025', mode: 'voiture', co2: '1.3 kg', passagers: 2 },
  { date: '22 Mai 2025', mode: 'voiture', co2: '1.3 kg', passagers: 3 },
  { date: '21 Mai 2025', mode: 'velo', co2: '0 kg', passagers: 0 },
  { date: '20 Mai 2025', mode: 'voiture', co2: '1.3 kg', passagers: 2 },
  { date: '19 Mai 2025', mode: 'voiture', co2: '1.3 kg', passagers: 1 },
]

const iconByType: Record<string, React.ElementType> = {
  voiture: Car,
  velo: Bike,
  pied: Footprints,
}

export default function TrajetsPage() {
  const [trajets] = useState(mesTrajets)

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar profile="enseignant" userName="Claire Petit" />

      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mes trajets</h1>
            <p className="text-muted-foreground mt-1">
              Gerez vos trajets domicile-ecole et proposez des covoiturages
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un trajet
          </Button>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-sm text-muted-foreground">Trajets ce mois</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">42 kg</p>
                  <p className="text-sm text-muted-foreground">CO2 economise</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Car className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Covoiturages</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+15%</p>
                  <p className="text-sm text-muted-foreground">vs mois dernier</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mes trajets configures */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Trajets configures</h2>
            {trajets.map((trajet) => {
              const Icon = iconByType[trajet.type] || Car
              return (
                <Card key={trajet.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            trajet.type === 'voiture'
                              ? 'bg-secondary/10'
                              : trajet.type === 'velo'
                              ? 'bg-primary/10'
                              : 'bg-orange-100'
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              trajet.type === 'voiture'
                                ? 'text-secondary'
                                : trajet.type === 'velo'
                                ? 'text-primary'
                                : 'text-orange-600'
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground capitalize">{trajet.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {trajet.distance} - {trajet.co2} CO2
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">De:</span>
                        <span className="font-medium">{trajet.depart}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-secondary" />
                        <span className="text-muted-foreground">Vers:</span>
                        <span className="font-medium">{trajet.arrivee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Depart:</span>
                        <span className="font-medium">{trajet.horaire}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map((jour) => (
                        <span
                          key={jour}
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            trajet.jours.includes(jour)
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {jour}
                        </span>
                      ))}
                    </div>

                    {trajet.passagers > 0 && (
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {trajet.passagers} passager(s) regulier(s)
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Historique recent */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historique recent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historiqueRecent.map((item, i) => {
                  const Icon = iconByType[item.mode] || Car
                  return (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.date}</p>
                          <p className="text-xs text-muted-foreground capitalize">{item.mode}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">-{item.co2}</p>
                        {item.passagers > 0 && (
                          <p className="text-xs text-muted-foreground">{item.passagers} pass.</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
