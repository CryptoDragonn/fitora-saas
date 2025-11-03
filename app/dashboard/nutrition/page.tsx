'use client'

import { useState, useEffect } from 'react'
import { useUserProfile } from '@/hooks/useUserProfile'
import { useWeightHistory } from '@/hooks/useWeightHistory'
import { useMealPreferences } from '@/hooks/useMealPreferences'
import { calculateDailyCalories, calculateMacros, getMealDistribution } from '@/lib/nutritionCalculator'
import { generateWeeklyMealPlan, generateShoppingList, type DayMeals, type Meal } from '@/lib/mealGenerator'
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
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function NutritionPage() {
  const { profile, loading: profileLoading } = useUserProfile()
  const { latestWeight, loading: weightLoading } = useWeightHistory()
  const { preferences, savePreferences, loading: prefsLoading } = useMealPreferences()

  const [showPreferences, setShowPreferences] = useState(false)
  const [weeklyPlan, setWeeklyPlan] = useState<Record<string, DayMeals> | null>(null)
  const [shoppingList, setShoppingList] = useState<Record<string, string[]> | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
  const [generating, setGenerating] = useState(false)

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

  // Générer le plan repas
  const handleGeneratePlan = async () => {
    if (!dailyCalories) return

    setGenerating(true)
    
    // Simuler un délai de génération
    await new Promise(resolve => setTimeout(resolve, 1500))

    const plan = generateWeeklyMealPlan(dailyCalories, dailyMeals, snacksPerDay, dietaryType)
    const shopping = generateShoppingList(plan)

    setWeeklyPlan(plan)
    setShoppingList(shopping)
    setGenerating(false)
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Chargement...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Apple className="w-10 h-10 text-green-400" />
              Nutrition & Plan Alimentaire
            </h1>
            <p className="text-white/70">Ton nutritionniste IA personnel pour une alimentation optimale</p>
          </div>
          
          <button
            onClick={() => setShowPreferences(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all"
          >
            <Settings className="w-5 h-5" />
            Préférences
          </button>
        </div>

        {/* Stats nutritionnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <Flame className="w-8 h-8 text-orange-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">Calories journalières</p>
            <p className="text-3xl font-bold text-white">{dailyCalories}</p>
            <p className="text-sm text-white/60 mt-2">
              {profile.goal === 'lose_weight' && 'Déficit calorique'}
              {profile.goal === 'gain_muscle' && 'Surplus calorique'}
              {profile.goal === 'maintain' && 'Maintien'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <Target className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">Protéines</p>
            <p className="text-3xl font-bold text-white">{macros?.protein}g</p>
            <p className="text-sm text-white/60 mt-2">Par jour</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <TrendingUp className="w-8 h-8 text-yellow-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">Glucides</p>
            <p className="text-3xl font-bold text-white">{macros?.carbs}g</p>
            <p className="text-sm text-white/60 mt-2">Par jour</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <Apple className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-white/60 text-sm mb-1">Lipides</p>
            <p className="text-3xl font-bold text-white">{macros?.fats}g</p>
            <p className="text-sm text-white/60 mt-2">Par jour</p>
          </div>
        </div>

        {/* Section génération de plan */}
        {!weeklyPlan ? (
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 sm:p-12 text-center mb-8">
            <Sparkles className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prêt à transformer ton alimentation ? 🍏
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Génère ton plan alimentaire personnalisé en 2 minutes
            </p>
            <button
              onClick={handleGeneratePlan}
              disabled={generating}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50"
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
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ChefHat className="w-7 h-7 text-purple-400" />
                  Ton plan de la semaine
                </h2>
                <button
                  onClick={handleGeneratePlan}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Nouveau plan
                </button>
              </div>

              <div className="space-y-4">
                {Object.entries(weeklyPlan).map(([day, meals]) => (
                  <div key={day} className="bg-white/5 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white font-semibold text-lg">{day}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-white/60 text-sm">
                          {(meals.breakfast.calories + meals.lunch.calories + meals.dinner.calories + 
                            meals.snacks.reduce((acc, s) => acc + s.calories, 0)).toFixed(0)} cal
                        </span>
                        {selectedDay === day ? (
                          <ChevronUp className="w-5 h-5 text-white/60" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/60" />
                        )}
                      </div>
                    </button>

                    {selectedDay === day && (
                      <div className="px-6 pb-6 space-y-3">
                        {/* Petit-déjeuner */}
                        <button
                          onClick={() => setSelectedMeal(meals.breakfast)}
                          className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{meals.breakfast.emoji}</span>
                              <div>
                                <p className="text-white font-medium">{meals.breakfast.name}</p>
                                <p className="text-white/60 text-sm">
                                  {meals.breakfast.calories} cal · {meals.breakfast.protein}g protéines
                                </p>
                              </div>
                            </div>
                            <Clock className="w-4 h-4 text-white/60" />
                          </div>
                        </button>

                        {/* Déjeuner */}
                        <button
                          onClick={() => setSelectedMeal(meals.lunch)}
                          className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{meals.lunch.emoji}</span>
                              <div>
                                <p className="text-white font-medium">{meals.lunch.name}</p>
                                <p className="text-white/60 text-sm">
                                  {meals.lunch.calories} cal · {meals.lunch.protein}g protéines
                                </p>
                              </div>
                            </div>
                            <Clock className="w-4 h-4 text-white/60" />
                          </div>
                        </button>

                        {/* Dîner */}
                        <button
                          onClick={() => setSelectedMeal(meals.dinner)}
                          className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{meals.dinner.emoji}</span>
                              <div>
                                <p className="text-white font-medium">{meals.dinner.name}</p>
                                <p className="text-white/60 text-sm">
                                  {meals.dinner.calories} cal · {meals.dinner.protein}g protéines
                                </p>
                              </div>
                            </div>
                            <Clock className="w-4 h-4 text-white/60" />
                          </div>
                        </button>

                        {/* Snacks */}
                        {meals.snacks.map((snack, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedMeal(snack)}
                            className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{snack.emoji}</span>
                                <div>
                                  <p className="text-white font-medium">{snack.name}</p>
                                  <p className="text-white/60 text-sm">
                                    {snack.calories} cal · Collation {idx + 1}
                                  </p>
                                </div>
                              </div>
                              <Clock className="w-4 h-4 text-white/60" />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Liste de courses */}
            {shoppingList && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-7 h-7 text-green-400" />
                  Liste de courses
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(shoppingList).map(([category, items]) => (
                    <div key={category} className="bg-white/5 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">{category}</h3>
                      <div className="space-y-2">
                        {items.map((item, idx) => (
                          <label
                            key={idx}
                            className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={checkedItems.has(item)}
                              onChange={() => toggleShoppingItem(item)}
                              className="w-5 h-5 rounded border-2 border-white/30 checked:bg-green-500 checked:border-green-500"
                            />
                            <span className={`text-white ${checkedItems.has(item) ? 'line-through opacity-50' : ''}`}>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-indigo-950 to-purple-900 rounded-2xl p-6 max-w-2xl w-full border border-white/20 my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Préférences alimentaires</h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Type de régime */}
              <div>
                <label className="block text-white font-medium mb-3">Type de régime</label>
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
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.emoji}</div>
                      <div className="text-white font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nombre de repas */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Repas par jour : {dailyMeals}
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

              {/* Nombre de snacks */}
              <div>
                <label className="block text-white font-medium mb-3">
                  Collations par jour : {snacksPerDay}
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

              {/* Temps de cuisine */}
              <div>
                <label className="block text-white font-medium mb-3">Temps de préparation</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'quick', label: 'Rapide', time: '< 15 min' },
                    { value: 'medium', label: 'Moyen', time: '15-30 min' },
                    { value: 'elaborate', label: 'Élaboré', time: '> 30 min' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setCookingTime(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        cookingTime === option.value
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-white font-medium mb-1">{option.label}</div>
                      <div className="text-white/60 text-sm">{option.time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-white font-medium mb-3">Budget</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'low', label: 'Économique', emoji: '💰' },
                    { value: 'medium', label: 'Moyen', emoji: '💰💰' },
                    { value: 'high', label: 'Élevé', emoji: '💰💰💰' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setBudgetLevel(option.value as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        budgetLevel === option.value
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-white font-medium text-sm">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowPreferences(false)}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
              >
                Annuler
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all font-semibold"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Détails du repas */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gradient-to-br from-indigo-950 to-purple-900 rounded-2xl p-6 max-w-2xl w-full border border-white/20 my-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedMeal.emoji}</span>
                <h2 className="text-2xl font-bold text-white">{selectedMeal.name}</h2>
              </div>
              <button
                onClick={() => setSelectedMeal(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Calories</p>
                <p className="text-2xl font-bold text-white">{selectedMeal.calories}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Protéines</p>
                <p className="text-2xl font-bold text-white">{selectedMeal.protein}g</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Glucides</p>
                <p className="text-2xl font-bold text-white">{selectedMeal.carbs}g</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Lipides</p>
                <p className="text-2xl font-bold text-white">{selectedMeal.fats}g</p>
              </div>
            </div>

            {/* Temps de préparation */}
            <div className="flex items-center gap-2 text-white/70 mb-6">
              <Clock className="w-5 h-5" />
              <span>Temps de préparation : {selectedMeal.prepTime} min</span>
            </div>

            {/* Ingrédients */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-3">Ingrédients</h3>
              <ul className="space-y-2">
                {selectedMeal.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white/80">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Préparation</h3>
              <ol className="space-y-3">
                {selectedMeal.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-white/80">{instruction}</span>
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