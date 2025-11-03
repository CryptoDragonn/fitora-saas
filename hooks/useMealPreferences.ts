import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface MealPreferences {
  id: string
  user_id: string
  dietary_type: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian'
  allergies: string[]
  dislikes: string[]
  daily_meals: number
  snacks_per_day: number
  cooking_time_preference: 'quick' | 'medium' | 'elaborate'
  budget_level: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

interface UseMealPreferencesReturn {
  preferences: MealPreferences | null
  loading: boolean
  error: string | null
  savePreferences: (prefs: Partial<MealPreferences>) => Promise<boolean>
  refreshPreferences: () => Promise<void>
}

export function useMealPreferences(): UseMealPreferencesReturn {
  const [preferences, setPreferences] = useState<MealPreferences | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPreferences = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('Utilisateur non connecté')
      }

      const { data, error: fetchError } = await supabase
        .from('meal_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      setPreferences(data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('Erreur chargement préférences:', err)
    } finally {
      setLoading(false)
    }
  }

  const savePreferences = async (prefs: Partial<MealPreferences>): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error('Utilisateur non connecté')

      const { error: upsertError } = await supabase
        .from('meal_preferences')
        .upsert({
          user_id: user.id,
          ...prefs,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })

      if (upsertError) throw upsertError

      await loadPreferences()
      return true
    } catch (err) {
      console.error('Erreur sauvegarde préférences:', err)
      return false
    }
  }

  const refreshPreferences = async () => {
    await loadPreferences()
  }

  useEffect(() => {
    loadPreferences()
  }, [])

  return {
    preferences,
    loading,
    error,
    savePreferences,
    refreshPreferences
  }
}