import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface UserProfile {
  id: string
  user_id: string
  goal: 'lose_weight' | 'gain_muscle' | 'maintain'
  current_weight: number
  target_weight: number
  height: number
  age: number
  gender: 'male' | 'female' | 'other'
  onboarding_completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

interface UseUserProfileReturn {
  profile: UserProfile | null
  loading: boolean
  error: string | null
  refreshProfile: () => Promise<void>
}

export function useUserProfile(): UseUserProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('Utilisateur non connecté')
      }

      const { data, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError
      }

      console.log('✅ Profil chargé:', data)
      setProfile(data || null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
      console.error('❌ Erreur chargement profil:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshProfile = async () => {
    await loadProfile()
  }

  useEffect(() => {
    loadProfile()
  }, [])

  return {
    profile,
    loading,
    error,
    refreshProfile
  }
}