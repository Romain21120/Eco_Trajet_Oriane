'use client'

import { useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  UserCheck,
  UserX,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react'

const utilisateurs = [
  {
    id: '1',
    nom: 'Claire Petit',
    email: 'claire.petit@education.gouv.fr',
    telephone: '06 12 34 56 78',
    role: 'enseignant',
    statut: 'actif',
    dateInscription: '12 Jan 2024',
    dernierAcces: '23 Mai 2025',
  },
  {
    id: '2',
    nom: 'Jean Martin',
    email: 'jean.martin@email.com',
    telephone: '06 98 76 54 32',
    role: 'parent',
    statut: 'actif',
    dateInscription: '15 Feb 2024',
    dernierAcces: '23 Mai 2025',
  },
  {
    id: '3',
    nom: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    telephone: '06 55 44 33 22',
    role: 'parent',
    statut: 'actif',
    dateInscription: '20 Mar 2024',
    dernierAcces: '22 Mai 2025',
  },
  {
    id: '4',
    nom: 'Pierre Bernard',
    email: 'pierre.bernard@education.gouv.fr',
    telephone: '06 11 22 33 44',
    role: 'enseignant',
    statut: 'actif',
    dateInscription: '5 Apr 2024',
    dernierAcces: '21 Mai 2025',
  },
  {
    id: '5',
    nom: 'Sophie Leroy',
    email: 'sophie.leroy@email.com',
    telephone: '06 77 88 99 00',
    role: 'parent',
    statut: 'inactif',
    dateInscription: '10 May 2024',
    dernierAcces: '15 Avr 2025',
  },
  {
    id: '6',
    nom: 'Thomas Garcia',
    email: 'thomas.garcia@email.com',
    telephone: '06 22 33 44 55',
    role: 'parent',
    statut: 'en_attente',
    dateInscription: '20 Mai 2025',
    dernierAcces: '-',
  },
]

const roleLabels: Record<string, string> = {
  enseignant: 'Enseignant',
  parent: 'Parent',
  admin: 'Admin',
  eleve: 'Eleve',
}

const statutLabels: Record<string, { label: string; className: string }> = {
  actif: { label: 'Actif', className: 'bg-green-100 text-green-700 border-green-200' },
  inactif: { label: 'Inactif', className: 'bg-gray-100 text-gray-700 border-gray-200' },
  en_attente: { label: 'En attente', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
}

export default function UtilisateursPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<string | null>(null)

  const filteredUsers = utilisateurs.filter((user) => {
    const matchSearch =
      user.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = !filterRole || user.role === filterRole
    return matchSearch && matchRole
  })

  const stats = {
    total: utilisateurs.length,
    enseignants: utilisateurs.filter((u) => u.role === 'enseignant').length,
    parents: utilisateurs.filter((u) => u.role === 'parent').length,
    actifs: utilisateurs.filter((u) => u.statut === 'actif').length,
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar profile="admin" userName="Admin" />

      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestion des utilisateurs</h1>
            <p className="text-muted-foreground mt-1">
              Administrez les comptes de la plateforme
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un utilisateur
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.actifs}</p>
                  <p className="text-sm text-muted-foreground">Actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.enseignants}</p>
                  <p className="text-sm text-muted-foreground">Enseignants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.parents}</p>
                  <p className="text-sm text-muted-foreground">Parents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterRole === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRole(null)}
                  className={filterRole === null ? 'bg-primary text-primary-foreground' : ''}
                >
                  Tous
                </Button>
                <Button
                  variant={filterRole === 'enseignant' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRole('enseignant')}
                  className={filterRole === 'enseignant' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Enseignants
                </Button>
                <Button
                  variant={filterRole === 'parent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterRole('parent')}
                  className={filterRole === 'parent' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Parents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users table */}
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Statut</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Dernier acces</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const statut = statutLabels[user.statut]
                    return (
                      <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-semibold">
                              {user.nom
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{user.nom}</p>
                              <p className="text-sm text-muted-foreground">
                                Inscrit le {user.dateInscription}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <span>{user.telephone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="border-secondary/30 text-secondary">
                            {roleLabels[user.role]}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={statut.className}>{statut.label}</Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{user.dernierAcces}</td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
