'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { 
  Dumbbell, 
  ArrowRight, 
  Sparkles, 
  Loader2,
  Flame,
  Users,
  Zap,
  Star,
  TrendingUp,
  Heart,
  CheckCircle2,
  Shield,
  Activity,
  Apple,
  BarChart3,
  Target,
  Award,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('onboarding_completed')
            .eq('user_id', user.id)
            .single()

          if (profile?.onboarding_completed) {
            router.push('/dashboard')
            return
          } else {
            router.push('/onboarding')
            return
          }
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Erreur:', error)
        setLoading(false)
      }
    }

    const timer = setTimeout(() => {
      checkUser()
    }, 300)

    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <Loader2 className="relative w-16 h-16 text-white animate-spin" />
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Apple,
      title: 'Nutrition IA',
      description: 'Plans repas generes par IA adaptes a tes gouts et objectifs',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10'
    },
    {
      icon: BarChart3,
      title: 'Analytics avances',
      description: 'Visualise ta progression avec des graphiques detailles',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: Activity,
      title: 'Coaching adaptatif',
      description: 'Conseils personnalises qui evoluent avec tes progres',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-x-hidden">
      
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            left: `${mousePosition.x / 30}px`,
            top: `${mousePosition.y / 30 - scrollY / 5}px`,
            transition: 'all 0.3s ease-out',
          }}
        ></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Header optimisé mobile */}
      <header className="relative z-30 backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur-md opacity-75"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-black text-white">Fitora</span>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2.5 text-white/80 hover:text-white transition-all font-semibold"
            >
              Connexion
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg"
            >
              Commencer
            </button>
          </div>

          {/* Mobile menu - Buttons horizontaux */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-white/80 text-sm font-semibold"
            >
              Connexion
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-sm font-semibold"
            >
              Commencer
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section - Optimisé mobile */}
      <section className="relative z-20 px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-xs">
              <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
              <span className="text-white/90 font-semibold">IA + Coaching personnalise</span>
            </div>
          </div>
          
          {/* Title - Responsive */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              Transforme ton corps,
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
                  Transforme ta vie
                </span>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-white/60 mb-2">
              Rejoins <span className="text-white font-bold">12 547 personnes</span>
            </p>
            <p className="text-sm sm:text-base text-white/50">qui ont atteint leurs objectifs</p>
          </div>
          
          {/* CTA Buttons - Stack sur mobile */}
          <div className="flex flex-col gap-3 max-w-md mx-auto mb-8">
            <button
              onClick={() => router.push('/signup')}
              className="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-base transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => router.push('/login')}
              className="w-full px-8 py-4 bg-white/5 backdrop-blur-xl text-white rounded-xl font-bold text-base border-2 border-white/10"
            >
              J ai deja un compte
            </button>
          </div>

          {/* Trust badges - Grid sur mobile */}
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto mb-12">
            {[
              { icon: CheckCircle2, text: 'Sans engagement', color: 'text-green-400' },
              { icon: Zap, text: 'Resultats rapides', color: 'text-yellow-400' },
              { icon: Star, text: '100% personnalise', color: 'text-purple-400' },
              { icon: Shield, text: 'Securise', color: 'text-blue-400' }
            ].map((badge, i) => (
              <div 
                key={i}
                className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full backdrop-blur-sm border border-white/10 text-xs"
              >
                <badge.icon className={`w-3 h-3 ${badge.color}`} />
                <span className="text-white/70">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Stats Cards - Stack sur mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Flame, value: '1.2M', label: 'Calories brulees', gradient: 'from-orange-500 to-red-500' },
              { icon: Users, value: '12.5k', label: 'Utilisateurs actifs', gradient: 'from-purple-500 to-pink-500' },
              { icon: TrendingUp, value: '45k', label: 'Seances', gradient: 'from-cyan-500 to-blue-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-black mb-1 bg-gradient-to-br ${stat.gradient} text-transparent bg-clip-text`}>
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Simplifié mobile */}
      <section className="relative z-20 py-16 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              Tout ce dont tu as besoin
            </h2>
            <p className="text-base text-white/60">
              Des outils puissants pour ta transformation
            </p>
          </div>

          <div className="grid gap-4 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Compact mobile */}
      <section className="relative z-20 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Pret a commencer ?
            </h2>
            <p className="text-base text-white/70 mb-6">
              Rejoins la communaute des aujourd hui
            </p>
            
            <button
              onClick={() => router.push('/signup')}
              className="w-full sm:inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-2xl"
            >
              <Sparkles className="w-5 h-5" />
              Creer mon compte gratuit
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-white/50 text-xs mt-4">
              Sans carte bancaire • Annule a tout moment
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Compact mobile */}
      <footer className="relative z-20 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black text-white">Fitora</span>
          </div>
          <div className="text-white/50 text-xs">
            © 2025 Fitora. Tous droits reserves.
          </div>
        </div>
      </footer>

      {/* CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.2; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}