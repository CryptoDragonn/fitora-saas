import { useState, useEffect, useMemo } from 'react'
import { supabase } from '@/lib/supabase'

export interface WeightEntry {
  id: string
  user_id: string
  weight: number
  date: string
  notes?: string
  created_at: string
}

interface UseWeightHistoryReturn {
  weights: WeightEntry[]
  loading: boolean
  error: string | null
  addWeight: (weight: number, date?: string, notes?: string) => Promise<boolean>
  deleteWeight: (id: string) => Promise<boolean>
  refreshWeights: () => Promise<void>
  latestWeight: number | null
}

export function useWeightHistory(): UseWeightHistoryReturn {
  const [weights, setWeights] = useState<WeightEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWeights = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('Utilisateur non connecté')
      }

      const { data, error: fetchError } = await supabase
        .from('weight_history')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      console.log('✅ Pesées chargées:', data?.length || 0, 'pesées')
      if (data && data.length > 0) {
        console.log('📊 Dernier poids:', data[0].weight, 'kg')
      }
      
      setWeights(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('❌ Erreur chargement poids:', err)
    } finally {
      setLoading(false)
    }
  }

  const addWeight = async (weight: number, date?: string, notes?: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Utilisateur non connecté')

      console.log('💾 Ajout du poids:', weight, 'kg')

      const { error: insertError } = await supabase
        .from('weight_history')
        .insert({
          user_id: user.id,
          weight,
          date: date || new Date().toISOString().split('T')[0],
          notes
        })

      if (insertError) throw insertError

      console.log('✅ Pesée ajoutée avec succès')

      // Recharger immédiatement les données
      await loadWeights()
      
      return true
    } catch (err) {
      console.error('❌ Erreur ajout poids:', err)
      return false
    }
  }

  const deleteWeight = async (id: string): Promise<boolean> => {
    try {
      const { error: deleteError } = await supabase
        .from('weight_history')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      console.log('✅ Pesée supprimée')

      // Recharger immédiatement les données
      await loadWeights()
      
      return true
    } catch (err) {
      console.error('❌ Erreur suppression poids:', err)
      return false
    }
  }

  const refreshWeights = async () => {
    await loadWeights()
  }

  // Charger au montage
  useEffect(() => {
    loadWeights()
  }, [])

  // Calculer latestWeight avec useMemo pour qu'il se mette à jour automatiquement
  const latestWeight = useMemo(() => {
    const latest = weights.length > 0 ? weights[0].weight : null
    console.log('🔄 latestWeight recalculé:', latest)
    return latest
  }, [weights])

  return {
    weights,
    loading,
    error,
    addWeight,
    deleteWeight,
    refreshWeights,
    latestWeight
  }
}