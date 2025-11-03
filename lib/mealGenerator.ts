export interface Meal {
  name: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
  instructions: string[]
  prepTime: number
  emoji: string
}

export interface DayMeals {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks: Meal[]
}

// Base de données simplifiée de repas
const mealDatabase = {
  breakfast: [
    {
      name: 'Omelette aux légumes',
      calories: 350,
      protein: 25,
      carbs: 15,
      fats: 20,
      ingredients: ['3 œufs', 'Poivrons', 'Oignons', 'Épinards', 'Huile d\'olive'],
      instructions: [
        'Battre les œufs dans un bol',
        'Faire revenir les légumes',
        'Ajouter les œufs et cuire 5 min'
      ],
      prepTime: 15,
      emoji: '🍳'
    },
    {
      name: 'Porridge protéiné',
      calories: 400,
      protein: 20,
      carbs: 55,
      fats: 10,
      ingredients: ['Flocons d\'avoine 60g', 'Lait d\'amande 250ml', 'Banane', 'Miel', 'Amandes'],
      instructions: [
        'Faire chauffer le lait',
        'Ajouter les flocons d\'avoine',
        'Cuire 5 min en remuant',
        'Ajouter la banane et les amandes'
      ],
      prepTime: 10,
      emoji: '🥣'
    },
    {
      name: 'Toast avocat et œuf',
      calories: 380,
      protein: 18,
      carbs: 35,
      fats: 18,
      ingredients: ['Pain complet 2 tranches', 'Avocat 1/2', 'Œuf', 'Tomate', 'Sel, poivre'],
      instructions: [
        'Griller le pain',
        'Écraser l\'avocat avec sel et poivre',
        'Cuire l\'œuf au plat',
        'Assembler le tout'
      ],
      prepTime: 10,
      emoji: '🥑'
    }
  ],
  lunch: [
    {
      name: 'Poulet grillé et quinoa',
      calories: 500,
      protein: 45,
      carbs: 50,
      fats: 12,
      ingredients: ['Poulet 150g', 'Quinoa 80g', 'Brocoli', 'Carottes', 'Huile d\'olive'],
      instructions: [
        'Cuire le quinoa 15 min',
        'Griller le poulet',
        'Cuire les légumes à la vapeur',
        'Assaisonner'
      ],
      prepTime: 25,
      emoji: '🍗'
    },
    {
      name: 'Salade César protéinée',
      calories: 450,
      protein: 40,
      carbs: 25,
      fats: 20,
      ingredients: ['Poulet 150g', 'Laitue romaine', 'Parmesan', 'Croûtons', 'Sauce César légère'],
      instructions: [
        'Griller le poulet',
        'Laver et couper la salade',
        'Préparer la sauce',
        'Assembler et mélanger'
      ],
      prepTime: 15,
      emoji: '🥗'
    },
    {
      name: 'Bowl Buddha végétarien',
      calories: 480,
      protein: 20,
      carbs: 65,
      fats: 15,
      ingredients: ['Riz brun 80g', 'Pois chiches 100g', 'Patate douce', 'Avocat', 'Tahini'],
      instructions: [
        'Cuire le riz',
        'Rôtir la patate douce',
        'Faire revenir les pois chiches',
        'Assembler dans un bol'
      ],
      prepTime: 30,
      emoji: '🥙'
    }
  ],
  dinner: [
    {
      name: 'Saumon et légumes vapeur',
      calories: 450,
      protein: 40,
      carbs: 30,
      fats: 18,
      ingredients: ['Saumon 150g', 'Haricots verts', 'Courgettes', 'Riz basmati 60g', 'Citron'],
      instructions: [
        'Cuire le riz',
        'Cuire le saumon au four 15 min',
        'Cuire les légumes à la vapeur',
        'Servir avec citron'
      ],
      prepTime: 25,
      emoji: '🐟'
    },
    {
      name: 'Tacos de bœuf maison',
      calories: 520,
      protein: 35,
      carbs: 45,
      fats: 20,
      ingredients: ['Bœuf haché 120g', 'Tortillas 2', 'Tomates', 'Salade', 'Fromage', 'Épices'],
      instructions: [
        'Faire revenir le bœuf avec épices',
        'Réchauffer les tortillas',
        'Préparer les légumes',
        'Assembler les tacos'
      ],
      prepTime: 20,
      emoji: '🌮'
    },
    {
      name: 'Wok de crevettes et nouilles',
      calories: 460,
      protein: 30,
      carbs: 55,
      fats: 12,
      ingredients: ['Crevettes 150g', 'Nouilles de riz', 'Légumes variés', 'Sauce soja', 'Gingembre'],
      instructions: [
        'Cuire les nouilles',
        'Faire sauter les crevettes',
        'Ajouter les légumes',
        'Mélanger avec la sauce'
      ],
      prepTime: 15,
      emoji: '🍜'
    }
  ],
  snacks: [
    {
      name: 'Yaourt grec et fruits',
      calories: 150,
      protein: 15,
      carbs: 18,
      fats: 3,
      ingredients: ['Yaourt grec 150g', 'Myrtilles 50g', 'Miel 1 c.à.c'],
      instructions: ['Mélanger tous les ingrédients'],
      prepTime: 2,
      emoji: '🥛'
    },
    {
      name: 'Pomme et beurre d\'amande',
      calories: 180,
      protein: 5,
      carbs: 25,
      fats: 8,
      ingredients: ['Pomme 1', 'Beurre d\'amande 1 c.à.s'],
      instructions: ['Couper la pomme', 'Tartiner le beurre d\'amande'],
      prepTime: 2,
      emoji: '🍎'
    },
    {
      name: 'Smoothie protéiné',
      calories: 200,
      protein: 20,
      carbs: 25,
      fats: 3,
      ingredients: ['Whey 30g', 'Banane', 'Lait d\'amande 250ml', 'Épinards'],
      instructions: ['Mixer tous les ingrédients'],
      prepTime: 5,
      emoji: '🥤'
    }
  ]
}

