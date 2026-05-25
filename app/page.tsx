import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import {
  Car,
  Footprints,
  Leaf,
  Shield,
  Euro,
  Users,
  GraduationCap,
  Baby,
  BookOpen,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'

const features = [
  {
    icon: Car,
    title: 'Covoiturage scolaire',
    desc: 'Organisez des trajets partagés entre parents et enseignants pour réduire le nombre de voitures devant l\'école.',
    color: 'bg-inst-blue-light/40 text-secondary',
  },
  {
    icon: Footprints,
    title: 'Mobilité douce',
    desc: 'Cartographiez les itinéraires à pied, à vélo ou en trottinette déjà empruntés par d\'autres élèves.',
    color: 'bg-eco-green-light text-primary',
  },
  {
    icon: Leaf,
    title: 'Réduction CO₂',
    desc: 'Mesurez et réduisez l\'empreinte carbone des trajets domicile-école avec des statistiques claires.',
    color: 'bg-eco-green-light text-eco-green-dark',
  },
  {
    icon: Shield,
    title: 'Sécurité des élèves',
    desc: 'Aucun enfant ne rentre seul. Visualisez les chemins sécurisés et le groupe d\'élèves qui passe par votre rue.',
    color: 'bg-inst-blue-light/40 text-secondary',
  },
  {
    icon: Euro,
    title: '100 % Gratuit',
    desc: 'La plateforme est entièrement gratuite pour les établissements, les parents et les élèves.',
    color: 'bg-amber-50 text-amber-700',
  },
]

const audiences = [
  {
    icon: GraduationCap,
    title: 'Établissements scolaires',
    desc: 'Gérez les adhésions, suivez les statistiques de mobilité, exportez les données du mois.',
    badge: 'Établissement partenaire',
    badgeColor: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  {
    icon: Users,
    title: 'Parents',
    desc: 'Proposez ou réservez une place en covoiturage, ou rejoignez un groupe de marche accompagnée.',
    badge: 'Sécurisé',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    icon: Baby,
    title: 'Élèves',
    desc: 'Visualisez votre trajet, vos camarades de route et accumulez votre score mobilité écologique.',
    badge: 'Écologique',
    badgeColor: 'bg-eco-green-light text-eco-green-dark border-eco-green/20',
  },
  {
    icon: BookOpen,
    title: 'Enseignants',
    desc: 'Covoiturez avec les familles, proposez des places, suivez les économies réalisées collectivement.',
    badge: 'Gratuit',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
]

const stats = [
  { value: '1 200+', label: 'Élèves inscrits' },
  { value: '47 t', label: 'CO₂ économisé' },
  { value: '320', label: 'Familles actives' },
  { value: '18', label: 'Établissements' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-foreground text-white">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.52 0.155 150) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, oklch(0.42 0.13 245) 0%, transparent 50%)`,
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-6">
                {['Gratuit', 'Sécurisé', 'Écologique'].map((b) => (
                  <span key={b} className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                    {b}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-balance mb-6">
                Des trajets scolaires{' '}
                <span className="text-primary">plus sûrs</span>,{' '}
                <span className="text-primary">plus économiques</span>{' '}
                et{' '}
                <span className="text-eco-green-light">plus écologiques</span>.
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                Traj'École connecte parents, élèves et enseignants pour organiser des trajets partagés, sécurisés et respectueux de l&apos;environnement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/#principe">
                  <Button size="lg" className="bg-primary text-white hover:bg-eco-green-dark font-semibold">
                    Découvrir la plateforme
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/connexion">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                    Connexion établissement
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative border-t border-white/10 bg-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold text-primary">{s.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Le principe ── */}
        <section id="principe" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-eco-green-light text-eco-green-dark border border-eco-green/20 mb-3">
                Comment ça marche
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-balance">
                Une mobilité scolaire repensée
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Traj'École facilite l&apos;organisation des trajets domicile-école pour toute la communauté scolaire.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pour qui ── */}
        <section id="pour-qui" className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-inst-blue-light/40 text-secondary border border-secondary/20 mb-3">
                Pour qui ?
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-balance">
                Une plateforme pour toute la communauté
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audiences.map((a) => (
                <div key={a.title} className="bg-card rounded-2xl p-6 border border-border shadow-sm flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <a.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="font-bold text-base">{a.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${a.badgeColor}`}>
                        {a.badge}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3 étapes ── */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-balance mb-4">
              Rejoindre en 3 étapes
            </h2>
            <p className="text-muted-foreground mb-12 leading-relaxed">
              Votre établissement peut rejoindre la plateforme rapidement et gratuitement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { num: '01', title: "L'établissement s'inscrit", desc: "L'administration crée un compte établissement et configure la plateforme en quelques minutes." },
                { num: '02', title: 'Les familles adhèrent', desc: 'Parents et élèves reçoivent un code d\'accès et créent leur profil en toute sécurité.' },
                { num: '03', title: 'Les trajets s\'organisent', desc: 'Covoiturage, marche, vélo — chacun choisit son mode de déplacement et son trajet.' },
              ].map((step) => (
                <div key={step.num} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center text-xl font-black mb-4">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link href="/connexion">
                <Button size="lg" className="bg-primary text-white hover:bg-eco-green-dark font-semibold">
                  Accéder à la plateforme
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Partenaires ── */}
        <section id="partenaires" className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-eco-green-light text-eco-green-dark border border-eco-green/20 mb-3">
                Partenaires académiques
              </span>
              <h2 className="text-3xl font-extrabold text-foreground">
                Un projet soutenu par l&apos;enseignement supérieur
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-2xl mx-auto">
              {[
                {
                  short: 'INSPÉ',
                  name: 'INSPÉ de Dijon',
                  sub: 'Institut National Supérieur du Professorat et de l\'Éducation — Bourgogne-Franche-Comté',
                  color: 'bg-secondary',
                },
                {
                  short: 'ESTIA',
                  name: 'ESTIA Bidart',
                  sub: 'École Supérieure des Technologies Industrielles Avancées — Pays Basque',
                  color: 'bg-primary',
                },
              ].map((p) => (
                <div key={p.name} className="flex-1 bg-card rounded-2xl border border-border p-8 flex flex-col items-center text-center shadow-sm">
                  <img
                  src={p.name.includes("INSPÉ") ? "/inspe-logo.png" : "/estia-logo.png"}
                  alt={p.name}
                  className="w-20 h-20 object-contain bg-white rounded-2xl p-2 shadow-sm mb-4"
                  />
                  <h3 className="font-bold text-base mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.sub}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-primary font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Établissement partenaire
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Leaf className="w-10 h-10 mx-auto mb-4 text-white/70" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-balance mb-4">
              Prêt à rejoindre le mouvement ?
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Rejoignez les 18 établissements et 1 200 élèves qui ont adopté une mobilité scolaire plus verte et plus sûre.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/connexion">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                  Connexion établissement
                </Button>
              </Link>
              <Link href="/#principe">
                <Button size="lg" variant="outline" className="border-white/30 text-white bg-transparent hover:bg-white/10">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
