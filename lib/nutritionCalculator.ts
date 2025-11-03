import { UserProfile } from '@/hooks/useUserProfile'

export function calculateDailyCalories(profile: UserProfile, currentWeight: number): number {
  // Calcul du métabolisme de base (BMR) avec formule de Mifflin-St Jeor
  let bmr: number
  
  if (profile.gender === 'male') {
    bmr = 10 * currentWeight + 6.25 * profile.height - 5 * profile.age + 5
  } else if (profile.gender === 'female') {
    bmr = 10 * currentWeight + 6.25 * profile.height - 5 * profile.age - 161
  } else {
    // Moyenne pour 'other'
    bmr = 10 * currentWeight + 6.25 * profile.height - 5 * profile.age - 78
  }

  // TDEE (Total Daily Energy Expenditure) - activité modérée
  const tdee = bmr * 1.55

  // Ajustement selon l'objectif
  if (profile.goal === 'lose_weight') {
    return Math.round(tdee - 500) // Déficit de 500 cal
  } else if (profile.goal === 'gain_muscle') {
    return Math.round(tdee + 300) // Surplus de 300 cal
  } else {
    return Math.round(tdee) // Maintien
  }
}

export function calculateMacros(calories: number, goal: string) {
  let proteinPercent: number
  let carbsPercent: number
  let fatsPercent: number

  if (goal === 'lose_weight') {
    proteinPercent = 0.35 // 35% protéines
    carbsPercent = 0.35   // 35% glucides
    fatsPercent = 0.30    // 30% lipides
  } else if (goal === 'gain_muscle') {
    proteinPercent = 0.30 // 30% protéines
    carbsPercent = 0.45   // 45% glucides
    fatsPercent = 0.25    // 25% lipides
  } else {
    proteinPercent = 0.25 // 25% protéines
    carbsPercent = 0.45   // 45% glucides
    fatsPercent = 0.30    // 30% lipides
  }

  return {
    protein: Math.round((calories * proteinPercent) / 4), // 4 cal par g
    carbs: Math.round((calories * carbsPercent) / 4),     // 4 cal par g
    fats: Math.round((calories * fatsPercent) / 9)        // 9 cal par g
  }
}

export function getMealDistribution(dailyCalories: number, numMeals: number, numSnacks: number) {
  const totalMealSlots = numMeals + numSnacks
  const snackCalories = 150 // Calories par snack
  const totalSnackCalories = snackCalories * numSnacks
  const remainingCalories = dailyCalories - totalSnackCalories
  const caloriesPerMeal = Math.round(remainingCalories / numMeals)

  return {
    caloriesPerMeal,
    caloriesPerSnack: snackCalories,
    totalMealSlots
  }
}