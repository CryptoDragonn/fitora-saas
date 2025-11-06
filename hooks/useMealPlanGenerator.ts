import { useState } from 'react'
import { UserProfile } from './useUserProfile'
import { MealPreferences } from './useMealPreferences'

interface GenerateMealPlanParams {
  profile: UserProfile
  currentWeight: number
  preferences: MealPreferences
  dailyCalories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
}

export function useMealPlanGenerator() {
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateMealPlan = async (params: GenerateMealPlanParams) => {
    setGenerating(true)
    setError(null)

    try {
      console.log('🚀 Lancement de la génération...')

      const response = await fetch('/api/generate-meal-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goal: params.profile.goal,
          currentWeight: params.currentWeight,
          targetWeight: params.profile.target_weight,
          height: params.profile.height,
          age: params.profile.age,
          gender: params.profile.gender,
          dailyCalories: params.dailyCalories,
          protein: params.macros.protein,
          carbs: params.macros.carbs,
          fats: params.macros.fats,
          dietaryType: params.preferences.dietary_type,
          allergies: params.preferences.allergies,
          dislikes: params.preferences.dislikes,
          dailyMeals: params.preferences.daily_meals,
          snacksPerDay: params.preferences.snacks_per_day,
          cookingTime: params.preferences.cooking_time_preference,
          budgetLevel: params.preferences.budget_level
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erreur lors de la génération')
      }

      const data = await response.json()
      console.log('✅ Plan repas généré avec succès')
      
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue'
      console.error('❌ Erreur génération:', errorMessage)
      setError(errorMessage)
      return null
    } finally {
      setGenerating(false)
    }
  }

  return {
    generateMealPlan,
    generating,
    error
  }
}