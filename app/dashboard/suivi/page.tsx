'use client'

import { useState, useEffect } from 'react'
import { Scale, Target, Calendar, TrendingUp, X } from 'lucide-react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain' | null

interface UserGoalData {
  goal: Goal
  currentWeight: string
  targetWeight: string
  timeline: string
}

export default function SuiviPage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [step, setStep] = useState(1)
  const [goalData, setGoalData] = useState<UserGoalData>({
    goal: null,
    currentWeight: '',
    targetWeight: '',
    timeline: ''
  })

  const goals = [
    { 
      id: 'lose_weight', 
      label: 'Perdre du poids', 
      icon: '🔥',
      color: 'from-red-500 to-orange-500'
    },
    { 
      id: 'gain_muscle', 
      label: 'Prendre du muscle', 
      icon: '💪',
      color: 'from-blue-500 to-purple-500'
    },
    { 
      id: 'maintain', 
      label: 'Maintenir ma forme', 
      icon: '⚖️',
      color: 'from-green-500 to-teal-500'
    }
  ]

  const timelines = [
    { value: '2-3_weeks', label: '2-3 semaines' },
    { value: '1-3_months', label: '1-3 mois' },
    { value: '3-6_months', label: '3-6 mois' },
    { value: '6-9_months', label: '6-9 mois' }
  ]

  const handleSubmit = () => {
    // Pour l'instant, on ferme juste la popup
    // Plus tard, on sauvegardera dans Supabase
    console.log('Données utilisateur:', goalData)
    setShowOnboarding(false)
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return goalData.goal !== null
      case 2:
        return goalData.currentWeight !== ''
      case 3:
        return goalData.targetWeight !== ''
      case 4:
        return goalData.timeline !== ''
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Contenu principal (vide pour l'instant) */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Dashboard de suivi
        </h1>
        <p className="text-gray-600">
          Suivez votre progression vers votre objectif
        </p>
      </div>

      {/* POPUP ONBOARDING */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden">
            {/* Progress bar */}
            <div className="h-2 bg-gray-200">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            {/* Header */}
            <div className="p-8 pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-purple-600 font-semibold mb-1">
                    Étape {step} sur 4
                  </p>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {step === 1 && "Quel est votre objectif ?"}
                    {step === 2 && "Quel est votre poids actuel ?"}
                    {step === 3 && "Quel est votre poids cible ?"}
                    {step === 4 && "Dans combien de temps ?"}
                  </h2>
                </div>
                <button
                  onClick={() => setShowOnboarding(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <p className="text-gray-600">
                {step === 1 && "Sélectionnez l'objectif qui vous correspond le mieux"}
                {step === 2 && "Entrez votre poids actuel en kilogrammes"}
                {step === 3 && "Définissez le poids que vous souhaitez atteindre"}
                {step === 4 && "Choisissez votre horizon de temps"}
              </p>
            </div>

            {/* Contenu selon l'étape */}
            <div className="px-8 pb-8">
              {/* ÉTAPE 1 : Objectif */}
              {step === 1 && (
                <div className="grid grid-cols-1 gap-4">
                  {goals.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setGoalData({ ...goalData, goal: goal.id as Goal })}
                      className={`p-6 rounded-2xl border-2 transition-all text-left ${
                        goalData.goal === goal.id
                          ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center text-3xl`}>
                          {goal.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {goal.label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {goal.id === 'lose_weight' && 'Brûlez des calories et perdez du poids sainement'}
                            {goal.id === 'gain_muscle' && 'Développez votre masse musculaire efficacement'}
                            {goal.id === 'maintain' && 'Conservez votre forme physique actuelle'}
                          </p>
                        </div>
                        {goalData.goal === goal.id && (
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* ÉTAPE 2 : Poids actuel */}
              {step === 2 && (
                <div className="py-8">
                  <div className="flex items-center justify-center mb-8">
                    <Scale className="w-16 h-16 text-purple-600" />
                  </div>
                  <div className="max-w-sm mx-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids actuel (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={goalData.currentWeight}
                      onChange={(e) => setGoalData({ ...goalData, currentWeight: e.target.value })}
                      className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="75.0"
                      autoFocus
                    />
                  </div>
                </div>
              )}

              {/* ÉTAPE 3 : Poids cible */}
              {step === 3 && (
                <div className="py-8">
                  <div className="flex items-center justify-center mb-8">
                    <Target className="w-16 h-16 text-purple-600" />
                  </div>
                  <div className="max-w-sm mx-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids cible (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={goalData.targetWeight}
                      onChange={(e) => setGoalData({ ...goalData, targetWeight: e.target.value })}
                      className="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="70.0"
                      autoFocus
                    />
                    {goalData.currentWeight && goalData.targetWeight && (
                      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                        <p className="text-sm text-center text-purple-700">
                          Objectif : {goalData.goal === 'lose_weight' ? 'Perdre' : 'Gagner'}{' '}
                          <strong>{Math.abs(parseFloat(goalData.currentWeight) - parseFloat(goalData.targetWeight)).toFixed(1)} kg</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ÉTAPE 4 : Timeline */}
              {step === 4 && (
                <div className="py-4">
                  <div className="flex items-center justify-center mb-8">
                    <Calendar className="w-16 h-16 text-purple-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {timelines.map((timeline) => (
                      <button
                        key={timeline.value}
                        onClick={() => setGoalData({ ...goalData, timeline: timeline.value })}
                        className={`p-6 rounded-2xl border-2 transition-all ${
                          goalData.timeline === timeline.value
                            ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                        }`}
                      >
                        <p className="text-xl font-bold text-gray-800 text-center">
                          {timeline.label}
                        </p>
                        {goalData.timeline === timeline.value && (
                          <div className="mt-2 flex justify-center">
                            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer avec boutons */}
            <div className="px-8 pb-8 flex justify-between gap-4">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Retour
                </button>
              )}
              <button
                onClick={() => {
                  if (step < 4) {
                    setStep(step + 1)
                  } else {
                    handleSubmit()
                  }
                }}
                disabled={!isStepValid()}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold transition ${
                  isStepValid()
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {step < 4 ? 'Continuer' : 'Commencer mon suivi 🚀'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}