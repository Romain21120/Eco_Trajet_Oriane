'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Save,
  Camera,
  Users,
  Plus,
  Trash2,
} from 'lucide-react'

const enfants = [
  { id: '1', prenom: 'Lucas', classe: 'CM1', ecole: 'Ecole Jules Ferry' },
  { id: '2', prenom: 'Emma', classe: 'CE2', ecole: 'Ecole Jules Ferry' },
]

export default function ParametresParentPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: true,
  })

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar profile="parent" userName="Jean Martin" />

      <main className="flex-1 p-6 lg:p-8">
        <div className="max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Parametres</h1>
            <p className="text-muted-foreground mt-1">
              Gerez votre profil et vos enfants
            </p>
          </div>

          {/* Profil */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-2xl font-semibold text-secondary">
                  JM
                </div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Changer la photo
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prenom">Prenom</Label>
                  <Input id="prenom" defaultValue="Jean" />
                </div>
                <div>
                  <Label htmlFor="nom">Nom</Label>
                  <Input id="nom" defaultValue="Martin" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input id="email" type="email" defaultValue="jean.martin@email.com" />
              </div>

              <div>
                <Label htmlFor="telephone">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telephone
                </Label>
                <Input id="telephone" type="tel" defaultValue="06 98 76 54 32" />
              </div>

              <div>
                <Label htmlFor="adresse">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Adresse
                </Label>
                <Input id="adresse" defaultValue="15 Rue des Lilas, 64600 Anglet" />
              </div>
            </CardContent>
          </Card>

          {/* Enfants */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Mes enfants
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un enfant
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {enfants.map((enfant) => (
                <div
                  key={enfant.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {enfant.prenom[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{enfant.prenom}</p>
                      <p className="text-sm text-muted-foreground">
                        {enfant.classe} - {enfant.ecole}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Notifications par email</p>
                  <p className="text-sm text-muted-foreground">
                    Confirmations de covoiturage et mises a jour
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Notifications push</p>
                  <p className="text-sm text-muted-foreground">
                    Alertes en temps reel (depart, arrivee)
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Notifications SMS</p>
                  <p className="text-sm text-muted-foreground">
                    SMS pour les urgences et changements de derniere minute
                  </p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, sms: checked })
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
                Securite
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label htmlFor="password-confirm">Confirmer le mot de passe</Label>
                <Input id="password-confirm" type="password" placeholder="••••••••" />
              </div>
              <Button variant="outline">Changer le mot de passe</Button>
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
