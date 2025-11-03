'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
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
  AlertCircle,
  Loader2
} from 'lucide-react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    goal: '' as Goal | '',
    currentWeight: '',
    targetWeight: '',
    height: '',
    age: '',
    gender: '' as 'male' | 'female' | 'other' | ''
  })
  const [weightError, setWeightError] = useState('')
  const [isWeightValid, setIsWeightValid] = useState(false)

  // Récupérer l'utilisateur au chargement
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        await loadExistingData(user.id)
      }
    }
    getUser()
  }, [])

  // Charger les données existantes
  const loadExistingData = async (uid: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', uid)
      .single()

    if (data && !error) {
      setFormData({
        goal: data.goal || '',
        currentWeight: data.current_weight?.toString() || '',
        targetWeight: data.target_weight?.toString() || '',
        height: data.height?.toString() || '',
        age: data.age?.toString() || '',
        gender: data.gender || ''
      })
    }
  }

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
      description: 'Développer ta masse musculaire',
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

  // Validation avec useEffect
  useEffect(() => {
    if (!formData.goal || !formData.currentWeight || !formData.targetWeight) {
      setWeightError('')
      setIsWeightValid(false)
      return
    }

    const current = parseFloat(formData.currentWeight)
    const target = parseFloat(formData.targetWeight)

    if (isNaN(current) || isNaN(target)) {
      setWeightError('')
      setIsWeightValid(false)
      return
    }

    if (current < 30 || current > 300) {
      setWeightError('⚠️ Poids actuel en dehors de la plage valide (30-300kg)')
      setIsWeightValid(false)
      return
    }

    if (target < 30 || target > 300) {
      setWeightError('⚠️ Poids cible en dehors de la plage valide (30-300kg)')
      setIsWeightValid(false)
      return
    }

    if (formData.goal === 'lose_weight' && target >= current) {
      setWeightError('❌ Pour perdre du poids, ton objectif doit être inférieur à ton poids actuel')
      setIsWeightValid(false)
      return
    }

    if (formData.goal === 'gain_muscle' && target <= current) {
      setWeightError('❌ Pour prendre du muscle, ton objectif doit être supérieur à ton poids actuel')
      setIsWeightValid(false)
      return
    }

    if (formData.goal === 'maintain' && Math.abs(target - current) > 2) {
      setWeightError('⚠️ Pour maintenir, ton objectif devrait être proche de ton poids actuel (±2kg)')
      setIsWeightValid(false)
      return
    }

    setWeightError('')
    setIsWeightValid(true)
  }, [formData.goal, formData.currentWeight, formData.targetWeight])

  const handleGoalSelect = async (goal: Goal) => {
    setFormData(prev => ({ ...prev, goal }))
    
    if (userId) {
      await saveToSupabase({ goal })
    }
    
    setStep(2)
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Sauvegarder dans Supabase
  const saveToSupabase = async (dataToSave: Partial<typeof formData>) => {
    if (!userId) return

    const dbData: any = {
      user_id: userId,
      updated_at: new Date().toISOString()
    }

    if (dataToSave.goal) dbData.goal = dataToSave.goal
    if (dataToSave.currentWeight) dbData.current_weight = parseFloat(dataToSave.currentWeight)
    if (dataToSave.targetWeight) dbData.target_weight = parseFloat(dataToSave.targetWeight)
    if (dataToSave.height) dbData.height = parseFloat(dataToSave.height)
    if (dataToSave.age) dbData.age = parseInt(dataToSave.age)
    if (dataToSave.gender) dbData.gender = dataToSave.gender

    const { error } = await supabase
      .from('user_profiles')
      .upsert(dbData, { onConflict: 'user_id' })

    if (error) {
      console.error('❌ Erreur sauvegarde profil:', error)
    } else {
      console.log('✅ Profil sauvegardé')
    }
  }

  const handleNext = async () => {
    if (step === 2 && isWeightValid) {
      await saveToSupabase({
        currentWeight: formData.currentWeight,
        targetWeight: formData.targetWeight
      })
      setStep(3)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    
    try {
      // Sauvegarder toutes les données finales
      await saveToSupabase({
        height: formData.height,
        age: formData.age,
        gender: formData.gender
      })

      // Marquer l'onboarding comme complété
      await supabase
        .from('user_profiles')
        .update({ 
          onboarding_completed: true,
          completed_at: new Date().toISOString()
        })
        .eq('user_id', userId)

      // 🆕 CRÉER LA PREMIÈRE PESÉE dans weight_history
      console.log('📊 Création de la pesée initiale:', formData.currentWeight, 'kg')
      
      const { error: weightError } = await supabase
        .from('weight_history')
        .insert({
          user_id: userId,
          weight: parseFloat(formData.currentWeight),
          date: new Date().toISOString().split('T')[0],
          notes: 'Poids initial (onboarding)'
        })

      if (weightError) {
        console.error('❌ Erreur création pesée initiale:', weightError)
      } else {
        console.log('✅ Pesée initiale créée avec succès')
      }

      // Rediriger vers le dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('❌ Erreur lors de la finalisation:', error)
    } finally {
      setLoading(false)
    }
  }

  const canProceedStep2 = formData.currentWeight && formData.targetWeight && isWeightValid
  const canProceedStep3 = formData.height && formData.age && formData.gender

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-white/70">Étape {step}/3</span>
            <span className="text-xs sm:text-sm font-medium text-white/70">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-white/20">
          {/* Step 1: Goal Selection */}
          {step === 1 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Quel est ton objectif ?</h1>
                <p className="text-sm sm:text-base text-white/70">Choisis ce qui te correspond le mieux</p>
              </div>

              <div className="grid gap-3 sm:gap-4">
                {goals.map((goal) => {
                  const Icon = goal.icon
                  return (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalSelect(goal.id)}
                      className="group relative bg-white/5 active:bg-white/15 sm:hover:bg-white/10 border-2 border-white/10 sm:hover:border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 text-left overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${goal.color} opacity-0 group-hover:opacity-10 group-active:opacity-20 transition-opacity`} />
                      <div className="relative flex items-center gap-3 sm:gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${goal.color} rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0`}>
                          {goal.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{goal.title}</h3>
                          <p className="text-white/60 text-xs sm:text-sm">{goal.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Weight */}
          {step === 2 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                  <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Ton poids</h1>
                <p className="text-sm sm:text-base text-white/70">Définis ton point de départ et ton objectif</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Poids actuel (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={formData.currentWeight}
                      onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                      placeholder="75"
                      className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-white/30 outline-none transition-all text-base sm:text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm sm:text-base">kg</span>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Poids cible (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      inputMode="decimal"
                      value={formData.targetWeight}
                      onChange={(e) => handleInputChange('targetWeight', e.target.value)}
                      placeholder="70"
                      className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-white/30 outline-none transition-all text-base sm:text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm sm:text-base">kg</span>
                  </div>
                </div>

                {weightError && (
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-200 text-xs sm:text-sm leading-relaxed">{weightError}</p>
                  </div>
                )}

                {isWeightValid && !weightError && (
                  <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-green-200 text-xs sm:text-sm leading-relaxed">
                      Parfait ! Tu veux {formData.goal === 'lose_weight' ? 'perdre' : 'prendre'}{' '}
                      {Math.abs(parseFloat(formData.targetWeight) - parseFloat(formData.currentWeight)).toFixed(1)} kg
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/5 active:bg-white/15 sm:hover:bg-white/10 border border-white/10 text-white px-4 sm:px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 active:from-pink-600 active:to-purple-600 sm:hover:from-pink-600 sm:hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                >
                  Continuer
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info */}
          {step === 3 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                  <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Informations personnelles</h1>
                <p className="text-sm sm:text-base text-white/70">Pour personnaliser ton plan</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Ruler className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Taille (cm)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="175"
                    className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-white/30 outline-none transition-all text-base sm:text-lg"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Âge
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="25"
                    className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 sm:py-3.5 text-white placeholder-white/30 outline-none transition-all text-base sm:text-lg"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Genre
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { value: 'male', label: 'Homme', emoji: '👨' },
                      { value: 'female', label: 'Femme', emoji: '👩' },
                      { value: 'other', label: 'Autre', emoji: '🧑' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('gender', option.value)}
                        className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                          formData.gender === option.value
                            ? 'bg-purple-500/20 border-purple-500'
                            : 'bg-white/5 border-white/10 active:border-white/40 sm:hover:border-white/30'
                        }`}
                      >
                        <div className="text-xl sm:text-2xl mb-1">{option.emoji}</div>
                        <div className="text-white text-xs sm:text-sm font-medium">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-white/5 active:bg-white/15 sm:hover:bg-white/10 border border-white/10 text-white px-4 sm:px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Retour
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!canProceedStep3 || loading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 active:from-pink-600 active:to-purple-600 sm:hover:from-pink-600 sm:hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 sm:px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      Terminer
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}