export function generateWeeklyMealPlan(
  dailyCalories: number,
  numMeals: number = 3,
  numSnacks: number = 2,
  dietaryType: string = 'omnivore'
): Record<string, DayMeals> {
  const weekPlan: Record<string, DayMeals> = {}
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

  days.forEach(day => {
    weekPlan[day] = {
      breakfast: mealDatabase.breakfast[Math.floor(Math.random() * mealDatabase.breakfast.length)],
      lunch: mealDatabase.lunch[Math.floor(Math.random() * mealDatabase.lunch.length)],
      dinner: mealDatabase.dinner[Math.floor(Math.random() * mealDatabase.dinner.length)],
      snacks: Array(numSnacks).fill(null).map(() => 
        mealDatabase.snacks[Math.floor(Math.random() * mealDatabase.snacks.length)]
      )
    }
  })

  return weekPlan
}

export function generateShoppingList(weekPlan: Record<string, DayMeals>): Record<string, string[]> {
  const categories: Record<string, Set<string>> = {
    'Protéines': new Set(),
    'Légumes': new Set(),
    'Fruits': new Set(),
    'Féculents': new Set(),
    'Produits laitiers': new Set(),
    'Autres': new Set()
  }

  Object.values(weekPlan).forEach(day => {
    [day.breakfast, day.lunch, day.dinner, ...day.snacks].forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        // Catégorisation simple (à améliorer)
        if (ingredient.toLowerCase().includes('poulet') || 
            ingredient.toLowerCase().includes('bœuf') ||
            ingredient.toLowerCase().includes('poisson') ||
            ingredient.toLowerCase().includes('œuf') ||
            ingredient.toLowerCase().includes('crevettes')) {
          categories['Protéines'].add(ingredient)
        } else if (ingredient.toLowerCase().includes('salade') ||
                   ingredient.toLowerCase().includes('tomate') ||
                   ingredient.toLowerCase().includes('légumes') ||
                   ingredient.toLowerCase().includes('brocoli')) {
          categories['Légumes'].add(ingredient)
        } else if (ingredient.toLowerCase().includes('pomme') ||
                   ingredient.toLowerCase().includes('banane') ||
                   ingredient.toLowerCase().includes('fruits')) {
          categories['Fruits'].add(ingredient)
        } else if (ingredient.toLowerCase().includes('riz') ||
                   ingredient.toLowerCase().includes('quinoa') ||
                   ingredient.toLowerCase().includes('pain') ||
                   ingredient.toLowerCase().includes('pâtes')) {
          categories['Féculents'].add(ingredient)
        } else if (ingredient.toLowerCase().includes('yaourt') ||
                   ingredient.toLowerCase().includes('fromage') ||
                   ingredient.toLowerCase().includes('lait')) {
          categories['Produits laitiers'].add(ingredient)
        } else {
          categories['Autres'].add(ingredient)
        }
      })
    })
  })

  // Convertir Sets en Arrays
  const shoppingList: Record<string, string[]> = {}
  Object.entries(categories).forEach(([category, items]) => {
    if (items.size > 0) {
      shoppingList[category] = Array.from(items)
    }
  })

  return shoppingList
}