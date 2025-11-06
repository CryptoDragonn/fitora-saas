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
  Clock,
  Award,
  Target,
  Activity,
  Apple,
  BarChart3,
  ChevronRight
} from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

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
          } else {
            router.push('/onboarding')
          }
        } else {
          setLoading(false)
        }
      } catch (error) {
        console.error('Erreur:', error)
        setLoading(false)
      }
    }

    checkUser()
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
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
    },
    {
      icon: Target,
      title: 'Objectifs precis',
      description: 'Definis et atteins tes objectifs etape par etape',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/10 to-red-500/10'
    },
    {
      icon: Award,
      title: 'Recompenses',
      description: 'Gagne des badges en accomplissant tes defis',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10'
    },
    {
      icon: Shield,
      title: 'Securite totale',
      description: 'Tes donnees sont protegees et privees',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-500/10 to-purple-500/10'
    }
  ]

  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Perdu 15kg en 3 mois',
      image: '👩',
      text: 'Incroyable ! Les plans nutrition IA sont vraiment personnalises. J ai atteint mes objectifs plus vite que prevu.',
      rating: 5
    },
    {
      name: 'Thomas B.',
      role: 'Prise de masse reussie',
      image: '👨',
      text: 'L interface est intuitive et le suivi est excellent. Je recommande a 100%',
      rating: 5
    },
    {
      name: 'Sophie M.',
      role: 'Transformation complete',
      image: '👩‍🦰',
      text: 'Le coaching adaptatif m a aide a rester motivee. Les resultats sont la !',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      
      {/* Animated background with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            left: `${mousePosition.x / 30}px`,
            top: `${mousePosition.y / 30 - scrollY / 5}px`,
            transition: 'all 0.3s ease-out',
          }}
        ></div>
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="absolute top-1/3 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Mesh grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMTAgNjAgTSAwIDEwIEwgNjAgMTAgTSAyMCAwIEwgMjAgNjAgTSAwIDIwIEwgNjAgMjAgTSAzMCAwIEwgMzAgNjAgTSAwIDMwIEwgNjAgMzAgTSA0MCAwIEwgNDAgNjAgTSAwIDQwIEwgNjAgNDAgTSA1MCAwIEwgNTAgNjAgTSAwIDUwIEwgNjAgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIG9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      {/* Header with glassmorphism */}
      <header className="relative z-30 backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
            </div>
            <span className="text-3xl font-black text-white tracking-tight">Fitora</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/login')}
              className="px-6 py-2.5 text-white/80 hover:text-white transition-all font-semibold hover:scale-105"
            >
              Connexion
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="group relative px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl transition-all font-semibold overflow-hidden shadow-lg shadow-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative">Commencer</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-20 container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:border-white/20 transition-all cursor-default hover:scale-105">
              <div className="relative">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              </div>
              <span className="text-white/90 text-sm font-semibold">IA + Coaching personnalise</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-150"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-300"></div>
              </div>
            </div>
          </div>
          
          {/* Main Title */}
          <div className="text-center mb-10">
            <h1 
              className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              Transforme ton corps,
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-3xl opacity-50 animate-pulse-slow"></span>
                <span className="relative bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">
                  Transforme ta vie
                </span>
              </span>
            </h1>
            
            <p className="text-2xl sm:text-3xl text-white/60 mb-4 font-light animate-fade-in">
              Rejoins{' '}
              <span className="relative inline-block group cursor-default">
                <span className="text-white font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                  12 547 personnes
                </span>
                <svg className="absolute -bottom-1 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity" height="4" viewBox="0 0 200 4" fill="none">
                  <path d="M0 2C60 2 140 2 200 2" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </p>
            <p className="text-xl text-white/50">qui ont atteint leurs objectifs</p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => router.push('/signup')}
              className="group relative px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-purple-500/50 overflow-hidden hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center gap-3">
                <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            
            <button
              onClick={() => router.push('/login')}
              className="group px-10 py-5 bg-white/5 backdrop-blur-xl hover:bg-white/10 text-white rounded-2xl font-bold text-lg transition-all border-2 border-white/10 hover:border-white/30 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-pink-400 group-hover:scale-125 transition-transform" />
                </div>
                Voir comment ca marche
              </div>
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-sm mb-20">
            {[
              { icon: CheckCircle2, text: 'Sans engagement', color: 'text-green-400' },
              { icon: Zap, text: 'Resultats rapides', color: 'text-yellow-400' },
              { icon: Star, text: '100% personnalise', color: 'text-purple-400' },
              { icon: Shield, text: 'Donnees securisees', color: 'text-blue-400' }
            ].map((badge, i) => (
              <div 
                key={i}
                className="group flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all cursor-default hover:scale-110"
              >
                <badge.icon className={`w-4 h-4 ${badge.color} group-hover:scale-125 transition-transform`} />
                <span className="group-hover:text-white transition-colors">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Flame, value: '1 250 847', label: 'Calories brulees', gradient: 'from-orange-500 to-red-500', bg: 'from-orange-500/10 to-red-500/10' },
              { icon: Users, value: '12 547', label: 'Utilisateurs actifs', gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-500/10 to-pink-500/10' },
              { icon: TrendingUp, value: '45 821', label: 'Seances completees', gradient: 'from-cyan-500 to-blue-500', bg: 'from-cyan-500/10 to-blue-500/10' }
            ].map((stat, i) => (
              <div 
                key={i}
                className="group relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform-gpu hover:scale-105 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                        <div className={`relative w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                          <stat.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-5xl font-black mb-2">
                        <span className={`bg-gradient-to-br ${stat.gradient} text-transparent bg-clip-text`}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="text-white/60 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-20 py-32 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70 text-sm font-semibold">Fonctionnalites</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Tout ce dont tu as besoin
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Des outils puissants pour transformer ton corps et ta sante
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-4">{feature.description}</p>
                  <div className="flex items-center text-white/40 group-hover:text-white/60 transition-colors text-sm font-semibold">
                    <span>En savoir plus</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-20 py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white/70 text-sm font-semibold">Temoignages</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4">
              Ils ont reussi leur transformation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-white/60 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-20 py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-50"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-black text-white mb-6">
                Pret a commencer ?
              </h2>
              <p className="text-2xl text-white/70 mb-10">
                Rejoins la communaute et transforme-toi des aujourd hui
              </p>
              
              <button
                onClick={() => router.push('/signup')}
                className="group inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-2xl font-bold text-xl transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
              >
                <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                Creer mon compte gratuit
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <p className="text-white/50 text-sm mt-6">
                Aucune carte bancaire requise • Annule a tout moment • Donnees securisees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-white">Fitora</span>
            </div>
            
            <div className="text-white/50 text-sm text-center">
              © 2025 Fitora. Tous droits reserves.
            </div>
            
            <div className="flex items-center gap-6 text-white/50 text-sm">
              <a href="#" className="hover:text-white transition-colors">Confidentialite</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  )
}