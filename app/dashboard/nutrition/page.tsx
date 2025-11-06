'use client'

import { useState, useEffect } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useWeightHistory } from '@/hooks/useWeightHistory'
import { useMealPreferences } from '@/hooks/useMealPreferences'
import { useMealPlanGenerator } from '@/hooks/useMealPlanGenerator'
import { calculateDailyCalories, calculateMacros } from '@/lib/nutritionCalculator'
import { generateWeeklyMealPlan, generateShoppingList } from '@/lib/mealGenerator'
import type { Meal, DayMeals } from '@/lib/mealGenerator'
import { 
  Apple, 
  Loader2, 
  ChefHat,
  ShoppingCart,
  Check,
  X,
  Clock,
  Flame,
  Target,
  TrendingUp,
  Settings,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap
} from 'lucide-react'

export default function NutritionPage() {
  const { profile, loading: profileLoading } = useUserProfile()
  const { latestWeight, loading: weightLoading } = useWeightHistory()
  const { preferences, savePreferences, loading: prefsLoading } = useMealPreferences()
  const { generateMealPlan, generating, error: generationError } = useMealPlanGenerator()

  const [showPreferences, setShowPreferences] = useState(false)
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, DayMeals> | null>(null)
  const [shoppingList, setShoppingList] = useState<Record<string, string[]> | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [usedLocalGenerator, setUsedLocalGenerator] = useState(false)

  // Form state pour les préférences
  const [dietaryType, setDietaryType] = useState<'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian'>('omnivore')
  const [dailyMeals, setDailyMeals] = useState(3)
  const [snacksPerDay, setSnacksPerDay] = useState(2)
  const [cookingTime, setCookingTime] = useState<'quick' | 'medium' | 'elaborate'>('quick')
  const [budgetLevel, setBudgetLevel] = useState<'low' | 'medium' | 'high'>('medium')

  const loading = profileLoading || weightLoading || prefsLoading

  // Charger les préférences existantes
  useEffect(() => {
    if (preferences) {
      setDietaryType(preferences.dietary_type)
      setDailyMeals(preferences.daily_meals)
      setSnacksPerDay(preferences.snacks_per_day)
      setCookingTime(preferences.cooking_time_preference)
      setBudgetLevel(preferences.budget_level)
    }
  }, [preferences])

  // Calculer les besoins caloriques
  const dailyCalories = profile && latestWeight 
    ? calculateDailyCalories(profile, latestWeight)
    : 0

  const macros = dailyCalories > 0 
    ? calculateMacros(dailyCalories, profile?.goal || 'maintain')
    : null

  // Sauvegarder les préférences
  const handleSavePreferences = async () => {
    const success = await savePreferences({
      dietary_type: dietaryType,
      daily_meals: dailyMeals,
      snacks_per_day: snacksPerDay,
      cooking_time_preference: cookingTime,
      budget_level: budgetLevel,
      allergies: [],
      dislikes: []
    })

    if (success) {
      setShowPreferences(false)
    }
  }

  // Générer le plan repas avec OpenAI OU fallback intelligent
  const handleGeneratePlan = async () => {
    if (!profile || !latestWeight || !preferences || !macros) {
      console.error('❌ Données manquantes pour générer le plan')
      return
    }

    console.log('🤖 Tentative avec OpenAI...')
    setUsedLocalGenerator(false)

    const result = await generateMealPlan({
      profile,
      currentWeight: latestWeight,
      preferences,
      dailyCalories,
      macros
    })

    // Si OpenAI échoue, utiliser le générateur local intelligent
    if (!result || !result.weeklyPlan) {
      console.log('⚠️ OpenAI indisponible, utilisation du générateur local INTELLIGENT')
      
      const localPlan = generateWeeklyMealPlan(
        dailyCalories,
        preferences.daily_meals,
        preferences.snacks_per_day,
        preferences.dietary_type,
        profile.goal
      )
      
      const localShopping = generateShoppingList(localPlan)
      
      setWeeklyPlan(localPlan)
      setShoppingList(localShopping)
      setUsedLocalGenerator(true)
    } else {
      setWeeklyPlan(result.weeklyPlan)
      setShoppingList(result.shoppingList || null)
      setUsedLocalGenerator(false)
    }
  }

  // Toggle item dans la liste de courses
  const toggleShoppingItem = (item: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(item)) {
      newChecked.delete(item)
    } else {
      newChecked.add(item)
    }
    setCheckedItems(newChecked)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-xl">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profil manquant</h2>
          <p className="text-gray-600 mb-6">Tu dois d'abord compléter ton profil</p>
          <a 
            href="/onboarding" 
            className="inline-block px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            Compléter l'onboarding →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Apple className="w-10 h-10 text-green-500" />
                Nutrition & Plan Alimentaire
              </h1>
              <p className="text-gray-600">
                {usedLocalGenerator 
                  ? 'Plan adapté à ton profil par notre algorithme intelligent' 
                  : 'Ton nutritionniste personnel pour une alimentation optimale'}
              </p>
            </div>
            
            <button
              onClick={() => setShowPreferences(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Préférences</span>
            </button>
          </div>
        </div>

        {/* Stats nutritionnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Flame className="w-8 h-8 text-orange-500 mb-3" />
            <p className="text-gray-600 text-sm font-medium mb-1">Calories journalières</p>
            <p className="text-3xl font-bold text-gray-900">{dailyCalories}</p>
            <p className="text-sm text-gray-500 mt-2">
              {profile.goal === 'lose_weight' && '🔥 Déficit calorique'}
              {profile.goal === 'gain_muscle' && '💪 Surplus calorique'}
              {profile.goal === 'maintain' && '⚖️ Maintien'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Target className="w-8 h-8 text-red-500 mb-3" />
            <p className="text-gray-600 text-sm font-medium mb-1">Protéines</p>
            <p className="text-3xl font-bold text-gray-900">{macros?.protein}g</p>
            <p className="text-sm text-gray-500 mt-2">Par jour</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-3" />
            <p className="text-gray-600 text-sm font-medium mb-1">Glucides</p>
            <p className="text-3xl font-bold text-gray-900">{macros?.carbs}g</p>
            <p className="text-sm text-gray-500 mt-2">Par jour</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Apple className="w-8 h-8 text-green-500 mb-3" />
            <p className="text-gray-600 text-sm font-medium mb-1">Lipides</p>
            <p className="text-3xl font-bold text-gray-900">{macros?.fats}g</p>
            <p className="text-sm text-gray-500 mt-2">Par jour</p>
          </div>
        </div>

        {/* Erreur de génération */}
        {generationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-900 font-semibold">Erreur OpenAI</p>
              <p className="text-red-700 text-sm">{generationError}</p>
              <p className="text-red-600 text-xs mt-1">Utilisation du générateur local à la place.</p>
            </div>
          </div>
        )}

        {/* Badge générateur local */}
        {usedLocalGenerator && weeklyPlan && (
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-start gap-3">
            <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-purple-900 font-semibold">Générateur local activé</p>
              <p className="text-purple-700 text-sm">
                Plan généré instantanément selon ton profil : 
                {profile.goal === 'lose_weight' && ' perte de poids'}
                {profile.goal === 'gain_muscle' && ' prise de muscle'}
                {profile.goal === 'maintain' && ' maintien'}, 
                régime {dietaryType}, {dailyCalories} cal/jour
              </p>
            </div>
          </div>
        )}

        {/* Section génération */}
        {!weeklyPlan ? (
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prêt à transformer ton alimentation ? 🍏
            </h2>
            <p className="text-white/90 text-lg mb-2 max-w-2xl mx-auto">
              Génère ton plan alimentaire personnalisé en quelques secondes
            </p>
            <p className="text-white/80 text-sm mb-8 max-w-xl mx-auto">
              Adapté à ton objectif, ton profil et tes préférences alimentaires
            </p>
            <button
              onClick={handleGeneratePlan}
              disabled={generating}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {generating ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <ChefHat className="w-6 h-6" />
                  Générer mon plan repas
                </>
              )}
            </button>
          </div>
        ) : (
          <>
            {/* Plan hebdomadaire */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ChefHat className="w-7 h-7 text-purple-600" />
                  Ton plan de la semaine
                </h2>
                <button
                  onClick={handleGeneratePlan}
                  disabled={generating}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Nouveau plan
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-3">
                {Object.entries(weeklyPlan).map(([day, meals]) => {
                  const dayTotal = meals.breakfast.calories + meals.lunch.calories + 
                                   meals.dinner.calories + meals.snacks.reduce((acc, s) => acc + s.calories, 0)
                  
                  return (
                    <div key={day} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                      <button
                        onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-900 font-semibold text-lg">{day}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600 text-sm font-medium">
                            {dayTotal.toFixed(0)} cal
                          </span>
                          {selectedDay === day ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {selectedDay === day && (
                        <div className="px-6 pb-6 space-y-2">
                          {[
                            { meal: meals.breakfast, label: 'Petit-déjeuner' },
                            { meal: meals.lunch, label: 'Déjeuner' },
                            { meal: meals.dinner, label: 'Dîner' },
                            ...meals.snacks.map((snack, idx) => ({ 
                              meal: snack, 
                              label: `Collation ${idx + 1}` 
                            }))
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedMeal(item.meal)}
                              className="w-full p-4 bg-white hover:bg-gray-50 rounded-lg transition-colors text-left border border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl flex-shrink-0">{item.meal.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="text-gray-900 font-medium truncate">{item.meal.name}</p>
                                  <p className="text-gray-500 text-sm">
                                    {item.meal.calories} cal · {item.meal.protein}g protéines · {item.label}
                                  </p>
                                </div>
                                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Liste de courses */}
            {shoppingList && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-7 h-7 text-green-600" />
                  Liste de courses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(shoppingList).map(([category, items]) => (
                    <div key={category} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <label
                            key={idx}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems.has(item)}
                              onChange={() => toggleShoppingItem(item)}
                              className="w-5 h-5 rounded border-2 border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className={`text-gray-700 ${checkedItems.has(item) ? 'line-through opacity-50' : ''}`}>
                              {item}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal Préférences */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Préférences alimentaires</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Type de régime */}
              <div>
                <label className="block text-gray-900 font-medium mb-3">Type de régime</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'omnivore', label: 'Omnivore', emoji: '🍖' },
                    { value: 'vegetarian', label: 'Végétarien', emoji: '🥗' },
                    { value: 'vegan', label: 'Végan', emoji: '🌱' },
                    { value: 'pescatarian', label: 'Pescatarien', emoji: '🐟' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDietaryType(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        dietaryType === option.value
                          ? 'bg-purple-50 border-purple-500'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.emoji}</div>
                      <div className="text-gray-900 font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Repas et snacks */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-medium mb-3">
                    Repas/jour : <span className="text-purple-600">{dailyMeals}</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="5"
                    value={dailyMeals}
                    onChange={(e) => setDailyMeals(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-medium mb-3">
                    Collations/jour : <span className="text-purple-600">{snacksPerDay}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    value={snacksPerDay}
                    onChange={(e) => setSnacksPerDay(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowPreferences(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all font-semibold"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails repas */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full my-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedMeal.emoji}</span>
                <h2 className="text-2xl font-bold text-gray-900">{selectedMeal.name}</h2>
              </div>
              <button
                onClick={() => setSelectedMeal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Calories', value: selectedMeal.calories, unit: '' },
                { label: 'Protéines', value: selectedMeal.protein, unit: 'g' },
                { label: 'Glucides', value: selectedMeal.carbs, unit: 'g' },
                { label: 'Lipides', value: selectedMeal.fats, unit: 'g' }
              ].map((macro, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-gray-600 text-sm mb-1">{macro.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{macro.value}{macro.unit}</p>
                </div>
              ))}
            </div>

            {/* Temps */}
            <div className="flex items-center gap-2 text-gray-600 mb-6 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
              <Clock className="w-5 h-5" />
              <span>Temps : <strong className="text-gray-900">{selectedMeal.prepTime} min</strong></span>
            </div>

            {/* Ingrédients */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🛒 Ingrédients</h3>
              <ul className="space-y-2">
                {selectedMeal.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">👨‍🍳 Préparation</h3>
              <ol className="space-y-3">
                {selectedMeal.instructions.map((inst, idx) => (
                  <li key={idx} className="flex gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}