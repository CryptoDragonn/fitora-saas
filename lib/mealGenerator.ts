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
  tags: string[] // 'vegetarian', 'vegan', 'pescatarian', 'quick', 'budget'
  portionMultiplier?: number
}

export interface DayMeals {
  breakfast: Meal
  lunch: Meal
  dinner: Meal
  snacks: Meal[]
}

// Base de données COMPLÈTE de repas avec tags
const mealDatabase = {
  breakfast: [
    {
      name: 'Omelette aux légumes',
      calories: 350,
      protein: 25,
      carbs: 15,
      fats: 20,
      ingredients: ['3 œufs', 'Poivrons 50g', 'Oignons 30g', 'Épinards 50g', 'Huile d\'olive 1 c.à.s'],
      instructions: [
        'Battre les œufs dans un bol avec sel et poivre',
        'Faire revenir les légumes coupés dans l\'huile d\'olive 3-4 min',
        'Ajouter les œufs battus et cuire 5 min à feu moyen',
        'Plier l\'omelette en deux et servir chaud'
      ],
      prepTime: 15,
      emoji: '🍳',
      tags: ['vegetarian', 'quick']
    },
    {
      name: 'Porridge protéiné',
      calories: 400,
      protein: 20,
      carbs: 55,
      fats: 10,
      ingredients: ['Flocons d\'avoine 60g', 'Lait d\'amande 250ml', 'Banane 1', 'Miel 1 c.à.s', 'Amandes 15g'],
      instructions: [
        'Faire chauffer le lait d\'amande',
        'Ajouter les flocons d\'avoine et remuer 5 min',
        'Ajouter la banane coupée, le miel et les amandes'
      ],
      prepTime: 10,
      emoji: '🥣',
      tags: ['vegan', 'vegetarian', 'quick']
    },
    {
      name: 'Toast avocat et œuf',
      calories: 380,
      protein: 18,
      carbs: 35,
      fats: 18,
      ingredients: ['Pain complet 2 tranches', 'Avocat 1/2', 'Œuf 1', 'Tomate 50g'],
      instructions: [
        'Griller le pain',
        'Écraser l\'avocat avec sel et poivre',
        'Cuire l\'œuf au plat',
        'Assembler le tout'
      ],
      prepTime: 10,
      emoji: '🥑',
      tags: ['vegetarian', 'quick']
    },
    {
      name: 'Smoothie bowl protéiné',
      calories: 420,
      protein: 25,
      carbs: 50,
      fats: 12,
      ingredients: ['Banane congelée 1', 'Myrtilles 100g', 'Protéine végétale 30g', 'Lait végétal 200ml', 'Granola 30g'],
      instructions: [
        'Mixer tous les ingrédients sauf le granola',
        'Verser dans un bol',
        'Ajouter le granola et décorer'
      ],
      prepTime: 5,
      emoji: '🥤',
      tags: ['vegan', 'vegetarian', 'quick']
    },
    {
      name: 'Pancakes protéinés',
      calories: 390,
      protein: 30,
      carbs: 40,
      fats: 10,
      ingredients: ['Flocons d\'avoine 50g', 'Œufs 2', 'Protéine en poudre 20g', 'Banane 1/2', 'Myrtilles 50g'],
      instructions: [
        'Mixer tous les ingrédients sauf les myrtilles',
        'Cuire des petits pancakes à la poêle 2-3 min/côté',
        'Servir avec les myrtilles'
      ],
      prepTime: 12,
      emoji: '🥞',
      tags: ['vegetarian', 'quick']
    },
    {
      name: 'Yaourt grec et granola',
      calories: 340,
      protein: 22,
      carbs: 42,
      fats: 8,
      ingredients: ['Yaourt grec 200g', 'Granola 40g', 'Fruits rouges 80g', 'Miel 1 c.à.c', 'Noix 10g'],
      instructions: [
        'Verser le yaourt dans un bol',
        'Ajouter le granola et les fruits',
        'Arroser de miel et ajouter les noix'
      ],
      prepTime: 3,
      emoji: '🥛',
      tags: ['vegetarian', 'quick', 'budget']
    },
    {
      name: 'Burrito petit-déjeuner',
      calories: 450,
      protein: 28,
      carbs: 45,
      fats: 16,
      ingredients: ['Tortilla complète 1', 'Œufs brouillés 2', 'Haricots noirs 50g', 'Avocat 1/4', 'Fromage 20g'],
      instructions: [
        'Faire des œufs brouillés',
        'Réchauffer les haricots',
        'Garnir la tortilla avec tous les ingrédients',
        'Rouler en burrito'
      ],
      prepTime: 12,
      emoji: '🌯',
      tags: ['vegetarian']
    },
    {
      name: 'Chia pudding protéiné',
      calories: 360,
      protein: 18,
      carbs: 38,
      fats: 14,
      ingredients: ['Graines de chia 30g', 'Lait d\'amande 250ml', 'Protéine vanille 20g', 'Mangue 80g', 'Noix de coco 10g'],
      instructions: [
        'Mélanger chia, lait et protéine',
        'Laisser reposer 2h au frigo (préparer la veille)',
        'Ajouter la mangue et la noix de coco'
      ],
      prepTime: 5,
      emoji: '🥥',
      tags: ['vegan', 'vegetarian']
    }
  ],
  lunch: [
    {
      name: 'Poulet grillé et quinoa',
      calories: 500,
      protein: 45,
      carbs: 50,
      fats: 12,
      ingredients: ['Poulet 150g', 'Quinoa 80g', 'Brocoli 100g', 'Carottes 80g', 'Huile d\'olive 1 c.à.s'],
      instructions: [
        'Cuire le quinoa 15 min',
        'Griller le poulet assaisonné 12-14 min',
        'Cuire les légumes à la vapeur 8-10 min',
        'Dresser et arroser d\'huile d\'olive'
      ],
      prepTime: 25,
      emoji: '🍗',
      tags: []
    },
    {
      name: 'Salade César protéinée',
      calories: 450,
      protein: 40,
      carbs: 25,
      fats: 20,
      ingredients: ['Poulet grillé 150g', 'Laitue 100g', 'Parmesan 20g', 'Croûtons 30g', 'Sauce César légère 2 c.à.s'],
      instructions: [
        'Griller le poulet et le trancher',
        'Laver et couper la laitue',
        'Préparer la sauce César au yaourt',
        'Assembler et mélanger'
      ],
      prepTime: 15,
      emoji: '🥗',
      tags: []
    },
    {
      name: 'Bowl Buddha végétarien',
      calories: 480,
      protein: 20,
      carbs: 65,
      fats: 15,
      ingredients: ['Riz brun 80g', 'Pois chiches 100g', 'Patate douce 150g', 'Avocat 1/2', 'Tahini 1 c.à.s'],
      instructions: [
        'Cuire le riz 25-30 min',
        'Rôtir la patate douce au four 20 min',
        'Faire revenir les pois chiches avec des épices',
        'Assembler avec avocat et tahini'
      ],
      prepTime: 30,
      emoji: '🥙',
      tags: ['vegan', 'vegetarian']
    },
    {
      name: 'Pâtes au saumon et épinards',
      calories: 520,
      protein: 35,
      carbs: 55,
      fats: 18,
      ingredients: ['Pâtes complètes 80g', 'Saumon 120g', 'Épinards 100g', 'Crème légère 50ml', 'Ail 1 gousse'],
      instructions: [
        'Cuire les pâtes',
        'Faire revenir ail et saumon en dés',
        'Ajouter épinards et crème',
        'Mélanger avec les pâtes'
      ],
      prepTime: 20,
      emoji: '🍝',
      tags: ['pescatarian']
    },
    {
      name: 'Wrap au thon et légumes',
      calories: 460,
      protein: 35,
      carbs: 45,
      fats: 14,
      ingredients: ['Tortilla complète 1', 'Thon au naturel 120g', 'Concombre 50g', 'Tomate 50g', 'Salade 30g', 'Yaourt grec 2 c.à.s'],
      instructions: [
        'Égoutter le thon',
        'Couper les légumes en dés',
        'Mélanger thon avec yaourt',
        'Garnir et rouler'
      ],
      prepTime: 10,
      emoji: '🌯',
      tags: ['pescatarian', 'quick']
    },
    {
      name: 'Steak de bœuf et légumes rôtis',
      calories: 550,
      protein: 48,
      carbs: 35,
      fats: 22,
      ingredients: ['Steak de bœuf 180g', 'Patates douces 120g', 'Asperges 100g', 'Champignons 80g', 'Huile d\'olive 1 c.à.s'],
      instructions: [
        'Couper les légumes et les rôtir au four 25 min',
        'Assaisonner et griller le steak 3-4 min/côté',
        'Laisser reposer 5 min',
        'Servir avec les légumes'
      ],
      prepTime: 30,
      emoji: '🥩',
      tags: []
    },
    {
      name: 'Curry de lentilles végétarien',
      calories: 470,
      protein: 22,
      carbs: 68,
      fats: 12,
      ingredients: ['Lentilles corail 100g', 'Lait de coco 150ml', 'Tomates 100g', 'Épinards 80g', 'Curry 2 c.à.s', 'Riz 60g'],
      instructions: [
        'Cuire le riz',
        'Faire revenir les épices',
        'Ajouter lentilles, tomates et lait de coco',
        'Mijoter 20 min, ajouter les épinards'
      ],
      prepTime: 30,
      emoji: '🍛',
      tags: ['vegan', 'vegetarian', 'budget']
    },
    {
      name: 'Tacos de poisson',
      calories: 490,
      protein: 38,
      carbs: 48,
      fats: 16,
      ingredients: ['Filet de poisson blanc 150g', 'Tortillas 2', 'Chou rouge 50g', 'Sauce yaourt 2 c.à.s', 'Coriandre', 'Citron vert'],
      instructions: [
        'Assaisonner et griller le poisson',
        'Émincer le chou',
        'Réchauffer les tortillas',
        'Assembler avec sauce et coriandre'
      ],
      prepTime: 18,
      emoji: '🌮',
      tags: ['pescatarian', 'quick']
    },
    {
      name: 'Riz sauté aux légumes et tofu',
      calories: 460,
      protein: 24,
      carbs: 58,
      fats: 14,
      ingredients: ['Riz brun 80g', 'Tofu ferme 120g', 'Légumes variés 150g', 'Sauce soja 2 c.à.s', 'Huile de sésame'],
      instructions: [
        'Cuire le riz la veille et le refroidir',
        'Faire sauter le tofu en cubes',
        'Ajouter les légumes',
        'Mélanger avec le riz et la sauce'
      ],
      prepTime: 20,
      emoji: '🍚',
      tags: ['vegan', 'vegetarian']
    },
    {
      name: 'Burger de dinde maison',
      calories: 510,
      protein: 42,
      carbs: 46,
      fats: 16,
      ingredients: ['Pain burger complet 1', 'Dinde hachée 140g', 'Salade 30g', 'Tomate 50g', 'Oignon 20g', 'Sauce yaourt'],
      instructions: [
        'Former un steak avec la dinde assaisonnée',
        'Griller 5-6 min/côté',
        'Toaster le pain',
        'Assembler le burger'
      ],
      prepTime: 18,
      emoji: '🍔',
      tags: []
    }
  ],
  dinner: [
    {
      name: 'Saumon et légumes vapeur',
      calories: 450,
      protein: 40,
      carbs: 30,
      fats: 18,
      ingredients: ['Saumon 150g', 'Haricots verts 100g', 'Courgettes 100g', 'Riz basmati 60g', 'Citron 1/2'],
      instructions: [
        'Cuire le riz 12 min',
        'Cuire le saumon au four 15 min à 180°C',
        'Cuire les légumes à la vapeur 8-10 min',
        'Servir avec du citron'
      ],
      prepTime: 25,
      emoji: '🐟',
      tags: ['pescatarian']
    },
    {
      name: 'Tacos de bœuf maison',
      calories: 520,
      protein: 35,
      carbs: 45,
      fats: 20,
      ingredients: ['Bœuf haché 120g', 'Tortillas 2', 'Tomates 80g', 'Salade 50g', 'Fromage 30g', 'Épices mexicaines'],
      instructions: [
        'Faire revenir le bœuf avec épices',
        'Réchauffer les tortillas',
        'Couper salade et tomates',
        'Assembler les tacos'
      ],
      prepTime: 20,
      emoji: '🌮',
      tags: []
    },
    {
      name: 'Wok de crevettes et nouilles',
      calories: 460,
      protein: 30,
      carbs: 55,
      fats: 12,
      ingredients: ['Crevettes 150g', 'Nouilles de riz 80g', 'Légumes variés 150g', 'Sauce soja 2 c.à.s', 'Gingembre'],
      instructions: [
        'Cuire les nouilles',
        'Faire sauter les crevettes au wok',
        'Ajouter légumes et gingembre',
        'Mélanger avec nouilles et sauce'
      ],
      prepTime: 15,
      emoji: '🍜',
      tags: ['pescatarian', 'quick']
    },
    {
      name: 'Poulet rôti et légumes racines',
      calories: 500,
      protein: 45,
      carbs: 42,
      fats: 14,
      ingredients: ['Poulet 150g', 'Carottes 100g', 'Panais 80g', 'Betteraves 80g', 'Herbes de Provence'],
      instructions: [
        'Couper les légumes en morceaux',
        'Assaisonner le poulet et les légumes',
        'Rôtir au four 35 min à 200°C',
        'Servir bien chaud'
      ],
      prepTime: 40,
      emoji: '🍗',
      tags: []
    },
    {
      name: 'Curry de poulet et riz',
      calories: 510,
      protein: 40,
      carbs: 52,
      fats: 15,
      ingredients: ['Poulet 140g', 'Riz basmati 70g', 'Lait de coco 100ml', 'Curry 1 c.à.s', 'Légumes 100g'],
      instructions: [
        'Cuire le riz',
        'Faire revenir le poulet en morceaux',
        'Ajouter curry, lait de coco et légumes',
        'Mijoter 15 min'
      ],
      prepTime: 28,
      emoji: '🍛',
      tags: []
    },
    {
      name: 'Chili végétarien',
      calories: 440,
      protein: 20,
      carbs: 60,
      fats: 12,
      ingredients: ['Haricots rouges 120g', 'Haricots noirs 80g', 'Tomates 150g', 'Maïs 60g', 'Épices chili', 'Riz 60g'],
      instructions: [
        'Cuire le riz',
        'Faire revenir oignons et épices',
        'Ajouter haricots, tomates et maïs',
        'Mijoter 25 min, servir avec le riz'
      ],
      prepTime: 35,
      emoji: '🌶️',
      tags: ['vegan', 'vegetarian', 'budget']
    },
    {
      name: 'Pizza maison protéinée',
      calories: 530,
      protein: 35,
      carbs: 50,
      fats: 18,
      ingredients: ['Pâte à pizza complète 1', 'Sauce tomate 80g', 'Mozzarella 60g', 'Poulet 80g', 'Légumes 100g'],
      instructions: [
        'Étaler la pâte',
        'Tartiner de sauce, ajouter mozzarella et garnitures',
        'Cuire au four 12-15 min à 220°C'
      ],
      prepTime: 20,
      emoji: '🍕',
      tags: []
    },
    {
      name: 'Pad Thai végétarien',
      calories: 470,
      protein: 18,
      carbs: 62,
      fats: 14,
      ingredients: ['Nouilles de riz 80g', 'Tofu 100g', 'Œuf 1', 'Germes de soja 80g', 'Cacahuètes 20g', 'Sauce pad thai'],
      instructions: [
        'Faire tremper les nouilles',
        'Faire sauter le tofu et l\'œuf',
        'Ajouter nouilles, germes et sauce',
        'Garnir de cacahuètes et coriandre'
      ],
      prepTime: 18,
      emoji: '🥘',
      tags: ['vegetarian']
    },
    {
      name: 'Steak de thon et salade composée',
      calories: 420,
      protein: 42,
      carbs: 28,
      fats: 14,
      ingredients: ['Steak de thon 150g', 'Salade verte 100g', 'Tomates cerises 80g', 'Olives 30g', 'Pommes de terre 100g'],
      instructions: [
        'Cuire les pommes de terre vapeur',
        'Griller le thon 2-3 min/côté',
        'Préparer la salade',
        'Assaisonner et servir'
      ],
      prepTime: 20,
      emoji: '🐟',
      tags: ['pescatarian']
    },
    {
      name: 'Gratin de légumes et quinoa',
      calories: 450,
      protein: 22,
      carbs: 54,
      fats: 16,
      ingredients: ['Quinoa 70g', 'Courgettes 100g', 'Aubergines 100g', 'Tomates 100g', 'Fromage râpé 40g', 'Béchamel légère'],
      instructions: [
        'Cuire le quinoa',
        'Couper et faire revenir les légumes',
        'Mélanger quinoa et légumes dans un plat',
        'Ajouter béchamel et fromage, gratiner 20 min'
      ],
      prepTime: 35,
      emoji: '🥘',
      tags: ['vegetarian']
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
      instructions: ['Verser le yaourt', 'Ajouter les myrtilles', 'Arroser de miel'],
      prepTime: 2,
      emoji: '🥛',
      tags: ['vegetarian', 'quick']
    },
    {
      name: 'Pomme et beurre d\'amande',
      calories: 180,
      protein: 5,
      carbs: 25,
      fats: 8,
      ingredients: ['Pomme 1', 'Beurre d\'amande 1 c.à.s'],
      instructions: ['Couper la pomme', 'Tartiner avec le beurre d\'amande'],
      prepTime: 2,
      emoji: '🍎',
      tags: ['vegan', 'vegetarian', 'quick', 'budget']
    },
    {
      name: 'Smoothie protéiné',
      calories: 200,
      protein: 20,
      carbs: 25,
      fats: 3,
      ingredients: ['Protéine en poudre 30g', 'Banane 1', 'Lait végétal 250ml', 'Épinards 30g'],
      instructions: ['Tout mixer ensemble'],
      prepTime: 5,
      emoji: '🥤',
      tags: ['vegan', 'vegetarian', 'quick']
    },
    {
      name: 'Boules d\'énergie',
      calories: 170,
      protein: 6,
      carbs: 22,
      fats: 7,
      ingredients: ['Dattes 40g', 'Amandes 20g', 'Cacao 1 c.à.s', 'Noix de coco'],
      instructions: ['Mixer dattes et amandes', 'Former des boules', 'Rouler dans le cacao'],
      prepTime: 10,
      emoji: '⚡',
      tags: ['vegan', 'vegetarian']
    },
    {
      name: 'Cottage cheese et fruits rouges',
      calories: 160,
      protein: 18,
      carbs: 15,
      fats: 4,
      ingredients: ['Cottage cheese 150g', 'Fraises 60g', 'Framboises 30g'],
      instructions: ['Verser le cottage cheese', 'Ajouter les fruits lavés'],
      prepTime: 2,
      emoji: '🍓',
      tags: ['vegetarian', 'quick']
    },
    {
      name: 'Œuf dur et légumes',
      calories: 140,
      protein: 12,
      carbs: 8,
      fats: 8,
      ingredients: ['Œufs durs 2', 'Tomates cerises 80g', 'Concombre 50g'],
      instructions: ['Écaler les œufs', 'Laver et couper les légumes', 'Assaisonner'],
      prepTime: 12,
      emoji: '🥚',
      tags: ['vegetarian', 'budget']
    },
    {
      name: 'Barre protéinée maison',
      calories: 190,
      protein: 12,
      carbs: 20,
      fats: 7,
      ingredients: ['Flocons d\'avoine 30g', 'Protéine 20g', 'Beurre d\'amande 15g', 'Miel 10g', 'Pépites chocolat noir 10g'],
      instructions: [
        'Mélanger tous les ingrédients',
        'Presser dans un moule',
        'Réfrigérer 2h',
        'Découper en barres'
      ],
      prepTime: 10,
      emoji: '🍫',
      tags: ['vegetarian']
    },
    {
      name: 'Houmous et crudités',
      calories: 165,
      protein: 7,
      carbs: 18,
      fats: 8,
      ingredients: ['Houmous 60g', 'Carottes 80g', 'Concombre 60g', 'Poivrons 40g'],
      instructions: ['Couper les légumes en bâtonnets', 'Servir avec le houmous'],
      prepTime: 5,
      emoji: '🥕',
      tags: ['vegan', 'vegetarian', 'quick']
    }
  ]
}

