'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Zap, 
  Video, 
  Eye, 
  TrendingUp,
  Target,
  Utensils,
  Dumbbell,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Crown,
  Flame,
  Trophy,
  Calendar
} from 'lucide-react'

export default function DashboardPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const stats = [
    {
      icon: Zap,
      label: 'Crédits restants',
      value: '150',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      progress: 75
    },
    {
      icon: Video,
      label: 'Vidéos créées',
      value: '0',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      progress: 0
    },
    {
      icon: Eye,
      label: 'Total vues',
      value: '0',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-500/10',
      progress: 0
    },
    {
      icon: TrendingUp,
      label: 'Engagement',
      value: '0%',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      progress: 0
    }
  ]

  const actionSteps = [
    {
      number: 1,
      title: 'Créer votre plan personnalisé',
      description: 'Commencez par définir vos objectifs et obtenir votre roadmap complète',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      link: '/dashboard',
      cta: 'Commencer maintenant',
      status: 'current'
    },
    {
      number: 2,
      title: 'Découvrir les exercices',
      description: 'Explorez la bibliothèque d\'exercices avec vidéos et instructions',
      icon: Dumbbell,
      color: 'from-blue-500 to-cyan-500',
      link: '/dashboard/exercises',
      cta: 'Voir les tutoriels',
      status: 'locked'
    },
    {
      number: 3,
      title: 'Générer votre plan repas',
      description: 'Obtenez un plan nutritionnel adapté à votre objectif',
      icon: Utensils,
      color: 'from-orange-500 to-red-500',
      link: '/dashboard/nutrition',
      cta: 'Créer mon plan',
      status: 'locked'
    }
  ]

  const quickActions = [
    {
      title: 'Séance du jour',
      description: 'Cardio HIIT - 30 min',
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      link: '/dashboard/training'
    },
    {
      title: 'Progression',
      description: '1 séance cette semaine',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      link: '/dashboard/training'
    },
    {
      title: 'Calendrier',
      description: '5 jours restants',
      icon: Calendar,
      color: 'from-purple-500 to-pink-500',
      link: '/dashboard/training'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8 pt-16 lg:pt-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
              Tableau de bord
            </h1>
            <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-purple-500 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Voici les étapes et les ressources pour commencer votre transformation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 ${stat.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div className={`text-2xl sm:text-3xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2 sm:mb-3">{stat.label}</p>

                <div className="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-700`}
                    style={{ width: hoveredCard === index ? `${stat.progress}%` : '0%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-purple-500" />
            Actions rapides
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.link}
                className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{action.description}</p>
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mt-3 sm:mt-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-5 sm:w-6 h-5 sm:h-6 text-purple-500" />
                Votre plan d'action vers le succès
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-gray-600">Progression</p>
              <p className="text-lg sm:text-2xl font-black text-purple-600">
                1/3 • <span className="text-green-500">33%</span>
              </p>
            </div>
          </div>

          <div className="h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden mb-6 sm:mb-8">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-1/3 transition-all duration-1000"></div>
          </div>

          {/* Action Steps */}
          <div className="space-y-4 sm:space-y-6">
            {actionSteps.map((step, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${
                  step.status === 'current' 
                    ? 'from-purple-50 to-pink-50 border-2 border-purple-300' 
                    : 'from-gray-50 to-gray-100 border-2 border-gray-200'
                } rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-102 hover:shadow-xl`}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-black shadow-lg`}>
                    {step.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-2 sm:mb-3 gap-2">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2 flex-wrap">
                          {step.title}
                          {step.status === 'current' && (
                            <span className="px-2 sm:px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full animate-pulse">
                              EN COURS
                            </span>
                          )}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                      </div>
                      
                      <div className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                        <step.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                    </div>

                    <Link
                      href={step.link}
                      className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${step.color} text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 ${
                        step.status === 'locked' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {step.cta}
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Crown className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400" />
                <h3 className="text-xl sm:text-2xl font-black text-white">Passez à Fitora Premium</h3>
              </div>
              <p className="text-purple-100 text-base sm:text-lg mb-3 sm:mb-4">
                Débloquez tous les plans, exercices illimités et suivi nutrition avancé
              </p>
              <button className="px-6 sm:px-8 py-3 sm:py-3 bg-white text-purple-600 rounded-lg sm:rounded-xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Découvrir Premium 🚀
              </button>
            </div>
            <div className="text-5xl sm:text-6xl">💪</div>
          </div>
        </div>

      </div>
    </div>
  )
}