'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Dumbbell, 
  Zap, 
  Target, 
  Award, 
  TrendingUp, 
  Users, 
  Star,
  Check,
  ArrowRight,
  Flame,
  Trophy,
  Activity,
  Crown,
  Sparkles,
  Play
} from 'lucide-react'

export default function HomePage() {
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [workoutsCompleted, setWorkoutsCompleted] = useState(0)

  useEffect(() => {
    const caloriesInterval = setInterval(() => {
      setCaloriesBurned(prev => prev < 1250847 ? prev + 15847 : 1250847)
    }, 50)

    const usersInterval = setInterval(() => {
      setActiveUsers(prev => prev < 12547 ? prev + 247 : 12547)
    }, 60)

    const workoutsInterval = setInterval(() => {
      setWorkoutsCompleted(prev => prev < 45821 ? prev + 821 : 45821)
    }, 55)

    return () => {
      clearInterval(caloriesInterval)
      clearInterval(usersInterval)
      clearInterval(workoutsInterval)
    }
  }, [])

  const features = [
    {
      icon: Target,
      title: 'Plans Personnalisés',
      description: 'Programme adapté à tes objectifs',
      color: 'from-purple-500 to-pink-500',
      stat: '98% de réussite'
    },
    {
      icon: Dumbbell,
      title: 'Exercices Guidés',
      description: 'Vidéos HD avec instructions',
      color: 'from-blue-500 to-cyan-500',
      stat: '500+ exercices'
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Badges et récompenses',
      color: 'from-orange-500 to-red-500',
      stat: '50+ badges'
    },
    {
      icon: Activity,
      title: 'Suivi Nutrition',
      description: 'Plans repas équilibrés',
      color: 'from-green-500 to-emerald-500',
      stat: '1000+ recettes'
    }
  ]

  const testimonials = [
    {
      name: 'Sophie M.',
      result: '-12kg en 3 mois',
      text: 'Fitora a changé ma vie ! Les plans sont super clairs.',
      avatar: '👩',
      rating: 5
    },
    {
      name: 'Thomas B.',
      result: '+8kg de muscle',
      text: 'Programme de musculation au top !',
      avatar: '👨',
      rating: 5
    },
    {
      name: 'Laura K.',
      result: '-15kg en 4 mois',
      text: 'Interface intuitive, je recommande !',
      avatar: '👩',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <Dumbbell className="w-16 h-16 text-purple-400" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-ping" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Fitora
            </h1>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Transforme ton corps,
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Transforme ta vie
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Rejoins <span className="text-purple-400 font-bold">{activeUsers.toLocaleString()}</span> personnes qui ont atteint leurs objectifs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/dashboard"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10 animate-pulse"></div>
            </Link>

            <button className="px-8 py-4 border-2 border-purple-400 rounded-full font-bold text-lg hover:bg-purple-400/10 transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Voir la démo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-105">
              <Flame className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <p className="text-4xl font-black text-purple-400 mb-2">{caloriesBurned.toLocaleString()}</p>
              <p className="text-gray-400">Calories brûlées</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all hover:scale-105">
              <Users className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <p className="text-4xl font-black text-pink-400 mb-2">{activeUsers.toLocaleString()}</p>
              <p className="text-gray-400">Utilisateurs actifs</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all hover:scale-105">
              <Trophy className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-4xl font-black text-blue-400 mb-2">{workoutsCompleted.toLocaleString()}</p>
              <p className="text-gray-400">Séances complétées</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              Pourquoi choisir <span className="text-purple-400">Fitora</span> ?
            </h2>
            <p className="text-xl text-gray-400">Tout ce dont tu as besoin pour réussir</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <p className="text-sm font-semibold text-purple-400">{feature.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4">
              Ils ont réussi avec <span className="text-purple-400">Fitora</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-purple-400 font-semibold">{testimonial.result}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-5xl font-black mb-4">
              Un seul plan. <span className="text-purple-400">Tout inclus.</span>
            </h2>
          </div>

          <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl hover:scale-105 transition-all">
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-sm animate-bounce">
              🔥 -50% Offre Launch
            </div>

            <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            
            <h3 className="text-4xl font-black mb-4">Fitora Premium</h3>
            
            <div className="mb-8">
              <div className="text-6xl font-black mb-2">
                9,99€
                <span className="text-2xl text-purple-200">/mois</span>
              </div>
              <p className="text-purple-200 line-through text-xl">19,99€/mois</p>
            </div>

            <ul className="space-y-4 mb-10 text-left max-w-md mx-auto">
              {[
                'Plans personnalisés illimités',
                'Suivi nutrition complet',
                '500+ exercices vidéo HD',
                'Badges gamifiés',
                'Support prioritaire 24/7'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-6 h-6 flex-shrink-0 text-yellow-400" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard"
              className="inline-block px-12 py-5 bg-white text-purple-600 rounded-full font-black text-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
            >
              Commencer maintenant 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-6 leading-tight">
            Prêt à devenir la <span className="text-purple-400">meilleure version</span> de toi-même ?
          </h2>
          
          <Link
            href="/dashboard"
            className="inline-block group relative px-16 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-black text-2xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
          >
            <span className="flex items-center gap-3">
              Rejoins Fitora maintenant 🚀
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity -z-10 animate-pulse"></div>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Dumbbell className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-black">Fitora</span>
          </div>
          
          <p className="text-gray-400 mb-6">
            Transforme ton corps, transforme ta vie.
          </p>

          <p className="text-gray-600 text-sm">
            © 2025 Fitora. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}