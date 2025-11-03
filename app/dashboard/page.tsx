'use client'

import { useState } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useWeightHistory } from '@/hooks/useWeightHistory'
import { supabase } from '@/lib/supabase'
import { 
  Loader2, 
  TrendingDown, 
  TrendingUp, 
  Target,
  Scale,
  Activity,
  Plus,
  Award,
  X,
  Edit,
  Trash2,
  Save,
  Settings
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const { profile, loading: profileLoading, refreshProfile } = useUserProfile()
  const { weights, loading: weightsLoading, addWeight, deleteWeight, latestWeight } = useWeightHistory()
  
  const [showAddWeight, setShowAddWeight] = useState(false)
  const [editingWeight, setEditingWeight] = useState<string | null>(null)
  const [newWeight, setNewWeight] = useState('')
  const [editWeight, setEditWeight] = useState('')
  const [editDate, setEditDate] = useState('')
  const [addingWeight, setAddingWeight] = useState(false)
  const [updatingWeight, setUpdatingWeight] = useState(false)

  const loading = profileLoading || weightsLoading

  const currentWeight = latestWeight || profile?.current_weight || 0

  // Calcul IMC
  const calculateBMI = () => {
    if (!profile || !currentWeight) return null
    const heightInMeters = profile.height / 100
    const bmi = currentWeight / (heightInMeters * heightInMeters)
    return bmi.toFixed(1)
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Insuffisance pondérale', color: 'text-yellow-400' }
    if (bmi < 25) return { label: 'Poids normal', color: 'text-green-400' }
    if (bmi < 30) return { label: 'Surpoids', color: 'text-orange-400' }
    return { label: 'Obésité', color: 'text-red-400' }
  }

  // Calcul progression
  const calculateProgress = () => {
    if (!profile || !currentWeight) return 0
    const start = profile.current_weight
    const target = profile.target_weight
    
    const totalDifference = Math.abs(target - start)
    if (totalDifference === 0) return 100
    
    const currentDifference = Math.abs(currentWeight - start)
    const progress = (currentDifference / totalDifference) * 100
    
    return Math.min(Math.max(progress, 0), 100)
  }

  // Poids restant
  const remainingWeight = () => {
    if (!profile || !currentWeight) return 0
    return Math.abs(profile.target_weight - currentWeight)
  }

  // Ajouter un poids
  const handleAddWeight = async () => {
    if (!newWeight) return
    
    setAddingWeight(true)
    const success = await addWeight(parseFloat(newWeight))
    
    if (success) {
      setNewWeight('')
      setShowAddWeight(false)
    }
    setAddingWeight(false)
  }

  // Éditer une pesée
  const handleEditWeight = (weightEntry: any) => {
    setEditingWeight(weightEntry.id)
    setEditWeight(weightEntry.weight.toString())
    setEditDate(weightEntry.date)
  }

  // Sauvegarder la modification
  const handleSaveEdit = async () => {
    if (!editingWeight || !editWeight) return
    
    setUpdatingWeight(true)
    
    try {
      const { error } = await supabase
        .from('weight_history')
        .update({
          weight: parseFloat(editWeight),
          date: editDate
        })
        .eq('id', editingWeight)

      if (error) throw error

      console.log('✅ Pesée modifiée')
      
      // Recharger les données
      window.location.reload()
    } catch (error) {
      console.error('❌ Erreur modification pesée:', error)
    } finally {
      setUpdatingWeight(false)
      setEditingWeight(null)
    }
  }

  // Supprimer une pesée
  const handleDeleteWeight = async (id: string) => {
    if (!confirm('Supprimer cette pesée ?')) return
    
    const success = await deleteWeight(id)
    if (success) {
      console.log('✅ Pesée supprimée')
    }
  }

  // Chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Chargement de ton profil...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-md text-center">
          <p className="text-white text-lg mb-4">Aucun profil trouvé</p>
          <a href="/onboarding" className="text-pink-400 underline">
            Compléter l'onboarding →
          </a>
        </div>
      </div>
    )
  }

  const bmi = calculateBMI()
  const bmiCategory = bmi ? getBMICategory(parseFloat(bmi)) : null
  const progress = calculateProgress()
  const weightLeft = remainingWeight()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Salut ! 👋
            </h1>
            <p className="text-white/70">Voici ton évolution aujourd'hui</p>
          </div>
          
          <button
            onClick={() => router.push('/settings')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Paramètres</span>
          </button>
        </div>

        {/* Stats principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Poids actuel */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <Scale className="w-8 h-8 text-purple-400" />
              <button
                onClick={() => setShowAddWeight(true)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/60 text-sm mb-1">Poids actuel</p>
            <p className="text-3xl font-bold text-white">
              {currentWeight.toFixed(1)} kg
            </p>
            {weights.length > 1 && (
              <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
                {profile.goal === 'lose_weight' ? (
                  weights[0].weight < weights[1].weight ? (
                    <>
                      <TrendingDown className="w-4 h-4" />
                      -{(weights[1].weight - weights[0].weight).toFixed(1)} kg
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400">+{(weights[0].weight - weights[1].weight).toFixed(1)} kg</span>
                    </>
                  )
                ) : (
                  weights[0].weight > weights[1].weight ? (
                    <>
                      <TrendingUp className="w-4 h-4" />
                      +{(weights[0].weight - weights[1].weight).toFixed(1)} kg
                    </>
                  ) : (
                    <>
                      <TrendingDown className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400">-{(weights[1].weight - weights[0].weight).toFixed(1)} kg</span>
                    </>
                  )
                )}
              </p>
            )}
          </div>

          {/* Objectif */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <Target className="w-8 h-8 text-pink-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">Objectif</p>
            <p className="text-3xl font-bold text-white">{profile.target_weight.toFixed(1)} kg</p>
            <p className="text-sm text-white/60 mt-2">
              {weightLeft.toFixed(1)} kg restants
            </p>
          </div>

          {/* IMC */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <Activity className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">IMC</p>
            {bmi ? (
              <>
                <p className="text-3xl font-bold text-white">{bmi}</p>
                <p className={`text-sm mt-2 ${bmiCategory?.color}`}>
                  {bmiCategory?.label}
                </p>
              </>
            ) : (
              <p className="text-white/40">Calcul...</p>
            )}
          </div>

          {/* Progression */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <Award className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">Progression</p>
            <p className="text-3xl font-bold text-white">{progress.toFixed(0)}%</p>
            <p className="text-sm text-white/60 mt-2">
              {weights.length} pesées enregistrées
            </p>
          </div>
        </div>

        {/* Graphique + Objectif */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Graphique de progression */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6">Évolution du poids</h2>
            
            {weights.length > 0 ? (
              <div className="space-y-3">
                {weights.slice(0, 10).map((entry, index) => {
                  const isEditing = editingWeight === entry.id
                  const maxWeight = Math.max(...weights.map(w => w.weight))
                  const percentage = (entry.weight / maxWeight) * 100
                  
                  return (
                    <div key={entry.id}>
                      {isEditing ? (
                        // Mode édition
                        <div className="bg-white/5 rounded-lg p-4 space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-1">
                              <label className="block text-white/60 text-xs mb-1">Poids (kg)</label>
                              <input
                                type="number"
                                step="0.1"
                                value={editWeight}
                                onChange={(e) => setEditWeight(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-white/60 text-xs mb-1">Date</label>
                              <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              disabled={updatingWeight}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                              {updatingWeight ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <>
                                  <Save className="w-4 h-4" />
                                  Sauvegarder
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => setEditingWeight(null)}
                              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Mode affichage
                        <div className="flex items-center gap-4">
                          <div className="text-white/60 text-sm w-24">
                            {new Date(entry.date).toLocaleDateString('fr-FR', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </div>
                          <div className="flex-1">
                            <div className="h-8 bg-white/5 rounded-lg overflow-hidden relative">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                              <span className="absolute inset-0 flex items-center justify-end px-3 text-white font-semibold text-sm">
                                {entry.weight.toFixed(1)} kg
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {index === 0 && weights.length > 1 && (
                              <div className="flex items-center gap-1 text-xs w-16">
                                {entry.weight < weights[1].weight ? (
                                  <>
                                    <TrendingDown className="w-4 h-4 text-green-400" />
                                    <span className="text-green-400">
                                      -{(weights[1].weight - entry.weight).toFixed(1)}
                                    </span>
                                  </>
                                ) : entry.weight > weights[1].weight ? (
                                  <>
                                    <TrendingUp className="w-4 h-4 text-orange-400" />
                                    <span className="text-orange-400">
                                      +{(entry.weight - weights[1].weight).toFixed(1)}
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            )}
                            <button
                              onClick={() => handleEditWeight(entry)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4 text-white/60 hover:text-white" />
                            </button>
                            <button
                              onClick={() => handleDeleteWeight(entry.id)}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Scale className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Aucune pesée enregistrée</p>
                <button
                  onClick={() => setShowAddWeight(true)}
                  className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
                >
                  Ajouter une pesée
                </button>
              </div>
            )}
          </div>

          {/* Carte objectif */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6">Ton objectif</h2>
            
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">
                {profile.goal === 'lose_weight' && '🔥'}
                {profile.goal === 'gain_muscle' && '💪'}
                {profile.goal === 'maintain' && '⚖️'}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {profile.goal === 'lose_weight' && 'Perdre du poids'}
                {profile.goal === 'gain_muscle' && 'Prendre du muscle'}
                {profile.goal === 'maintain' && 'Maintenir'}
              </h3>
            </div>

            {/* Barre de progression circulaire */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{progress.toFixed(0)}%</span>
                <span className="text-sm text-white/60">complété</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Départ</span>
                <span className="text-white font-semibold">{profile.current_weight.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Actuel</span>
                <span className="text-white font-semibold">{currentWeight.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Objectif</span>
                <span className="text-white font-semibold">{profile.target_weight.toFixed(1)} kg</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal ajout poids */}
      {showAddWeight && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-indigo-950 to-purple-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Nouvelle pesée</h2>
              <button
                onClick={() => setShowAddWeight(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder={currentWeight.toFixed(1)}
                  className="w-full bg-white/10 border-2 border-white/20 focus:border-purple-500 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none transition-all text-lg"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddWeight(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddWeight}
                  disabled={!newWeight || addingWeight}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-all font-semibold flex items-center justify-center gap-2"
                >
                  {addingWeight ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Ajout...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Ajouter
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}