import { Leaf } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-primary">Eco</span>Trajet École
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Plateforme gratuite de mobilité scolaire durable pour les établissements, les parents et les élèves.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/30 font-medium">Gratuit</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-inst-blue/20 text-inst-blue-light border border-inst-blue/30 font-medium">Sécurisé</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-eco-green-dark/30 text-eco-green-light border border-eco-green-dark/30 font-medium">Écologique</span>
            </div>
          </div>

          {/* Partenaires */}
          <div>
            <h3 className="font-semibold text-sm text-white/80 uppercase tracking-wide mb-4">Partenaires</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <img 
                  src="/inspe-logo.png" 
                  alt="INSPÉ Dijon" 
                  className="w-10 h-10 object-contain bg-white rounded p-1" 
                  />
                <div>
                  <div className="text-sm font-medium text-white">INSPÉ Dijon</div>
                  <div className="text-xs text-white/50">Bourgogne-Franche-Comté</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <img 
                src="/estia-logo.png" 
                alt="ESTIA Bidart" 
                className="w-10 h-10 object-contain bg-white rounded p-1" 
                  />
                <div>
                  <div className="text-sm font-medium text-white">ESTIA Bidart</div>
                  <div className="text-xs text-white/50">École d&apos;ingénieurs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Liens */}
          <div>
            <h3 className="font-semibold text-sm text-white/80 uppercase tracking-wide mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/#principe" className="hover:text-white transition-colors">Le principe</a></li>
              <li><a href="/#pour-qui" className="hover:text-white transition-colors">Pour qui ?</a></li>
              <li><a href="/connexion" className="hover:text-white transition-colors">Connexion</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            © 2025 Traj'École — Projet pédagogique — maquette
          </p>
          <p className="text-xs text-white/40">
            Développé en partenariat avec l&apos;INSPÉ Dijon & l&apos;ESTIA Bidart
          </p>
        </div>
      </div>
    </footer>
  )
}