// Fonction pour filtrer les repas selon les préférences alimentaires
function filterMealsByDiet(meals: any[], dietaryType: string): any[] {
  if (dietaryType === 'omnivore') return meals
  if (dietaryType === 'vegetarian') return meals.filter(m => m.tags.includes('vegetarian') || m.tags.includes('vegan'))
  if (dietaryType === 'vegan') return meals.filter(m => m.tags.includes('vegan'))
  if (dietaryType === 'pescatarian') return meals.filter(m => m.tags.includes('pescatarian') || m.tags.includes('vegetarian') || m.tags.includes('vegan'))
  return meals
}

// Fonction pour ajuster les portions selon les calories cibles
function adjustMealPortions(meal: Meal, targetCalories: number): Meal {
  const ratio = targetCalories / meal.calories
  
  return {
    ...meal,
    calories: Math.round(meal.calories * ratio),
    protein: Math.round(meal.protein * ratio),
    carbs: Math.round(meal.carbs * ratio),
    fats: Math.round(meal.fats * ratio),
    ingredients: meal.ingredients.map(ing => {
      // Ajuster les quantités dans les ingrédients
      const match = ing.match(/(\d+)(g|ml|c\.à\.[sc])?/)
      if (match) {
        const amount = parseInt(match[1])
        const unit = match[2] || ''
        const newAmount = Math.round(amount * ratio)
        return ing.replace(match[0], `${newAmount}${unit}`)
      }
      return ing
    }),
    portionMultiplier: ratio
  }
}

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateWeeklyMealPlan(
  dailyCalories: number,
  numMeals: number = 3,
  numSnacks: number = 2,
  dietaryType: string = 'omnivore',
  goal: string = 'maintain'
): Record<string, DayMeals> {
  
  console.log('🎯 Génération du plan avec:', {
    dailyCalories,
    numMeals,
    numSnacks,
    dietaryType,
    goal
  })

  // Filtrer selon le régime alimentaire
  const breakfasts = filterMealsByDiet(mealDatabase.breakfast, dietaryType)
  const lunches = filterMealsByDiet(mealDatabase.lunch, dietaryType)
  const dinners = filterMealsByDiet(mealDatabase.dinner, dietaryType)
  const snacks = filterMealsByDiet(mealDatabase.snacks, dietaryType)

  // Vérifier qu'il y a assez de repas
  if (breakfasts.length < 7 || lunches.length < 7 || dinners.length < 7) {
    console.warn('⚠️ Pas assez de variété pour ce régime, certains repas seront répétés')
  }

  // Mélanger pour avoir de la variété
  const shuffledBreakfasts = shuffleArray(breakfasts)
  const shuffledLunches = shuffleArray(lunches)
  const shuffledDinners = shuffleArray(dinners)
  const shuffledSnacks = shuffleArray(snacks)

  // Calculer les calories cibles par repas
  const totalSnackCalories = numSnacks * 180 // ~180 cal par snack
  const remainingCalories = dailyCalories - totalSnackCalories
  
  const breakfastCalories = Math.round(remainingCalories * 0.30) // 30% petit-déj
  const lunchCalories = Math.round(remainingCalories * 0.35) // 35% déjeuner
  const dinnerCalories = Math.round(remainingCalories * 0.35) // 35% dîner
  const snackCalories = Math.round(totalSnackCalories / numSnacks)

  console.log('📊 Répartition calorique:', {
    breakfast: breakfastCalories,
    lunch: lunchCalories,
    dinner: dinnerCalories,
    snack: snackCalories
  })

  const weekPlan: Record<string, DayMeals> = {}
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

  days.forEach((day, index) => {
    // Sélectionner les repas sans répétition sur 7 jours
    const breakfast = adjustMealPortions(
      shuffledBreakfasts[index % shuffledBreakfasts.length],
      breakfastCalories
    )
    
    const lunch = adjustMealPortions(
      shuffledLunches[index % shuffledLunches.length],
      lunchCalories
    )
    
    const dinner = adjustMealPortions(
      shuffledDinners[index % shuffledDinners.length],
      dinnerCalories
    )

    const daySnacks = Array(numSnacks).fill(null).map((_, snackIndex) => 
      adjustMealPortions(
        shuffledSnacks[(index * numSnacks + snackIndex) % shuffledSnacks.length],
        snackCalories
      )
    )

    weekPlan[day] = {
      breakfast,
      lunch,
      dinner,
      snacks: daySnacks
    }

    // Calculer le total du jour
    const dayTotal = breakfast.calories + lunch.calories + dinner.calories + 
                     daySnacks.reduce((sum, s) => sum + s.calories, 0)
    
    console.log(`✅ ${day}: ${dayTotal} cal (cible: ${dailyCalories})`)
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
        const lowerIngredient = ingredient.toLowerCase()
        
        // Catégorisation intelligente
        if (lowerIngredient.includes('poulet') || 
            lowerIngredient.includes('bœuf') ||
            lowerIngredient.includes('dinde') ||
            lowerIngredient.includes('poisson') ||
            lowerIngredient.includes('œuf') ||
            lowerIngredient.includes('thon') ||
            lowerIngredient.includes('saumon') ||
            lowerIngredient.includes('crevettes') ||
            lowerIngredient.includes('tofu') ||
            lowerIngredient.includes('protéine') ||
            lowerIngredient.includes('whey')) {
          categories['Protéines'].add(ingredient)
        } else if (lowerIngredient.includes('salade') ||
                   lowerIngredient.includes('tomate') ||
                   lowerIngredient.includes('légumes') ||
                   lowerIngredient.includes('brocoli') ||
                   lowerIngredient.includes('épinards') ||
                   lowerIngredient.includes('courgette') ||
                   lowerIngredient.includes('carotte') ||
                   lowerIngredient.includes('haricot') ||
                   lowerIngredient.includes('concombre') ||
                   lowerIngredient.includes('oignon') ||
                   lowerIngredient.includes('poivron') ||
                   lowerIngredient.includes('chou') ||
                   lowerIngredient.includes('asperge') ||
                   lowerIngredient.includes('champignon') ||
                   lowerIngredient.includes('aubergine') ||
                   lowerIngredient.includes('betterave') ||
                   lowerIngredient.includes('panais')) {
          categories['Légumes'].add(ingredient)
        } else if (lowerIngredient.includes('pomme') ||
                   lowerIngredient.includes('banane') ||
                   lowerIngredient.includes('fruits') ||
                   lowerIngredient.includes('myrtille') ||
                   lowerIngredient.includes('fraise') ||
                   lowerIngredient.includes('framboise') ||
                   lowerIngredient.includes('citron') ||
                   lowerIngredient.includes('mangue') ||
                   lowerIngredient.includes('avocat')) {
          categories['Fruits'].add(ingredient)
        } else if (lowerIngredient.includes('riz') ||
                   lowerIngredient.includes('quinoa') ||
                   lowerIngredient.includes('pain') ||
                   lowerIngredient.includes('pâtes') ||
                   lowerIngredient.includes('flocons') ||
                   lowerIngredient.includes('tortilla') ||
                   lowerIngredient.includes('nouilles') ||
                   lowerIngredient.includes('patate') ||
                   lowerIngredient.includes('lentille') ||
                   lowerIngredient.includes('pois chiche')) {
          categories['Féculents'].add(ingredient)
        } else if (lowerIngredient.includes('yaourt') ||
                   lowerIngredient.includes('fromage') ||
                   lowerIngredient.includes('lait') ||
                   lowerIngredient.includes('cottage') ||
                   lowerIngredient.includes('crème')) {
          categories['Produits laitiers'].add(ingredient)
        } else {
          categories['Autres'].add(ingredient)
        }
      })
    })
  })

  const shoppingList: Record<string, string[]> = {}
  Object.entries(categories).forEach(([category, items]) => {
    if (items.size > 0) {
      shoppingList[category] = Array.from(items).sort()
    }
  })

  return shoppingList
}