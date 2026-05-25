'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Settings,
  Building,
  Bell,
  Shield,
  Database,
  Mail,
  Save,
  Globe,
  Clock,
} from 'lucide-react'

export default function ParametresAdminPage() {
  const [notifications, setNotifications] = useState({
    newUsers: true,
    weeklyReport: true,
    alerts: true,
  })

  const [features, setFeatures] = useState({
    covoiturage: true,
    tchat: true,
    carte: true,
    stats: true,
  })

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar profile="admin" userName="Admin" />

      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Parametres de l&apos;etablissement</h1>
            <p className="text-muted-foreground mt-1">
              Configuration generale de la plateforme
            </p>
          </div>

          {/* Infos etablissement */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Informations de l&apos;etablissement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nom-ecole">Nom de l&apos;etablissement</Label>
                <Input id="nom-ecole" defaultValue="Ecole Jules Ferry" />
              </div>
              <div>
                <Label htmlFor="adresse-ecole">Adresse</Label>
                <Input id="adresse-ecole" defaultValue="25 Avenue de la Republique, 64600 Anglet" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telephone-ecole">Telephone</Label>
                  <Input id="telephone-ecole" defaultValue="05 59 XX XX XX" />
                </div>
                <div>
                  <Label htmlFor="email-ecole">Email</Label>
                  <Input id="email-ecole" type="email" defaultValue="contact@ecole-julesferry.fr" />
                </div>
              </div>
              <div>
                <Label htmlFor="site-web">Site web</Label>
                <Input id="site-web" defaultValue="https://ecole-julesferry.fr" />
              </div>
            </CardContent>
          </Card>

          {/* Horaires */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horaires scolaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="heure-ouverture">Heure d&apos;ouverture</Label>
                  <Input id="heure-ouverture" type="time" defaultValue="08:00" />
                </div>
                <div>
                  <Label htmlFor="heure-fermeture">Heure de fermeture</Label>
                  <Input id="heure-fermeture" type="time" defaultValue="18:00" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="debut-cours">Debut des cours</Label>
                  <Input id="debut-cours" type="time" defaultValue="08:30" />
                </div>
                <div>
                  <Label htmlFor="fin-cours">Fin des cours</Label>
                  <Input id="fin-cours" type="time" defaultValue="16:30" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fonctionnalites */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Fonctionnalites actives
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Module Covoiturage</p>
                  <p className="text-sm text-muted-foreground">
                    Permet aux parents de proposer et rechercher des covoiturages
                  </p>
                </div>
                <Switch
                  checked={features.covoiturage}
                  onCheckedChange={(checked) => setFeatures({ ...features, covoiturage: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Messagerie / Tchat</p>
                  <p className="text-sm text-muted-foreground">
                    Communication entre parents et conducteurs
                  </p>
                </div>
                <Switch
                  checked={features.tchat}
                  onCheckedChange={(checked) => setFeatures({ ...features, tchat: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Carte de mobilite</p>
                  <p className="text-sm text-muted-foreground">
                    Visualisation des itineraires doux (velo, marche)
                  </p>
                </div>
                <Switch
                  checked={features.carte}
                  onCheckedChange={(checked) => setFeatures({ ...features, carte: checked })}
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Statistiques CO2</p>
                  <p className="text-sm text-muted-foreground">
                    Affichage des economies de CO2 realisees
                  </p>
                </div>
                <Switch
                  checked={features.stats}
                  onCheckedChange={(checked) => setFeatures({ ...features, stats: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notifications admin */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications administrateur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Nouveaux utilisateurs</p>
                  <p className="text-sm text-muted-foreground">
                    Recevoir une notification a chaque nouvelle inscription
                  </p>
                </div>
                <Switch
                  checked={notifications.newUsers}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newUsers: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Rapport hebdomadaire</p>
                  <p className="text-sm text-muted-foreground">
                    Recevoir un resume de l&apos;activite chaque lundi
                  </p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weeklyReport: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Alertes de securite</p>
                  <p className="text-sm text-muted-foreground">
                    Etre informe des problemes de securite potentiels
                  </p>
                </div>
                <Switch
                  checked={notifications.alerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, alerts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Securite */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Securite et confidentialite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">Conformite RGPD</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Les donnees sont stockees de maniere securisee et conformement au RGPD.
                  Les utilisateurs peuvent demander l&apos;export ou la suppression de leurs donnees.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Database className="w-4 h-4 mr-2" />
                    Exporter les donnees
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Purger les donnees inactives
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
