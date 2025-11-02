'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../contexts/UserContext'
import { 
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Ruler,
  Calendar,
  Scale,
  AlertCircle
} from 'lucide-react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'

export default function OnboardingPage() {
  const router = useRouter()
  const { completeOnboarding } = useUser()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    goal: '' as Goal | '',
    currentWeight: '',
    targetWeight: '',
    height: '',
    age: '',
    gender: '' as 'male' | 'female' | 'other' | ''
  })
  const [weightError, setWeightError] = useState('')

  const goals = [
    {
      id: 'lose_weight' as Goal,
      title: 'Perdre du poids',
      description: 'Brûler les graisses et mincir',
      icon: TrendingDown,
      color: 'from-orange-500 to-red-500',
      emoji: '🔥'
    },
    {
      id: 'gain_muscle' as Goal,
      title: 'Prendre du muscle',
      description: 'Développer votre masse musculaire',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      emoji: '💪'
    },
    {
      id: 'maintain' as Goal,
      title: 'Maintenir',
      description: 'Rester en forme et stable',
      icon: Minus,
      color: 'from-green-500 to-emerald-500',
      emoji: '⚖️'
    }
  ]

  // Validation des poids selon l'objectif
  const validateWeights = () => {
    const current = parseFloat(formData.currentWeight)
    const target = parseFloat(formData.targetWeight)

    if (!current || !target) {
      setWeightError('')
      return false
    }

    // Validation selon l'objectif
    if (formData.goal === 'lose_weight' && target >= current) {
      setWeightError('❌ Pour perdre du poids, ton objectif doit être inférieur à ton poids actuel')
      return false
    }

    if (formData.goal === 'gain_muscle' && target <= current) {
      setWeightError('❌ Pour prendre du muscle, ton objectif doit être supérieur à ton poids actuel')
      return false
    }

    if (formData.goal === 'maintain' && Math.abs(target - current) > 2) {
      setWeightError('⚠️ Pour maintenir, ton objectif devrait être proche de ton poids actuel (±2kg)')
      return false
    }

    // Vérifications de sécurité
    if (Math.abs(target - current) > 50) {
      setWeightError('⚠️ Cette différence de poids est très importante. Consulte un professionnel de santé.')
      return false
    }

    if (target < 40 || target > 200) {
      setWeightError('⚠️ Poids cible en dehors de la plage recommandée (40-200kg)')
      return false
    }

    setWeightError('')
    return true
  }

  const handleSubmit = () => {
    if (!validateWeights()) return

    completeOnboarding({
      goal: formData.goal as Goal,
      currentWeight: parseFloat(formData.currentWeight),
      targetWeight: parseFloat(formData.targetWeight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other'
    })
    router.push('/dashboard')
  }

  const canGoNext = () => {
    if (step === 1) return formData.goal !== ''
    if (step === 2) {
      return formData.currentWeight !== '' && 
             formData.targetWeight !== '' && 
             validateWeights()
    }
    if (step === 3) return formData.height !== '' && formData.age !== '' && formData.gender !== ''
    return false
  }

  // Calculer la différence de poids
  const getWeightDifference = () => {
    const current = parseFloat(formData.currentWeight)
    const target = parseFloat(formData.targetWeight)
    
    if (!current || !target) return null

    const diff = Math.abs(target - current)
    const isGaining = target > current
    const isLosing = target < current
    
    return { diff, isGaining, isLosing }
  }

  const weightDiff = getWeightDifference()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-semibold">Étape {step} sur 3</p>
            <p className="text-purple-300">{Math.round((step / 3) * 100)}%</p>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/20">
          
          {/* STEP 1: Goal Selection */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                  Quel est ton objectif ?
                </h1>
                <p className="text-xl text-purple-200">
                  Choisis ce qui te correspond le mieux
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      setFormData({ ...formData, goal: goal.id })
                      setWeightError('')
                    }}
                    className={`p-8 rounded-2xl border-4 transition-all hover:scale-105 ${
                      formData.goal === goal.id
                        ? `border-purple-500 bg-gradient-to-br ${goal.color} bg-opacity-20`
                        : 'border-white/20 hover:border-white/40 bg-white/5'
                    }`}
                  >
                    <div className="text-6xl mb-4">{goal.emoji}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{goal.title}</h3>
                    <p className="text-purple-200">{goal.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Weight */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <Scale className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                  Tes objectifs de poids
                </h1>
                <p className="text-xl text-purple-200">
                  Aide-nous à personnaliser ton programme
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-white font-bold mb-3 text-lg">
                    Poids actuel (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.currentWeight}
                    onChange={(e) => {
                      setFormData({ ...formData, currentWeight: e.target.value })
                      setWeightError('')
                    }}
                    onBlur={validateWeights}
                    placeholder="75"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white text-2xl font-bold placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-3 text-lg">
                    Poids cible (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.targetWeight}
                    onChange={(e) => {
                      setFormData({ ...formData, targetWeight: e.target.value })
                      setWeightError('')
                    }}
                    onBlur={validateWeights}
                    placeholder={
                      formData.goal === 'lose_weight' ? '70 (inférieur)' :
                      formData.goal === 'gain_muscle' ? '80 (supérieur)' :
                      '75 (similaire)'
                    }
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white text-2xl font-bold placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                {/* Error Message */}
                {weightError && (
                  <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-200 font-semibold">{weightError}</p>
                  </div>
                )}

                {/* Success Display */}
                {weightDiff && !weightError && formData.currentWeight && formData.targetWeight && (
                  <div className={`border-2 rounded-xl p-6 text-center ${
                    formData.goal === 'lose_weight' ? 'bg-orange-500/20 border-orange-400' :
                    formData.goal === 'gain_muscle' ? 'bg-blue-500/20 border-blue-400' :
                    'bg-green-500/20 border-green-400'
                  }`}>
                    <p className={`mb-2 ${
                      formData.goal === 'lose_weight' ? 'text-orange-200' :
                      formData.goal === 'gain_muscle' ? 'text-blue-200' :
                      'text-green-200'
                    }`}>Objectif</p>
                    <p className="text-4xl font-black text-white mb-2">
                      {weightDiff.diff.toFixed(1)} kg
                    </p>
                    <p className={`font-semibold ${
                      formData.goal === 'lose_weight' ? 'text-orange-300' :
                      formData.goal === 'gain_muscle' ? 'text-blue-300' :
                      'text-green-300'
                    }`}>
                      à {
                        formData.goal === 'lose_weight' ? 'perdre 🔥' :
                        formData.goal === 'gain_muscle' ? 'gagner 💪' :
                        'maintenir ⚖️'
                      }
                    </p>
                  </div>
                )}

                {/* Hints */}
                <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                  <p className="text-blue-200 text-sm">
                    💡 <strong>Conseil :</strong> {
                      formData.goal === 'lose_weight' 
                        ? 'Une perte de 0.5-1kg par semaine est idéale et durable.'
                        : formData.goal === 'gain_muscle'
                        ? 'Une prise de 0.25-0.5kg par semaine est optimale pour du muscle.'
                        : 'Vise à rester dans une fourchette de ±2kg.'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Personal Info */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="text-center mb-8">
                <User className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                  Dernières informations
                </h1>
                <p className="text-xl text-purple-200">
                  Pour des recommandations précises
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <label className="block text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    Taille (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="175"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white text-2xl font-bold placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-3 text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Âge
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="30"
                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white text-2xl font-bold placeholder-white/30 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-3 text-lg">
                    Genre
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'male', label: 'Homme', emoji: '👨' },
                      { value: 'female', label: 'Femme', emoji: '👩' },
                      { value: 'other', label: 'Autre', emoji: '🧑' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData({ ...formData, gender: option.value as any })}
                        className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                          formData.gender === option.value
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/20 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <p className="text-white font-bold">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 gap-4">
            <button
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1)
                  setWeightError('')
                }
              }}
              disabled={step === 1}
              className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>

            {step < 3 ? (
              <button
                onClick={() => {
                  if (canGoNext()) {
                    setStep(step + 1)
                    setWeightError('')
                  }
                }}
                disabled={!canGoNext()}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Suivant
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canGoNext()}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Commencer mon aventure !
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}