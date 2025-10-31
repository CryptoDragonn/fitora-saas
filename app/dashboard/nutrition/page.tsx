'use client'

import { useState } from 'react'
import { 
  Apple,
  Camera,
  Calculator,
  ShoppingCart,
  Brain,
  Bell,
  Sparkles,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
  Check,
  X,
  Upload,
  Wand2,
  RefreshCw,
  Save,
  Download
} from 'lucide-react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'
type DietType = 'standard' | 'vegetarian' | 'vegan' | 'halal' | 'keto' | 'paleo'

interface NutritionProfile {
  goal: Goal
  dietType: DietType
  dailyCalories: number
  protein: number
  carbs: number
  fats: number
}

export default function NutritionPage() {
  const [step, setStep] = useState<'welcome' | 'calculator' | 'plan' | 'scanner' | 'shopping'>('welcome')
  const [selectedGoal, setSelectedGoal] = useState<Goal>('lose_weight')
  const [selectedDiet, setSelectedDiet] = useState<DietType>('standard')
  const [nutritionProfile, setNutritionProfile] = useState<NutritionProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [scannedImage, setScannedImage] = useState<string | null>(null)

  const goals = [
    {
      id: 'lose_weight' as Goal,
      title: 'Perte de poids',
      description: 'Déficit calorique pour brûler les graisses',
      color: 'from-orange-500 to-red-500',
      emoji: '🔥'
    },
    {
      id: 'gain_muscle' as Goal,
      title: 'Prise de masse',
      description: 'Surplus calorique pour construire du muscle',
      color: 'from-blue-500 to-cyan-500',
      emoji: '💪'
    },
    {
      id: 'maintain' as Goal,
      title: 'Maintien',
      description: 'Équilibre pour stabiliser votre poids',
      color: 'from-green-500 to-emerald-500',
      emoji: '⚖️'
    }
  ]

  const dietTypes = [
    { id: 'standard' as DietType, label: 'Standard', icon: '🍽️', description: 'Régime équilibré' },
    { id: 'vegetarian' as DietType, label: 'Végétarien', icon: '🥗', description: 'Sans viande ni poisson' },
    { id: 'vegan' as DietType, label: 'Vegan', icon: '🌱', description: 'Sans produits animaux' },
    { id: 'halal' as DietType, label: 'Halal', icon: '☪️', description: 'Conforme aux règles halal' },
    { id: 'keto' as DietType, label: 'Keto', icon: '🥑', description: 'Faible en glucides' },
    { id: 'paleo' as DietType, label: 'Paleo', icon: '🥩', description: 'Alimentation ancestrale' }
  ]

  const features = [
    {
      icon: Brain,
      title: 'IA Nutritionniste',
      description: 'Menu personnalisé selon vos goûts et budget',
      color: 'from-purple-500 to-pink-500',
      action: () => setStep('calculator')
    },
    {
      icon: Calculator,
      title: 'Calculateur de macros',
      description: 'Calculez vos besoins caloriques précis',
      color: 'from-blue-500 to-cyan-500',
      action: () => setStep('calculator')
    },
    {
      icon: Camera,
      title: 'Scanner de repas',
      description: 'Prenez en photo pour analyser calories et macros',
      color: 'from-orange-500 to-red-500',
      action: () => setStep('scanner')
    },
    {
      icon: ShoppingCart,
      title: 'Liste de courses',
      description: 'Génération automatique de votre liste',
      color: 'from-green-500 to-emerald-500',
      action: () => setStep('shopping')
    },
    {
      icon: RefreshCw,
      title: 'Substitution intelligente',
      description: 'Remplacez les aliments que vous n\'aimez pas',
      color: 'from-yellow-500 to-orange-500',
      action: () => setStep('plan')
    },
    {
      icon: Bell,
      title: 'Rappels repas',
      description: 'Notifications pour manger et s\'hydrater',
      color: 'from-pink-500 to-rose-500',
      action: () => alert('Fonctionnalité bientôt disponible!')
    }
  ]

  const sampleMeals = [
    {
      time: 'Petit-déjeuner (8h00)',
      name: 'Bowl protéiné',
      items: ['Flocons d\'avoine (60g)', 'Banane (1)', 'Beurre de cacahuète (20g)', 'Miel (10g)'],
      calories: 450,
      protein: 18,
      carbs: 65,
      fats: 15,
      emoji: '🥣'
    },
    {
      time: 'Déjeuner (12h30)',
      name: 'Poulet et riz',
      items: ['Blanc de poulet (150g)', 'Riz basmati (80g)', 'Brocolis (200g)', 'Huile d\'olive (10ml)'],
      calories: 520,
      protein: 45,
      carbs: 55,
      fats: 12,
      emoji: '🍗'
    },
    {
      time: 'Collation (16h00)',
      name: 'Snack protéiné',
      items: ['Yaourt grec (150g)', 'Amandes (20g)', 'Fruits rouges (100g)'],
      calories: 280,
      protein: 22,
      carbs: 25,
      fats: 10,
      emoji: '🥤'
    },
    {
      time: 'Dîner (19h30)',
      name: 'Saumon et légumes',
      items: ['Filet de saumon (150g)', 'Patate douce (150g)', 'Haricots verts (200g)', 'Avocat (50g)'],
      calories: 580,
      protein: 40,
      carbs: 45,
      fats: 25,
      emoji: '🐟'
    }
  ]

  const handleGeneratePlan = () => {
    setLoading(true)
    setTimeout(() => {
      setNutritionProfile({
        goal: selectedGoal,
        dietType: selectedDiet,
        dailyCalories: 1800,
        protein: 125,
        carbs: 190,
        fats: 62
      })
      setLoading(false)
      setStep('plan')
    }, 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setScannedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // WELCOME SCREEN
  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Apple className="w-12 h-12 text-green-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Nutrition & Plan Alimentaire
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-xl text-gray-600">
              Votre nutritionniste IA personnel pour une alimentation optimale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={feature.action}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-purple-600 font-semibold">
                  Commencer
                  <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-black text-white mb-4">
              Prêt à transformer votre alimentation ? 🍏
            </h2>
            <p className="text-green-100 text-xl mb-8">
              Créez votre plan alimentaire personnalisé en 2 minutes
            </p>
            <button
              onClick={() => setStep('calculator')}
              className="px-12 py-5 bg-white text-green-600 rounded-full font-black text-xl hover:shadow-2xl transition-all hover:scale-110"
            >
              Créer mon plan maintenant 🚀
            </button>
          </div>

        </div>
      </div>
    )
  }

  // CALCULATOR SCREEN
  if (step === 'calculator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-4xl mx-auto">
          
          <button
            onClick={() => setStep('welcome')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Retour
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="text-center mb-12">
              <Calculator className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Créez votre plan personnalisé
              </h2>
              <p className="text-gray-600 text-lg">
                L'IA va générer un plan adapté à vos besoins
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                1. Quel est votre objectif ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-6 rounded-2xl border-4 transition-all duration-300 hover:scale-105 ${
                      selectedGoal === goal.id
                        ? `border-purple-500 bg-gradient-to-br ${goal.color} bg-opacity-10`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-5xl mb-3">{goal.emoji}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{goal.title}</h4>
                    <p className="text-gray-600 text-sm">{goal.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                2. Quel type d'alimentation préférez-vous ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {dietTypes.map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => setSelectedDiet(diet.id)}
                    className={`p-6 rounded-2xl border-4 transition-all duration-300 hover:scale-105 ${
                      selectedDiet === diet.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{diet.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{diet.label}</h4>
                    <p className="text-xs text-gray-600">{diet.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black text-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  Générer mon plan alimentaire ✨
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    )
  }

  // Retour simple pour les autres écrans (à compléter si besoin)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black text-gray-900 mb-4">
          Page en construction 🚧
        </h2>
        <button
          onClick={() => setStep('welcome')}
          className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold hover:shadow-xl transition"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}