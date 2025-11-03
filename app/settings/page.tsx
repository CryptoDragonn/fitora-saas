'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/hooks/useUserProfile'
import { supabase } from '@/lib/supabase'
import { 
  ArrowLeft,
  Save,
  Loader2,
  Target,
  TrendingDown,
  TrendingUp,
  Minus,
  User,
  Ruler,
  Calendar,
  LogOut,
  AlertCircle
} from 'lucide-react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'

export default function SettingsPage() {
  const router = useRouter()
  const { profile, loading: profileLoading } = useUserProfile()
  
  const [goal, setGoal] = useState<Goal>('maintain')
  const [targetWeight, setTargetWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male')
  
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Charger les données du profil
  useEffect(() => {
    if (profile) {
      setGoal(profile.goal)
      setTargetWeight(profile.target_weight.toString())
      setHeight(profile.height.toString())
      setAge(profile.age.toString())
      setGender(profile.gender)
    }
  }, [profile])

  const goals = [
    {
      id: 'lose_weight' as Goal,
      title: 'Perdre du poids',
      icon: TrendingDown,
      emoji: '🔥'
    },
    {
      id: 'gain_muscle' as Goal,
      title: 'Prendre du muscle',
      icon: TrendingUp,
      emoji: '💪'
    },
    {
      id: 'maintain' as Goal,
      title: 'Maintenir',
      icon: Minus,
      emoji: '⚖️'
    }
  ]

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          goal,
          target_weight: parseFloat(targetWeight),
          height: parseFloat(height),
          age: parseInt(age),
          gender,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', profile.user_id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Paramètres sauvegardés !' })
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au dashboard
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            ⚙️ Paramètres
          </h1>
          <p className="text-white/70">Modifie tes informations et objectifs</p>
        </div>

        {/* Message de confirmation/erreur */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl border-2 ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/30 text-green-200' 
              : 'bg-red-500/10 border-red-500/30 text-red-200'
          } flex items-center gap-3`}>
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          
          {/* Objectif */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-400" />
              Objectif
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    goal === g.id
                      ? 'bg-purple-500/20 border-purple-500'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-3xl mb-2">{g.emoji}</div>
                  <div className="text-white font-medium">{g.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Poids cible */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">
              Poids cible
            </h2>
            
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-all text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">kg</span>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-cyan-400" />
              Informations personnelles
            </h2>
            
            <div className="space-y-4">
              {/* Taille */}
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Taille (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
                />
              </div>

              {/* Âge */}
              <div>
                <label className="block text-white font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Âge
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl px-4 py-3 text-white outline-none transition-all"
                />
              </div>

              {/* Genre */}
              <div>
                <label className="block text-white font-medium mb-2">
                  Genre
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'male', label: 'Homme', emoji: '👨' },
                    { value: 'female', label: 'Femme', emoji: '👩' },
                    { value: 'other', label: 'Autre', emoji: '🧑' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setGender(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        gender === option.value
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-white text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white rounded-xl transition-all font-semibold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Sauvegarder les modifications
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="px-6 py-4 bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/30 text-red-200 rounded-xl transition-all font-semibold flex items-center justify-center gap-2"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}