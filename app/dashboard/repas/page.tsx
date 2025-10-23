'use client'

import { useState, useEffect } from 'react'
import { 
  ChefHat, 
  Coffee, 
  Sun, 
  Moon, 
  Apple,
  ShoppingCart,
  Check,
  Settings,
  Calendar,
  X,
  Save,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react'

type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'
type DietaryPreference = 'standard' | 'vegetarian' | 'vegan' | 'gluten_free' | 'halal'
type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'

interface Meal {
  type: MealType
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
}

interface ShoppingItem {
  id: string
  name: string
  quantity: string
  category: string
  checked: boolean
}

interface NutritionalNeeds {
  calories: number
  protein: number
  carbs: number
  fats: number
}

export default function RepasPage() {
  const [showPreferences, setShowPreferences] = useState(false)
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference>('standard')
  const [currentDay, setCurrentDay] = useState(1)
  const [userGoal, setUserGoal] = useState<Goal>('lose_weight')
  const [currentWeight, setCurrentWeight] = useState(80)
  const [targetWeight, setTargetWeight] = useState(75)
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([])

  const dietaryOptions = [
    { value: 'standard', label: 'Standard', icon: '🍽️', description: 'Tous types d\'aliments' },
    { value: 'vegetarian', label: 'Végétarien', icon: '🥗', description: 'Sans viande ni poisson' },
    { value: 'vegan', label: 'Végan', icon: '🌱', description: 'Aucun produit animal' },
    { value: 'gluten_free', label: 'Sans gluten', icon: '🌾', description: 'Sans blé, orge, seigle' },
    { value: 'halal', label: 'Halal', icon: '☪️', description: 'Conforme aux règles islamiques' }
  ]

  const calculateNutritionalNeeds = (): NutritionalNeeds => {
    const baseMultiplier = 24
    const basalMetabolicRate = currentWeight * baseMultiplier
    
    let calorieAdjustment = 0
    let proteinMultiplier = 0
    let carbsPercentage = 0
    let fatsPercentage = 0
    
    if (userGoal === 'lose_weight') {
      const deficit = Math.abs(currentWeight - targetWeight) > 10 ? 500 : 300
      calorieAdjustment = -deficit
      proteinMultiplier = 2.0
      carbsPercentage = 0.40
      fatsPercentage = 0.25
    } else if (userGoal === 'gain_muscle') {
      const surplus = Math.abs(currentWeight - targetWeight) > 10 ? 500 : 300
      calorieAdjustment = surplus
      proteinMultiplier = 2.2
      carbsPercentage = 0.45
      fatsPercentage = 0.25
    } else {
      calorieAdjustment = 0
      proteinMultiplier = 1.8
      carbsPercentage = 0.45
      fatsPercentage = 0.30
    }
    
    const totalCalories = Math.round(basalMetabolicRate + calorieAdjustment)
    const protein = Math.round(currentWeight * proteinMultiplier)
    const carbsCalories = totalCalories * carbsPercentage
    const carbs = Math.round(carbsCalories / 4)
    const fatsCalories = totalCalories * fatsPercentage
    const fats = Math.round(fatsCalories / 9)
    
    return { calories: totalCalories, protein, carbs, fats }
  }

  const nutritionalNeeds = calculateNutritionalNeeds()

  const mealDatabase: Record<DietaryPreference, Meal[]> = {
    standard: [
      {
        type: 'breakfast',
        name: 'Omelette protéinée aux légumes',
        calories: 380,
        protein: 28,
        carbs: 25,
        fats: 18,
        ingredients: ['3 œufs entiers', '1 blanc d\'œuf', '50g champignons', '1 tomate', '50g épinards', '1 tranche pain complet', '10g beurre']
      },
      {
        type: 'breakfast',
        name: 'Porridge protéiné aux fruits',
        calories: 420,
        protein: 25,
        carbs: 55,
        fats: 12,
        ingredients: ['60g flocons d\'avoine', '30g whey protéine', '1 banane', '150ml lait', '15g amandes', '1 c.à.c miel']
      },
      {
        type: 'lunch',
        name: 'Poulet grillé, riz et légumes',
        calories: 520,
        protein: 45,
        carbs: 50,
        fats: 14,
        ingredients: ['180g poulet', '100g riz basmati', '150g brocolis', '100g carottes', '1 c.à.s huile d\'olive', 'Épices']
      },
      {
        type: 'lunch',
        name: 'Saumon, quinoa et asperges',
        calories: 480,
        protein: 38,
        carbs: 42,
        fats: 18,
        ingredients: ['150g saumon', '80g quinoa', '200g asperges', 'Citron', '1 c.à.s huile d\'olive', 'Aneth']
      },
      {
        type: 'dinner',
        name: 'Dinde sautée aux légumes asiatiques',
        calories: 420,
        protein: 40,
        carbs: 35,
        fats: 12,
        ingredients: ['160g dinde', '80g nouilles de riz', 'Brocolis', 'Poivrons', 'Sauce soja', 'Gingembre', 'Ail']
      },
      {
        type: 'dinner',
        name: 'Bœuf maigre et patate douce',
        calories: 460,
        protein: 42,
        carbs: 40,
        fats: 14,
        ingredients: ['150g bœuf maigre', '200g patate douce', '150g haricots verts', '1 c.à.s huile d\'olive', 'Herbes de Provence']
      },
      {
        type: 'snack',
        name: 'Yaourt grec et fruits rouges',
        calories: 200,
        protein: 18,
        carbs: 22,
        fats: 5,
        ingredients: ['200g yaourt grec 0%', '100g fruits rouges', '15g miel', '10g amandes effilées']
      },
      {
        type: 'snack',
        name: 'Shake protéiné banane',
        calories: 280,
        protein: 25,
        carbs: 28,
        fats: 10,
        ingredients: ['30g whey protéine', '1 banane', '200ml lait écrémé', '1 c.à.s beurre de cacahuète', 'Cannelle']
      }
    ],
    vegetarian: [
      {
        type: 'breakfast',
        name: 'Pancakes protéinés végétariens',
        calories: 400,
        protein: 22,
        carbs: 48,
        fats: 14,
        ingredients: ['50g flocons d\'avoine', '2 œufs', '20g protéine végétale', '1 banane', '15g beurre d\'amande', 'Sirop d\'érable']
      },
      {
        type: 'breakfast',
        name: 'Bowl smoothie protéiné',
        calories: 380,
        protein: 20,
        carbs: 52,
        fats: 12,
        ingredients: ['30g protéine végétale', '1 banane', '100g fruits rouges', '30g granola', '20g graines de chia', '150ml lait d\'amande']
      },
      {
        type: 'lunch',
        name: 'Buddha bowl végétarien complet',
        calories: 520,
        protein: 24,
        carbs: 62,
        fats: 20,
        ingredients: ['100g quinoa', '150g pois chiches', '100g patate douce', '1/2 avocat', 'Épinards', 'Graines de sésame', 'Sauce tahini']
      },
      {
        type: 'lunch',
        name: 'Curry de lentilles et légumes',
        calories: 480,
        protein: 22,
        carbs: 58,
        fats: 16,
        ingredients: ['150g lentilles corail', '100g lait de coco', 'Curry', 'Épinards', 'Tomates', '80g riz basmati', 'Coriandre']
      },
      {
        type: 'dinner',
        name: 'Tofu croustillant et légumes sautés',
        calories: 440,
        protein: 28,
        carbs: 42,
        fats: 18,
        ingredients: ['200g tofu ferme', 'Brocolis', 'Poivrons', 'Carottes', '80g riz complet', 'Sauce soja', 'Sésame']
      },
      {
        type: 'dinner',
        name: 'Omelette végétarienne aux légumes',
        calories: 380,
        protein: 26,
        carbs: 28,
        fats: 18,
        ingredients: ['3 œufs', 'Champignons', 'Poivrons', 'Oignons', '50g fromage', 'Salade verte', 'Pain complet']
      },
      {
        type: 'snack',
        name: 'Energy balls protéinées',
        calories: 220,
        protein: 12,
        carbs: 26,
        fats: 10,
        ingredients: ['40g flocons d\'avoine', '20g protéine végétale', '5 dattes', '15g beurre d\'amande', 'Cacao', 'Graines de lin']
      },
      {
        type: 'snack',
        name: 'Cottage cheese et fruits',
        calories: 200,
        protein: 16,
        carbs: 24,
        fats: 6,
        ingredients: ['150g cottage cheese', '1 pomme', '15g noix', 'Cannelle', '1 c.à.c miel']
      }
    ],
    vegan: [
      {
        type: 'breakfast',
        name: 'Tofu brouillé et toast avocat',
        calories: 420,
        protein: 24,
        carbs: 38,
        fats: 20,
        ingredients: ['200g tofu soyeux', '1/2 avocat', '2 tranches pain complet', 'Tomates cerises', 'Curcuma', 'Levure nutritionnelle']
      },
      {
        type: 'breakfast',
        name: 'Overnight oats protéinés végan',
        calories: 400,
        protein: 20,
        carbs: 52,
        fats: 14,
        ingredients: ['60g flocons d\'avoine', '30g protéine végétale', '250ml lait de soja', '1 banane', '20g beurre de cacahuète', 'Graines de chia']
      },
      {
        type: 'lunch',
        name: 'Bowl tempeh et légumes rôtis',
        calories: 520,
        protein: 28,
        carbs: 58,
        fats: 20,
        ingredients: ['150g tempeh', '100g quinoa', 'Patate douce', 'Brocolis', 'Pois chiches', 'Sauce tahini', 'Graines de courge']
      },
      {
        type: 'lunch',
        name: 'Chili végan aux haricots',
        calories: 480,
        protein: 22,
        carbs: 62,
        fats: 16,
        ingredients: ['150g haricots rouges', '100g haricots noirs', 'Tomates', 'Maïs', 'Poivrons', '80g riz', 'Épices mexicaines']
      },
      {
        type: 'dinner',
        name: 'Seitan sauté façon asiatique',
        calories: 460,
        protein: 32,
        carbs: 48,
        fats: 14,
        ingredients: ['180g seitan', '80g nouilles soba', 'Pak choi', 'Champignons', 'Sauce soja', 'Gingembre', 'Sésame']
      },
      {
        type: 'dinner',
        name: 'Curry de pois chiches végan',
        calories: 440,
        protein: 20,
        carbs: 56,
        fats: 16,
        ingredients: ['200g pois chiches', '100ml lait de coco', 'Épinards', 'Tomates', '80g riz basmati', 'Curry', 'Coriandre']
      },
      {
        type: 'snack',
        name: 'Smoothie protéiné végan',
        calories: 280,
        protein: 22,
        carbs: 32,
        fats: 10,
        ingredients: ['30g protéine de pois', '1 banane', '250ml lait d\'avoine', '1 c.à.s beurre d\'amande', 'Épinards', 'Cacao']
      },
      {
        type: 'snack',
        name: 'Houmous et crudités',
        calories: 220,
        protein: 10,
        carbs: 24,
        fats: 11,
        ingredients: ['100g houmous', 'Carottes', 'Concombre', 'Poivrons', 'Pain pita complet']
      }
    ],
    gluten_free: [
      {
        type: 'breakfast',
        name: 'Omelette champignons sans gluten',
        calories: 380,
        protein: 26,
        carbs: 32,
        fats: 18,
        ingredients: ['3 œufs', '100g champignons', '1 galette sarrasin', 'Fromage', 'Tomates cerises', 'Herbes']
      },
      {
        type: 'breakfast',
        name: 'Porridge sans gluten protéiné',
        calories: 400,
        protein: 24,
        carbs: 48,
        fats: 14,
        ingredients: ['60g flocons sans gluten', '30g whey', '1 banane', '150ml lait', '15g amandes', 'Miel']
      },
      {
        type: 'lunch',
        name: 'Poulet, riz complet et légumes',
        calories: 500,
        protein: 44,
        carbs: 48,
        fats: 14,
        ingredients: ['180g poulet', '100g riz complet', 'Brocolis', 'Carottes', 'Courgettes', 'Huile d\'olive']
      },
      {
        type: 'lunch',
        name: 'Saumon, patate douce et asperges',
        calories: 480,
        protein: 38,
        carbs: 42,
        fats: 18,
        ingredients: ['150g saumon', '200g patate douce', '150g asperges', 'Citron', 'Huile d\'olive', 'Aneth']
      },
      {
        type: 'dinner',
        name: 'Bœuf et légumes sautés sans gluten',
        calories: 440,
        protein: 40,
        carbs: 38,
        fats: 16,
        ingredients: ['150g bœuf', '80g nouilles de riz', 'Poivrons', 'Brocolis', 'Sauce tamari', 'Gingembre']
      },
      {
        type: 'dinner',
        name: 'Poisson blanc et quinoa',
        calories: 420,
        protein: 38,
        carbs: 40,
        fats: 12,
        ingredients: ['180g cabillaud', '100g quinoa', 'Haricots verts', 'Tomates', 'Citron', 'Herbes']
      },
      {
        type: 'snack',
        name: 'Yaourt protéiné sans gluten',
        calories: 200,
        protein: 18,
        carbs: 22,
        fats: 6,
        ingredients: ['200g yaourt grec', '100g fruits rouges', '15g miel', 'Amandes']
      },
      {
        type: 'snack',
        name: 'Shake protéiné et fruit',
        calories: 260,
        protein: 24,
        carbs: 28,
        fats: 8,
        ingredients: ['30g whey sans gluten', '1 pomme', '200ml lait', '10g amandes', 'Cannelle']
      }
    ],
    halal: [
      {
        type: 'breakfast',
        name: 'Œufs brouillés et pain complet',
        calories: 380,
        protein: 26,
        carbs: 32,
        fats: 18,
        ingredients: ['3 œufs', '2 tranches pain complet', 'Tomates', 'Fromage halal', 'Olives', 'Menthe']
      },
      {
        type: 'breakfast',
        name: 'Msemen et œufs au plat',
        calories: 420,
        protein: 22,
        carbs: 48,
        fats: 16,
        ingredients: ['2 msemen', '2 œufs', 'Miel', '1 orange', 'Thé à la menthe']
      },
      {
        type: 'lunch',
        name: 'Poulet halal mariné et couscous',
        calories: 520,
        protein: 42,
        carbs: 54,
        fats: 14,
        ingredients: ['180g poulet halal', '100g couscous', 'Légumes couscous', 'Pois chiches', 'Épices', 'Harissa']
      },
      {
        type: 'lunch',
        name: 'Kefta d\'agneau et taboulé',
        calories: 500,
        protein: 38,
        carbs: 46,
        fats: 18,
        ingredients: ['150g agneau haché halal', '100g boulgour', 'Persil', 'Tomates', 'Menthe', 'Citron', 'Épices']
      },
      {
        type: 'dinner',
        name: 'Tagine de poulet aux légumes',
        calories: 460,
        protein: 40,
        carbs: 42,
        fats: 14,
        ingredients: ['170g poulet halal', 'Courgettes', 'Carottes', 'Pois chiches', '80g riz', 'Épices marocaines', 'Citron confit']
      },
      {
        type: 'dinner',
        name: 'Brochettes de bœuf et légumes',
        calories: 440,
        protein: 42,
        carbs: 36,
        fats: 16,
        ingredients: ['160g bœuf halal', 'Poivrons', 'Oignons', 'Tomates', '80g riz pilaf', 'Épices', 'Yaourt']
      },
      {
        type: 'snack',
        name: 'Labneh et dattes',
        calories: 220,
        protein: 12,
        carbs: 28,
        fats: 8,
        ingredients: ['100g labneh', '4 dattes', '15g noix', 'Miel', 'Pain pita']
      },
      {
        type: 'snack',
        name: 'Smoothie dattes et amandes',
        calories: 280,
        protein: 18,
        carbs: 32,
        fats: 12,
        ingredients: ['3 dattes', '250ml lait', '20g amandes', '1 banane', 'Cannelle', 'Cardamome']
      }
    ]
  }

  const selectMeals = (): Meal[] => {
    const availableMeals = mealDatabase[dietaryPreference]
    const selectedMeals: Meal[] = []
    
    const calorieDistribution = {
      breakfast: 0.25,
      lunch: 0.35,
      dinner: 0.30,
      snack: 0.10
    }
    
    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']
    
    mealTypes.forEach(type => {
      const targetCalories = nutritionalNeeds.calories * calorieDistribution[type]
      const mealsOfType = availableMeals.filter(m => m.type === type)
      
      const closestMeal = mealsOfType.reduce((prev, curr) => {
        return Math.abs(curr.calories - targetCalories) < Math.abs(prev.calories - targetCalories)
          ? curr
          : prev
      })
      
      selectedMeals.push(closestMeal)
    })
    
    return selectedMeals
  }

  const currentMeals = selectMeals()

  const actualTotals = currentMeals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

  useEffect(() => {
    const meals = selectMeals()
    const newList: ShoppingItem[] = []
    let id = 1
    
    meals.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        newList.push({
          id: `item-${id++}`,
          name: ingredient,
          quantity: '1 unité',
          category: meal.type,
          checked: false
        })
      })
    })
    
    setShoppingList(newList)
  }, [dietaryPreference, userGoal, currentWeight, targetWeight])

  const toggleShoppingItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const getMealIcon = (type: MealType) => {
    switch (type) {
      case 'breakfast': return <Coffee className="w-5 h-5" />
      case 'lunch': return <Sun className="w-5 h-5" />
      case 'dinner': return <Moon className="w-5 h-5" />
      case 'snack': return <Apple className="w-5 h-5" />
    }
  }

  const getMealLabel = (type: MealType) => {
    switch (type) {
      case 'breakfast': return 'Petit-déjeuner'
      case 'lunch': return 'Déjeuner'
      case 'dinner': return 'Dîner'
      case 'snack': return 'Collation'
    }
  }

  const getGoalIcon = () => {
    if (userGoal === 'lose_weight') return <TrendingDown className="w-5 h-5" />
    if (userGoal === 'gain_muscle') return <TrendingUp className="w-5 h-5" />
    return <Minus className="w-5 h-5" />
  }

  const getGoalLabel = () => {
    if (userGoal === 'lose_weight') return 'Perte de poids'
    if (userGoal === 'gain_muscle') return 'Prise de muscle'
    return 'Maintien'
  }

  const getGoalColor = () => {
    if (userGoal === 'lose_weight') return 'from-red-500 to-orange-500'
    if (userGoal === 'gain_muscle') return 'from-blue-500 to-purple-500'
    return 'from-green-500 to-teal-500'
  }

  const checkedCount = shoppingList.filter(item => item.checked).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Plan repas personnalisé
            </h1>
            <p className="text-gray-600">
              Adapté à votre objectif et vos préférences alimentaires
            </p>
          </div>
          <button
            onClick={() => setShowPreferences(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-300 transition"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Préférences</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className={`bg-gradient-to-br ${getGoalColor()} rounded-xl p-5 text-white`}>
            <div className="flex items-center gap-3 mb-2">
              {getGoalIcon()}
              <h3 className="font-semibold">Votre objectif</h3>
            </div>
            <p className="text-2xl font-bold">{getGoalLabel()}</p>
            <p className="text-sm text-white/80 mt-1">
              {currentWeight}kg → {targetWeight}kg ({Math.abs(currentWeight - targetWeight)}kg)
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <ChefHat className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Régime alimentaire</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {dietaryOptions.find(d => d.value === dietaryPreference)?.label}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {dietaryOptions.find(d => d.value === dietaryPreference)?.description}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Plan hebdomadaire</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">7 jours</p>
            <p className="text-sm text-gray-600 mt-1">
              4 repas personnalisés par jour
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-purple-600" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => setCurrentDay(day)}
                className={`w-12 h-12 rounded-xl font-semibold transition ${
                  currentDay === day
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">Jour de la semaine</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Comparaison Besoins / Apports
          </h3>
<div className="grid grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Calories</span>
                <span className="text-xs font-medium text-purple-600">
                  {Math.round((actualTotals.calories / nutritionalNeeds.calories) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                  style={{ width: `${Math.min((actualTotals.calories / nutritionalNeeds.calories) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-orange-600">{actualTotals.calories}</span>
                <span className="text-gray-500">/ {nutritionalNeeds.calories}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Protéines</span>
                <span className="text-xs font-medium text-purple-600">
                  {Math.round((actualTotals.protein / nutritionalNeeds.protein) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                  style={{ width: `${Math.min((actualTotals.protein / nutritionalNeeds.protein) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-blue-600">{actualTotals.protein}g</span>
                <span className="text-gray-500">/ {nutritionalNeeds.protein}g</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Glucides</span>
                <span className="text-xs font-medium text-purple-600">
                  {Math.round((actualTotals.carbs / nutritionalNeeds.carbs) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                  style={{ width: `${Math.min((actualTotals.carbs / nutritionalNeeds.carbs) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-green-600">{actualTotals.carbs}g</span>
                <span className="text-gray-500">/ {nutritionalNeeds.carbs}g</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Lipides</span>
                <span className="text-xs font-medium text-purple-600">
                  {Math.round((actualTotals.fats / nutritionalNeeds.fats) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 transition-all"
                  style={{ width: `${Math.min((actualTotals.fats / nutritionalNeeds.fats) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-yellow-600">{actualTotals.fats}g</span>
                <span className="text-gray-500">/ {nutritionalNeeds.fats}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {currentMeals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                  {getMealIcon(meal.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm">
                    {getMealLabel(meal.type)}
                  </h3>
                  <p className="text-white/90 font-bold text-lg">
                    {meal.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-xs">Calories</p>
                  <p className="text-white font-bold text-xl">{meal.calories}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 mb-1">Protéines</p>
                    <p className="text-lg font-bold text-blue-700">{meal.protein}g</p>
                  </div>
                  <div className="flex-1 bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 mb-1">Glucides</p>
                    <p className="text-lg font-bold text-green-700">{meal.carbs}g</p>
                  </div>
                  <div className="flex-1 bg-yellow-50 rounded-lg p-3">
                    <p className="text-xs text-yellow-600 mb-1">Lipides</p>
                    <p className="text-lg font-bold text-yellow-700">{meal.fats}g</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <ChefHat className="w-4 h-4" />
                    Ingrédients
                  </h4>
                  <ul className="space-y-1">
                    {meal.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 sticky top-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold text-white">
                  Liste de courses
                </h3>
              </div>
              <p className="text-white/90 text-sm">
                {checkedCount} / {shoppingList.length} articles achetés
              </p>
              <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${shoppingList.length > 0 ? (checkedCount / shoppingList.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto">
              {shoppingList.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Aucun article dans la liste
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {shoppingList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleShoppingItem(item.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${
                        item.checked
                          ? 'bg-green-50 border-green-300'
                          : 'bg-white border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                        item.checked
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}>
                        {item.checked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          item.checked ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPreferences && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPreferences(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Préférences alimentaires
                </h2>
                <p className="text-white/90 text-sm">
                  Personnalisez vos repas selon vos besoins et contraintes
                </p>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Votre objectif actuel
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setUserGoal('lose_weight')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userGoal === 'lose_weight'
                        ? 'border-red-500 bg-red-50 shadow-lg'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">🔥</div>
                    <p className="font-semibold text-gray-800 text-sm">Perdre du poids</p>
                    {userGoal === 'lose_weight' && (
                      <div className="mt-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => setUserGoal('gain_muscle')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userGoal === 'gain_muscle'
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">💪</div>
                    <p className="font-semibold text-gray-800 text-sm">Prendre du muscle</p>
                    {userGoal === 'gain_muscle' && (
                      <div className="mt-2 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => setUserGoal('maintain')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      userGoal === 'maintain'
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">⚖️</div>
                    <p className="font-semibold text-gray-800 text-sm">Maintenir</p>
                    {userGoal === 'maintain' && (
                      <div className="mt-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mx-auto">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-purple-600" />
                  Vos données corporelles
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids actuel (kg)
                    </label>
                    <input
                      type="number"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poids cible (kg)
                    </label>
                    <input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Apple className="w-5 h-5 text-purple-600" />
                  Régime alimentaire
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDietaryPreference(option.value as DietaryPreference)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        dietaryPreference === option.value
                          ? 'border-purple-500 bg-purple-50 shadow-lg'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{option.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{option.label}</p>
                          <p className="text-xs text-gray-600">{option.description}</p>
                        </div>
                        {dietaryPreference === option.value && (
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  📊 Vos besoins nutritionnels calculés
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Calories</p>
                    <p className="text-xl font-bold text-orange-600">{nutritionalNeeds.calories}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Protéines</p>
                    <p className="text-xl font-bold text-blue-600">{nutritionalNeeds.protein}g</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Glucides</p>
                    <p className="text-xl font-bold text-green-600">{nutritionalNeeds.carbs}g</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-600 mb-1">Lipides</p>
                    <p className="text-xl font-bold text-yellow-600">{nutritionalNeeds.fats}g</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowPreferences(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Enregistrer et générer mon plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}