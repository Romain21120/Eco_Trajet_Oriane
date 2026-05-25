'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Leaf, Eye, EyeOff, Info, GraduationCap, Users, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type Profile = 'enseignant' | 'parent' | 'admin'

const profiles: { id: Profile; label: string; desc: string; icon: React.ElementType; redirect: string }[] = [
  {
    id: 'enseignant',
    label: 'Enseignant',
    desc: 'Proposez des trajets, covoiturez avec les familles',
    icon: GraduationCap,
    redirect: '/dashboard/enseignant',
  },
  {
    id: 'parent',
    label: 'Parent / Élève',
    desc: 'Réservez des places, suivez les trajets de vos enfants',
    icon: Users,
    redirect: '/dashboard/parent',
  },
  {
    id: 'admin',
    label: 'Administration',
    desc: 'Gérez l\'établissement, les utilisateurs et les statistiques',
    icon: Building2,
    redirect: '/dashboard/admin',
  },
]

export default function ConnexionPage() {
  const router = useRouter()
  const [selectedProfile, setSelectedProfile] = useState<Profile>('parent')
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const redirect = profiles.find((p) => p.id === selectedProfile)?.redirect ?? '/'
    setTimeout(() => router.push(redirect), 800)
  }

  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-border px-4 h-16 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">
            <span className="text-primary">Traj'</span>
            <span className="text-secondary"> École</span>
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold mb-1">Connexion</h1>
              <p className="text-sm text-muted-foreground">
                Accédez à votre espace Traj'École
              </p>
            </div>

            {/* Simulation banner */}
            <div className="flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Maquette pédagogique</strong> — L&apos;authentification est simulée. Aucune donnée réelle n&apos;est transmise.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Choix profil */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">Votre profil</Label>
                <div className="grid grid-cols-1 gap-2">
                  {profiles.map((p) => {
                    const Icon = p.icon
                    const active = selectedProfile === p.id
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedProfile(p.id)}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
                          active
                            ? 'border-primary bg-eco-green-light/30 ring-1 ring-primary'
                            : 'border-border bg-muted/30 hover:bg-muted'
                        )}
                      >
                        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', active ? 'bg-primary text-white' : 'bg-muted text-muted-foreground')}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={cn('text-sm font-semibold', active ? 'text-primary' : 'text-foreground')}>{p.label}</div>
                          <div className="text-xs text-muted-foreground">{p.desc}</div>
                        </div>
                        {active && (
                          <div className="ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Identifiant */}
              <div className="space-y-1.5">
                <Label htmlFor="identifiant" className="text-sm font-semibold">
                  Identifiant établissement
                </Label>
                <Input
                  id="identifiant"
                  type="text"
                  placeholder="ex. lycee-jean-moulin-2025"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              {/* Mot de passe */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-eco-green-dark font-semibold rounded-xl h-11"
                disabled={loading}
              >
                {loading ? 'Connexion en cours…' : 'Se connecter'}
              </Button>
            </form>
          </div>

          {/* Partners */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-6 h-6 bg-secondary rounded flex items-center justify-center text-white text-[10px] font-bold">IN</div>
              INSPÉ Dijon
            </div>
            <span className="text-border">·</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-[10px] font-bold">ES</div>
              ESTIA Bidart
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Projet pédagogique — maquette
          </p>

          <p className="text-center mt-4">
            <Link href="/" className="text-sm text-primary hover:underline font-medium">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
