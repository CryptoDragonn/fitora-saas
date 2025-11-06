import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Vérifier que la clé existe
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY manquante dans .env.local')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    console.log('🤖 API Route appelée')

    // Vérifier la clé OpenAI
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Clé OpenAI manquante. Ajoute OPENAI_API_KEY dans .env.local')
    }

    const body = await request.json()
    console.log('📊 Données reçues:', {
      goal: body.goal,
      calories: body.dailyCalories,
      dietaryType: body.dietaryType
    })

    const { 
      goal, 
      currentWeight, 
      targetWeight, 
      height, 
      age, 
      gender,
      dailyCalories,
      protein,
      carbs,
      fats,
      dietaryType,
      allergies,
      dislikes,
      dailyMeals,
      snacksPerDay,
      cookingTime,
      budgetLevel
    } = body

    const prompt = `Tu es un nutritionniste expert. Génère un plan repas hebdomadaire COMPLET (7 jours) personnalisé en JSON.

PROFIL UTILISATEUR :
- Objectif : ${goal === 'lose_weight' ? 'Perdre du poids' : goal === 'gain_muscle' ? 'Prendre du muscle' : 'Maintenir'}
- Poids actuel : ${currentWeight} kg
- Poids cible : ${targetWeight} kg
- Taille : ${height} cm
- Âge : ${age} ans
- Genre : ${gender === 'male' ? 'Homme' : gender === 'female' ? 'Femme' : 'Autre'}

BESOINS NUTRITIONNELS :
- Calories journalières : ${dailyCalories} kcal
- Protéines : ${protein}g/jour
- Glucides : ${carbs}g/jour
- Lipides : ${fats}g/jour

PRÉFÉRENCES :
- Type de régime : ${dietaryType}
- Allergies : ${allergies?.length > 0 ? allergies.join(', ') : 'Aucune'}
- Aliments non aimés : ${dislikes?.length > 0 ? dislikes.join(', ') : 'Aucun'}
- Nombre de repas/jour : ${dailyMeals}
- Collations/jour : ${snacksPerDay}
- Temps de préparation : ${cookingTime === 'quick' ? 'Rapide (< 15 min)' : cookingTime === 'medium' ? 'Moyen (15-30 min)' : 'Élaboré (> 30 min)'}
- Budget : ${budgetLevel === 'low' ? 'Économique' : budgetLevel === 'medium' ? 'Moyen' : 'Élevé'}

CONSIGNES STRICTES :
1. Génère EXACTEMENT 7 jours (Lundi à Dimanche)
2. Chaque jour doit avoir : petit-déjeuner, déjeuner, dîner + ${snacksPerDay} collations
3. Les repas doivent être VARIÉS (pas de répétitions)
4. Respecter STRICTEMENT les calories et macros (±50 kcal par repas)
5. Adapter au régime ${dietaryType}
6. Ingrédients et instructions DÉTAILLÉS en français
7. Temps de préparation réaliste
8. Émoji approprié pour chaque repas

FORMAT JSON EXACT :
{
  "weeklyPlan": {
    "Lundi": {
      "breakfast": {
        "name": "Omelette protéinée",
        "emoji": "🍳",
        "calories": 400,
        "protein": 30,
        "carbs": 20,
        "fats": 20,
        "ingredients": ["3 œufs", "50g fromage", "Épinards"],
        "instructions": ["Battre les œufs", "Cuire à la poêle"],
        "prepTime": 10
      },
      "lunch": {...},
      "dinner": {...},
      "snacks": [{...}]
    },
    "Mardi": {...},
    "Mercredi": {...},
    "Jeudi": {...},
    "Vendredi": {...},
    "Samedi": {...},
    "Dimanche": {...}
  },
  "shoppingList": {
    "Protéines": ["Poulet", "Œufs"],
    "Légumes": ["Brocoli", "Tomates"],
    "Fruits": ["Bananes"],
    "Féculents": ["Riz", "Pâtes"],
    "Produits laitiers": ["Fromage"],
    "Autres": ["Huile d'olive"]
  }
}

Réponds UNIQUEMENT avec le JSON valide, sans texte avant ou après.`

    console.log('🤖 Appel OpenAI...')

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Tu es un nutritionniste expert qui génère des plans repas personnalisés en JSON. Tu réponds UNIQUEMENT en JSON valide.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    })

    const responseText = completion.choices[0].message.content
    console.log('✅ Réponse OpenAI reçue, taille:', responseText?.length)

    let mealPlan
    try {
      mealPlan = JSON.parse(responseText || '{}')
      console.log('✅ JSON parsé, jours:', Object.keys(mealPlan.weeklyPlan || {}).length)
    } catch (parseError) {
      console.error('❌ Erreur parsing JSON:', parseError)
      throw new Error('Format de réponse invalide')
    }

    return NextResponse.json(mealPlan, { status: 200 })

  } catch (error: any) {
    console.error('❌ Erreur API complète:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Erreur lors de la génération',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}