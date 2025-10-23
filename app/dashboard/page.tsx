'use client'

import { Video, Eye, TrendingUp, Zap } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Crédits restants', value: '150', icon: Zap, color: 'bg-purple-500' },
    { label: 'Vidéos créées', value: '0', icon: Video, color: 'bg-blue-500' },
    { label: 'Total vues', value: '0', icon: Eye, color: 'bg-pink-500' },
    { label: 'Engagement', value: '0%', icon: TrendingUp, color: 'bg-green-500' }
  ]

  const tasks = [
    { 
      title: 'Créer votre plan personnalisé', 
      desc: 'Commencez par définir vos objectifs et obtenir votre roadmap complète',
      completed: false,
      action: 'Commencer maintenant'
    },
    { 
      title: 'Découvrir les exercices', 
      desc: 'Explorez la bibliothèque d\'exercices avec vidéos et instructions',
      completed: false,
      action: 'Voir les tutoriels'
    },
    { 
      title: 'Générer votre plan repas', 
      desc: 'Obtenez un plan nutritionnel adapté à votre objectif',
      completed: false,
      action: 'Créer mon plan'
    }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600">
          Voici les étapes et les ressources pour commencer votre transformation
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Plan d'action */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Votre plan d'action vers le succès
          </h2>
          <span className="text-sm text-gray-600">
            1 achevé sur 3 • <span className="text-purple-600 font-semibold">Terminé 33%</span>
          </span>
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div 
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                task.completed ? 'bg-green-500' : 'bg-gray-200'
              }`}>
                {task.completed ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-lg font-bold text-gray-600">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{task.desc}</p>
                <button className="text-sm px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium">
                  {task.action}
                </button>
              </div>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                task.completed ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {task.completed && (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}