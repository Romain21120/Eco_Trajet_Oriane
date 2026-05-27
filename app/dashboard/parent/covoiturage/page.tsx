'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Car,
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Filter,
  Plus,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Calendar,
} from 'lucide-react'

interface Trajet {
  id: string
  conducteur: {
    nom: string
    photo: string
    telephone: string
    email: string
    note: number
    avis: number
  }
  depart: string
  arrivee: string
  horaire: string
  joursDisponibles: string[]
  placesDisponibles: number
  placesTotal: number
  distance: string
  co2Economise: string
  prix: string
  enfantsInscrits: string[]
}

const trajetsDisponibles: Trajet[] = [
  {
    id: '1',
    conducteur: {
      nom: 'Marie Dupont',
      photo: 'MD',
      telephone: '06 12 34 56 78',
      email: 'marie.dupont@email.com',
      note: 4.8,
      avis: 23,
    },
    depart: ' Rue des Lilas, Anglet',
    arrivee: 'École Jules Ferry',
    horaire: '08:15',
    joursDisponibles: ['Lun', 'Mar', 'Jeu', 'Ven'],
    placesDisponibles: 2,
    placesTotal: 4,
    distance: '3.2 km',
    co2Economise: '0.8 kg',
    prix: 'Gratuit',
    enfantsInscrits: ['Lucas (CM1)', 'Emma (CE2)'],
  },
  {
    id: '2',
    conducteur: {
      nom: 'Pierre Martin',
      photo: 'PM',
      telephone: '06 98 76 54 32',
      email: 'pierre.martin@email.com',
      note: 4.9,
      avis: 31,
    },
    depart: ' Avenue de Bayonne, Biarritz',
    arrivee: 'École Jules Ferry',
    horaire: '08:00',
    joursDisponibles: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
    placesDisponibles: 1,
    placesTotal: 3,
    distance: '4.5 km',
    co2Economise: '1.1 kg',
    prix: 'Gratuit',
    enfantsInscrits: ['Noah (CM2)', 'Jade (CM1)'],
  },
  {
    id: '3',
    conducteur: {
      nom: 'Sophie Bernard',
      photo: 'SB',
      telephone: '06 55 44 33 22',
      email: 'sophie.bernard@email.com',
      note: 5.0,
      avis: 18,
    },
    depart: ' Rue du Port, Anglet',
    arrivee: 'École Jules Ferry',
    horaire: '08:10',
    joursDisponibles: ['Lun', 'Mer', 'Ven'],
    placesDisponibles: 3,
    placesTotal: 4,
    distance: '2.8 km',
    co2Economise: '0.7 kg',
    prix: 'Gratuit',
    enfantsInscrits: ['Léo (CE1)'],
  },
  {
    id: '4',
    conducteur: {
      nom: 'Thomas Leroy',
      photo: 'TL',
      telephone: '06 11 22 33 44',
      email: 'thomas.leroy@email.com',
      note: 4.7,
      avis: 12,
    },
    depart: ' Place de la Mairie, Bidart',
    arrivee: 'École Jules Ferry',
    horaire: '07:50',
    joursDisponibles: ['Lun', 'Mar', 'Jeu'],
    placesDisponibles: 2,
    placesTotal: 4,
    distance: '6.1 km',
    co2Economise: '1.5 kg',
    prix: 'Gratuit',
    enfantsInscrits: ['Chloé (CP)', 'Hugo (CE2)'],
  },
]

const mesTrajetsInscrits = [
  {
    id: 'inscrit-1',
    conducteur: 'Marie Dupont',
    enfant: 'Lucas Martin',
    horaire: '08:15',
    jours: ['Lun', 'Mar', 'Jeu', 'Ven'],
    statut: 'confirme',
  },
]

export default function CovoituragePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTrajet, setSelectedTrajet] = useState<Trajet | null>(null)
  const [showNewTrajetForm, setShowNewTrajetForm] = useState(false)

  const filteredTrajets = trajetsDisponibles.filter(
    (t) =>
      t.conducteur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.depart.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar profile="parent" userName="Jean Martin" />

      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Covoiturage scolaire</h1>
              <p className="text-muted-foreground mt-1">
                Trouvez ou proposez un covoiturage pour les trajets vers l&apos;ecole
              </p>
            </div>
            <Button
              onClick={() => setShowNewTrajetForm(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Proposer un trajet
            </Button>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            <Leaf className="w-3 h-3 mr-1" />
            Gratuit et ecologique
          </Badge>
        </div>

        {/* Mes trajets inscrits */}
        {mesTrajetsInscrits.length > 0 && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Mes trajets inscrits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mesTrajetsInscrits.map((trajet) => (
                  <div
                    key={trajet.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-border gap-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Car className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {trajet.enfant} avec {trajet.conducteur}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Depart a {trajet.horaire} - {trajet.jours.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Confirme
                      </Badge>
                      <Button variant="outline" size="sm">
                        Voir details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou par lieu ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtres
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trajets disponibles */}
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredTrajets.map((trajet) => (
            <Card
              key={trajet.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedTrajet(trajet)}
            >
              <CardContent className="pt-6">
                {/* Conducteur */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-semibold">
                      {trajet.conducteur.photo}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{trajet.conducteur.nom}</p>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{trajet.conducteur.note}</span>
                        <span className="text-muted-foreground">({trajet.conducteur.avis} avis)</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    {trajet.prix}
                  </Badge>
                </div>

                {/* Trajet info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Depart</p>
                      <p className="font-medium text-foreground">{trajet.depart}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="text-muted-foreground">Arrivee</p>
                      <p className="font-medium text-foreground">{trajet.arrivee}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {trajet.horaire}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {trajet.placesDisponibles}/{trajet.placesTotal} places
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-primary">
                    <Leaf className="w-4 h-4" />
                    -{trajet.co2Economise} CO2
                  </div>
                </div>

                {/* Jours */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map((jour) => (
                    <span
                      key={jour}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        trajet.joursDisponibles.includes(jour)
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {jour}
                    </span>
                  ))}
                </div>

                {/* Enfants inscrits */}
                {trajet.enfantsInscrits.length > 0 && (
                  <div className="text-sm text-muted-foreground mb-4">
                    <span className="font-medium">Enfants inscrits :</span>{' '}
                    {trajet.enfantsInscrits.join(', ')}
                  </div>
                )}

                {/* Action */}
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Demander a rejoindre
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredTrajets.length === 0 && (
          <Card className="mt-6">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">Aucun trajet trouve</h3>
              <p className="text-muted-foreground mb-4">
                Essayez de modifier vos criteres de recherche ou proposez votre propre trajet.
              </p>
              <Button onClick={() => setShowNewTrajetForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Proposer un trajet
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Modal nouveau trajet */}
        {showNewTrajetForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-primary" />
                  Proposer un nouveau trajet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="depart">Point de depart</Label>
                  <Input id="depart" placeholder="Ex:  Rue des Lilas, Anglet" />
                </div>
                <div>
                  <Label htmlFor="arrivee">Ecole de destination</Label>
                  <Input id="arrivee" defaultValue="Ecole Jules Ferry" />
                </div>
                <div>
                  <Label htmlFor="horaire">Heure de depart</Label>
                  <Input id="horaire" type="time" defaultValue="08:00" />
                </div>
                <div>
                  <Label>Jours disponibles</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map((jour) => (
                      <label
                        key={jour}
                        className="flex items-center gap-2 px-3 py-1.5 border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{jour}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="places">Nombre de places disponibles</Label>
                  <Input id="places" type="number" min="1" max="6" defaultValue="2" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowNewTrajetForm(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    onClick={() => {
                      alert('Trajet propose ! (demo)')
                      setShowNewTrajetForm(false)
                    }}
                  >
                    Publier le trajet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal detail trajet */}
        {selectedTrajet && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Detail du trajet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Conducteur */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-semibold text-lg">
                    {selectedTrajet.conducteur.photo}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{selectedTrajet.conducteur.nom}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedTrajet.conducteur.note}</span>
                      <span className="text-muted-foreground text-sm">
                        ({selectedTrajet.conducteur.avis} avis)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedTrajet.conducteur.telephone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedTrajet.conducteur.email}</span>
                  </div>
                </div>

                {/* Trajet */}
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Depart</p>
                      <p className="font-medium">{selectedTrajet.depart}</p>
                    </div>
                  </div>
                  <div className="ml-1.5 border-l-2 border-dashed border-muted-foreground/30 h-4" />
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-secondary mt-1.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Arrivee</p>
                      <p className="font-medium">{selectedTrajet.arrivee}</p>
                    </div>
                  </div>
                </div>

                {/* Infos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                    <p className="font-semibold">{selectedTrajet.horaire}</p>
                    <p className="text-xs text-muted-foreground">Heure depart</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <Users className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                    <p className="font-semibold">
                      {selectedTrajet.placesDisponibles}/{selectedTrajet.placesTotal}
                    </p>
                    <p className="text-xs text-muted-foreground">Places dispo.</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg text-center">
                    <Leaf className="w-5 h-5 mx-auto text-primary mb-1" />
                    <p className="font-semibold text-primary">-{selectedTrajet.co2Economise}</p>
                    <p className="text-xs text-muted-foreground">CO2 economise</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg text-center">
                    <Calendar className="w-5 h-5 mx-auto text-green-600 mb-1" />
                    <p className="font-semibold text-green-600">{selectedTrajet.prix}</p>
                    <p className="text-xs text-muted-foreground">Participation</p>
                  </div>
                </div>

                {/* Jours */}
                <div>
                  <p className="text-sm font-medium mb-2">Jours disponibles</p>
                  <div className="flex gap-2">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map((jour) => (
                      <span
                        key={jour}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          selectedTrajet.joursDisponibles.includes(jour)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {jour}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedTrajet(null)}>
                    Fermer
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground"
                    onClick={() => {
                      alert('Demande envoyee ! (demo)')
                      setSelectedTrajet(null)
                    }}
                  >
                    Demander a rejoindre
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
