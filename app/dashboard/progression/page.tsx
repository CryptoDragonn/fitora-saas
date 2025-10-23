'use client'

import { useState } from 'react'
import { 
  Dumbbell,
  Clock,
  Flame,
  TrendingUp,
  Check,
  Calendar,
  Trophy,
  Award,
  Target,
  ChevronRight,
  Play,
  X,
  Info
} from 'lucide-react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'
type ExerciseType = 'cardio' | 'strength' | 'flexibility' | 'rest'

interface Exercise {
  id: string
  name: string
  sets?: number
  reps?: string
  duration?: string
  caloriesBurned: number
  muscleGroup: string
  equipment: string
  alternative: string
  videoUrl?: string
  instructions: string[]
}

interface WorkoutSession {
  day: string
  dayNumber: number
  type: ExerciseType
  name: string
  exercises: Exercise[]
  totalCalories: number
  duration: string
  completed: boolean
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  target: number
}

export default function ProgressionPage() {
  const [userGoal] = useState<Goal>('lose_weight')
  const [currentWeight] = useState(80)
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [completedDays, setCompletedDays] = useState<number[]>([])

  // Base de données d'exercices par objectif
  const exerciseDatabase: Record<Goal, WorkoutSession[]> = {
    lose_weight: [
      {
        day: 'Lundi',
        dayNumber: 1,
        type: 'cardio',
        name: 'Cardio HIIT Intense',
        totalCalories: 450,
        duration: '30 min',
        completed: false,
        exercises: [
          {
            id: 'ex1',
            name: 'Jumping Jacks',
            sets: 4,
            reps: '30 sec actif / 15 sec repos',
            duration: '3 min',
            caloriesBurned: 50,
            muscleGroup: 'Corps entier',
            equipment: 'Aucun',
            alternative: 'Marche sur place rapide si trop intense',
            instructions: [
              'Départ pieds joints, bras le long du corps',
              'Sautez en écartant les jambes et levant les bras',
              'Revenez à la position initiale',
              'Gardez un rythme soutenu'
            ]
          },
          {
            id: 'ex2',
            name: 'Burpees',
            sets: 4,
            reps: '10-15',
            duration: '8 min',
            caloriesBurned: 120,
            muscleGroup: 'Corps entier',
            equipment: 'Aucun',
            alternative: 'Burpees sans saut (step back au lieu de sauter)',
            instructions: [
              'Position debout',
              'Descendez en squat, mains au sol',
              'Jetez les pieds en arrière en position planche',
              'Ramenez les pieds et sautez vers le haut'
            ]
          },
          {
            id: 'ex3',
            name: 'Mountain Climbers',
            sets: 4,
            reps: '30 sec',
            duration: '4 min',
            caloriesBurned: 80,
            muscleGroup: 'Cardio + Abdos',
            equipment: 'Aucun',
            alternative: 'Version lente si débutant',
            instructions: [
              'Position planche haute',
              'Ramenez un genou vers la poitrine',
              'Alternez rapidement les jambes',
              'Gardez les hanches basses'
            ]
          },
          {
            id: 'ex4',
            name: 'Jump Squats',
            sets: 3,
            reps: '15',
            duration: '6 min',
            caloriesBurned: 90,
            muscleGroup: 'Jambes + Cardio',
            equipment: 'Aucun',
            alternative: 'Squats classiques sans saut',
            instructions: [
              'Position squat',
              'Explosez vers le haut en sautant',
              'Atterrissez en douceur en squat',
              'Gardez le dos droit'
            ]
          },
          {
            id: 'ex5',
            name: 'High Knees',
            sets: 4,
            reps: '30 sec',
            duration: '4 min',
            caloriesBurned: 60,
            muscleGroup: 'Cardio + Jambes',
            equipment: 'Aucun',
            alternative: 'Marche avec montée de genoux',
            instructions: [
              'Courez sur place',
              'Montez les genoux le plus haut possible',
              'Gardez un rythme rapide',
              'Balancez les bras naturellement'
            ]
          }
        ]
      },
      {
        day: 'Mardi',
        dayNumber: 2,
        type: 'strength',
        name: 'Renforcement Corps Entier',
        totalCalories: 280,
        duration: '35 min',
        completed: false,
        exercises: [
          {
            id: 'ex6',
            name: 'Pompes',
            sets: 4,
            reps: '10-15',
            duration: '8 min',
            caloriesBurned: 80,
            muscleGroup: 'Pectoraux, Triceps, Épaules',
            equipment: 'Aucun',
            alternative: 'Pompes sur les genoux ou contre un mur',
            instructions: [
              'Position planche, mains largeur épaules',
              'Descendez en gardant le corps droit',
              'Poussez pour remonter',
              'Ne cambrez pas le dos'
            ]
          },
          {
            id: 'ex7',
            name: 'Squats au poids du corps',
            sets: 4,
            reps: '15-20',
            duration: '8 min',
            caloriesBurned: 70,
            muscleGroup: 'Quadriceps, Fessiers',
            equipment: 'Aucun',
            alternative: 'Squats assistés (chaise derrière)',
            instructions: [
              'Pieds largeur des hanches',
              'Descendez comme pour vous asseoir',
              'Genoux alignés avec les pieds',
              'Poussez sur les talons pour remonter'
            ]
          },
          {
            id: 'ex8',
            name: 'Planche',
            sets: 3,
            reps: '30-60 sec',
            duration: '5 min',
            caloriesBurned: 40,
            muscleGroup: 'Abdominaux, Gainage',
            equipment: 'Aucun',
            alternative: 'Planche sur les genoux',
            instructions: [
              'Position sur les avant-bras',
              'Corps aligné de la tête aux pieds',
              'Contractez les abdos',
              'Respirez normalement'
            ]
          },
          {
            id: 'ex9',
            name: 'Fentes alternées',
            sets: 3,
            reps: '12 par jambe',
            duration: '8 min',
            caloriesBurned: 60,
            muscleGroup: 'Jambes, Fessiers',
            equipment: 'Aucun',
            alternative: 'Fentes statiques',
            instructions: [
              'Pas en avant, genou à 90°',
              'Descendez le genou arrière',
              'Poussez sur le talon avant',
              'Alternez les jambes'
            ]
          },
          {
            id: 'ex10',
            name: 'Superman',
            sets: 3,
            reps: '15',
            duration: '6 min',
            caloriesBurned: 30,
            muscleGroup: 'Dos, Lombaires',
            equipment: 'Aucun',
            alternative: 'Version bras ou jambes uniquement',
            instructions: [
              'Allongé sur le ventre',
              'Levez simultanément bras et jambes',
              'Maintenez 2 secondes',
              'Redescendez en contrôle'
            ]
          }
        ]
      },
      {
        day: 'Mercredi',
        dayNumber: 3,
        type: 'rest',
        name: 'Repos Actif',
        totalCalories: 100,
        duration: '20 min',
        completed: false,
        exercises: [
          {
            id: 'ex11',
            name: 'Marche légère',
            duration: '20 min',
            caloriesBurned: 80,
            muscleGroup: 'Récupération',
            equipment: 'Aucun',
            alternative: 'Vélo d\'appartement léger',
            instructions: [
              'Marchez à un rythme confortable',
              'Profitez de l\'air frais',
              'Restez actif sans forcer',
              'Hydratez-vous bien'
            ]
          },
          {
            id: 'ex12',
            name: 'Étirements doux',
            duration: '10 min',
            caloriesBurned: 20,
            muscleGroup: 'Flexibilité',
            equipment: 'Aucun',
            alternative: 'Yoga doux',
            instructions: [
              'Étirez chaque groupe musculaire',
              'Maintenez 30 secondes',
              'Respirez profondément',
              'Ne forcez jamais'
            ]
          }
        ]
      },
      {
        day: 'Jeudi',
        dayNumber: 4,
        type: 'cardio',
        name: 'Cardio Modéré',
        totalCalories: 350,
        duration: '35 min',
        completed: false,
        exercises: [
          {
            id: 'ex13',
            name: 'Course ou marche rapide',
            duration: '25 min',
            caloriesBurned: 250,
            muscleGroup: 'Cardio',
            equipment: 'Aucun',
            alternative: 'Vélo ou elliptique',
            instructions: [
              'Rythme modéré et constant',
              'Vous devez pouvoir parler',
              'Gardez une bonne posture',
              'Terminez par 5 min de marche'
            ]
          },
          {
            id: 'ex14',
            name: 'Abdos Crunch',
            sets: 3,
            reps: '20',
            duration: '6 min',
            caloriesBurned: 50,
            muscleGroup: 'Abdominaux',
            equipment: 'Aucun',
            alternative: 'Crunch inversé',
            instructions: [
              'Allongé sur le dos',
              'Mains derrière la tête',
              'Soulevez les épaules',
              'Ne tirez pas sur le cou'
            ]
          },
          {
            id: 'ex15',
            name: 'Russian Twists',
            sets: 3,
            reps: '20 (10 par côté)',
            duration: '4 min',
            caloriesBurned: 50,
            muscleGroup: 'Obliques',
            equipment: 'Aucun',
            alternative: 'Version pieds au sol',
            instructions: [
              'Assis, pieds levés',
              'Tournez le buste de gauche à droite',
              'Gardez le dos droit',
              'Contractez les abdos'
            ]
          }
        ]
      },
      {
        day: 'Vendredi',
        dayNumber: 5,
        type: 'strength',
        name: 'Renforcement Bas du Corps',
        totalCalories: 320,
        duration: '40 min',
        completed: false,
        exercises: [
          {
            id: 'ex16',
            name: 'Squats sautés',
            sets: 4,
            reps: '12',
            duration: '8 min',
            caloriesBurned: 100,
            muscleGroup: 'Jambes complètes',
            equipment: 'Aucun',
            alternative: 'Squats normaux',
            instructions: [
              'Position squat',
              'Explosez vers le haut',
              'Atterrissez en souplesse',
              'Répétez le mouvement'
            ]
          },
          {
            id: 'ex17',
            name: 'Fentes marchées',
            sets: 3,
            reps: '20 (10 par jambe)',
            duration: '10 min',
            caloriesBurned: 90,
            muscleGroup: 'Quadriceps, Fessiers',
            equipment: 'Aucun',
            alternative: 'Fentes statiques',
            instructions: [
              'Avancez en fente',
              'Alternez les jambes',
              'Gardez le buste droit',
              'Genou à 90 degrés'
            ]
          },
          {
            id: 'ex18',
            name: 'Soulevé de terre une jambe',
            sets: 3,
            reps: '10 par jambe',
            duration: '8 min',
            caloriesBurned: 60,
            muscleGroup: 'Ischio-jambiers, Fessiers',
            equipment: 'Aucun',
            alternative: 'Version avec support',
            instructions: [
              'Debout sur une jambe',
              'Penchez-vous en avant',
              'Jambe arrière tendue',
              'Revenez à la verticale'
            ]
          },
          {
            id: 'ex19',
            name: 'Montées de mollets',
            sets: 4,
            reps: '20',
            duration: '8 min',
            caloriesBurned: 40,
            muscleGroup: 'Mollets',
            equipment: 'Aucun',
            alternative: 'Sur une marche pour amplitude',
            instructions: [
              'Debout, pieds à plat',
              'Montez sur la pointe des pieds',
              'Redescendez lentement',
              'Contractez en haut'
            ]
          },
          {
            id: 'ex20',
            name: 'Glute Bridge',
            sets: 3,
            reps: '15',
            duration: '6 min',
            caloriesBurned: 30,
            muscleGroup: 'Fessiers, Lombaires',
            equipment: 'Aucun',
            alternative: 'Version une jambe',
            instructions: [
              'Allongé, genoux pliés',
              'Soulevez les hanches',
              'Serrez les fessiers',
              'Maintenez 2 secondes'
            ]
          }
        ]
      },
      {
        day: 'Samedi',
        dayNumber: 6,
        type: 'flexibility',
        name: 'Yoga & Mobilité',
        totalCalories: 150,
        duration: '30 min',
        completed: false,
        exercises: [
          {
            id: 'ex21',
            name: 'Salutation au soleil',
            sets: 5,
            reps: 'Enchaînement complet',
            duration: '15 min',
            caloriesBurned: 80,
            muscleGroup: 'Corps entier',
            equipment: 'Tapis de yoga',
            alternative: 'Version simplifiée',
            instructions: [
              'Enchaînez les postures fluides',
              'Synchronisez avec la respiration',
              'Maintenez chaque pose 3 respirations',
              'Mouvement lent et contrôlé'
            ]
          },
          {
            id: 'ex22',
            name: 'Étirements complets',
            duration: '15 min',
            caloriesBurned: 70,
            muscleGroup: 'Flexibilité générale',
            equipment: 'Aucun',
            alternative: 'Séance guidée en vidéo',
            instructions: [
              'Étirez chaque muscle majeur',
              'Maintenez 30-60 secondes',
              'Respirez profondément',
              'Progressez sans douleur'
            ]
          }
        ]
      },
      {
        day: 'Dimanche',
        dayNumber: 7,
        type: 'rest',
        name: 'Repos Complet',
        totalCalories: 0,
        duration: 'Repos',
        completed: false,
        exercises: [
          {
            id: 'ex23',
            name: 'Jour de récupération',
            caloriesBurned: 0,
            muscleGroup: 'Récupération',
            equipment: 'Aucun',
            alternative: 'Activité très légère si vous le souhaitez',
            instructions: [
              'Reposez-vous complètement',
              'Hydratez-vous bien',
              'Mangez équilibré',
              'Préparez la semaine suivante'
            ]
          }
        ]
      }
    ],
    gain_muscle: [
      {
        day: 'Lundi',
        dayNumber: 1,
        type: 'strength',
        name: 'Pectoraux & Triceps',
        totalCalories: 350,
        duration: '50 min',
        completed: false,
        exercises: [
          {
            id: 'gm1',
            name: 'Pompes classiques',
            sets: 5,
            reps: '12-15',
            duration: '10 min',
            caloriesBurned: 100,
            muscleGroup: 'Pectoraux, Triceps',
            equipment: 'Aucun',
            alternative: 'Pompes déclinées (pieds surélevés)',
            instructions: [
              'Mains largeur épaules',
              'Descendez lentement (3 sec)',
              'Explosez à la remontée',
              'Temps de repos : 90 sec entre séries'
            ]
          },
          {
            id: 'gm2',
            name: 'Dips (chaise ou barres)',
            sets: 4,
            reps: '10-12',
            duration: '10 min',
            caloriesBurned: 80,
            muscleGroup: 'Triceps, Pectoraux',
            equipment: 'Chaise ou barres parallèles',
            alternative: 'Dips assistés',
            instructions: [
              'Mains sur support',
              'Descendez jusqu\'à 90°',
              'Poussez pour remonter',
              'Gardez le corps droit'
            ]
          },
          {
            id: 'gm3',
            name: 'Pompes diamant',
            sets: 4,
            reps: '8-10',
            duration: '8 min',
            caloriesBurned: 70,
            muscleGroup: 'Triceps',
            equipment: 'Aucun',
            alternative: 'Pompes serrées',
            instructions: [
              'Mains en forme de diamant',
              'Coudes le long du corps',
              'Mouvement contrôlé',
              'Focus sur les triceps'
            ]
          }
        ]
      }
    ],
    maintain: [
      {
        day: 'Lundi',
        dayNumber: 1,
        type: 'strength',
        name: 'Circuit Training Équilibré',
        totalCalories: 280,
        duration: '35 min',
        completed: false,
        exercises: [
          {
            id: 'm1',
            name: 'Circuit complet',
            sets: 3,
            reps: '10-12 par exercice',
            duration: '30 min',
            caloriesBurned: 250,
            muscleGroup: 'Corps entier',
            equipment: 'Aucun',
            alternative: 'Réduire le nombre de tours',
            instructions: [
              'Enchaînez 6 exercices différents',
              'Pompes, Squats, Planche, Fentes, Abdos, Burpees',
              '45 sec d\'effort, 15 sec de repos',
              '2 min de pause entre les tours'
            ]
          }
        ]
      }
    ]
  }

  const weeklyProgram = exerciseDatabase[userGoal]

  // Badges
  const badges: Badge[] = [
    {
      id: 'b1',
      name: 'Débutant motivé',
      description: 'Complétez votre première séance',
      icon: '🎯',
      unlocked: completedDays.length >= 1,
      progress: Math.min(completedDays.length, 1),
      target: 1
    },
    {
      id: 'b2',
      name: 'Semaine parfaite',
      description: '7 jours d\'entraînement consécutifs',
      icon: '🔥',
      unlocked: completedDays.length >= 7,
      progress: Math.min(completedDays.length, 7),
      target: 7
    },
    {
      id: 'b3',
      name: 'Champion du mois',
      description: 'Un mois sans rater de séance',
      icon: '👑',
      unlocked: completedDays.length >= 30,
      progress: Math.min(completedDays.length, 30),
      target: 30
    },
    {
      id: 'b4',
      name: 'Machine de guerre',
      description: '100 séances complétées',
      icon: '💪',
      unlocked: completedDays.length >= 100,
      progress: Math.min(completedDays.length, 100),
      target: 100
    }
  ]

  const toggleSessionComplete = (dayNumber: number) => {
    if (completedDays.includes(dayNumber)) {
      setCompletedDays(completedDays.filter(d => d !== dayNumber))
    } else {
      setCompletedDays([...completedDays, dayNumber])
    }
  }

  const getTypeColor = (type: ExerciseType) => {
    switch (type) {
      case 'cardio': return 'from-red-500 to-orange-500'
      case 'strength': return 'from-blue-500 to-purple-500'
      case 'flexibility': return 'from-green-500 to-teal-500'
      case 'rest': return 'from-gray-400 to-gray-500'
    }
  }

  const getTypeIcon = (type: ExerciseType) => {
    switch (type) {
      case 'cardio': return '🔥'
      case 'strength': return '💪'
      case 'flexibility': return '🧘'
      case 'rest': return '😴'
    }
  }

  const weeklyStats = {
    totalSessions: weeklyProgram.length,
    completedSessions: completedDays.length,
    totalCalories: weeklyProgram.reduce((acc, s) => acc + s.totalCalories, 0),
    burnedCalories: weeklyProgram
      .filter((s) => completedDays.includes(s.dayNumber))
      .reduce((acc, s) => acc + s.totalCalories, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Mon plan d'action
          </h1>
          <p className="text-gray-600">
            Programme d'entraînement personnalisé pour {
              userGoal === 'lose_weight' ? 'perdre du poids' :
              userGoal === 'gain_muscle' ? 'prendre du muscle' :
              'maintenir votre forme'
            }
          </p>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Progression</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">
              {weeklyStats.completedSessions}/{weeklyStats.totalSessions}
            </p>
            <p className="text-sm text-gray-600 mt-1">Séances cette semaine</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800">Calories brûlées</h3>
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {weeklyStats.burnedCalories}
            </p>
            <p className="text-sm text-gray-600 mt-1">Sur {weeklyStats.totalCalories} prévues</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Série actuelle</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">
              {completedDays.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Jours consécutifs</p>
          </div>

          <div className="bg-white rounded-xl p-5 border-2 border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-800">Badges</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {badges.filter(b => b.unlocked).length}/{badges.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Débloqués</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Programme hebdomadaire */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-purple-600" />
              Programme de la semaine
            </h2>
            <div className="space-y-4">
              {weeklyProgram.map((session) => {
                const isCompleted = completedDays.includes(session.dayNumber)
                
                return (
                  <div
                    key={session.dayNumber}
                    className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden transition-all hover:shadow-xl ${
                      isCompleted ? 'border-green-500' : 'border-gray-100'
                    }`}
                  >
                    <div className={`bg-gradient-to-r ${getTypeColor(session.type)} p-4 flex items-center justify-between`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                          {getTypeIcon(session.type)}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {session.day} - Jour {session.dayNumber}
                          </h3>
                          <p className="text-white/90 font-bold text-lg">
                            {session.name}
                          </p>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{session.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Flame className="w-4 h-4" />
                          <span className="text-sm font-medium">{session.totalCalories} kcal</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Target className="w-4 h-4" />
                          <span className="text-sm font-medium">{session.exercises.length} exercices</span>
                        </div>
                      </div>

<div className="space-y-2 mb-4">
                        {session.exercises.slice(0, 3).map((exercise, idx) => (
                          <div
                            key={exercise.id}
                            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-bold text-purple-600">{idx + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-800">{exercise.name}</p>
                              <p className="text-xs text-gray-500">
                                {exercise.sets && `${exercise.sets} séries`}
                                {exercise.reps && ` × ${exercise.reps}`}
                                {exercise.duration && !exercise.sets && exercise.duration}
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedExercise(exercise)}
                              className="p-2 hover:bg-white rounded-lg transition"
                            >
                              <Info className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                        {session.exercises.length > 3 && (
                          <p className="text-xs text-gray-500 text-center py-2">
                            + {session.exercises.length - 3} autres exercices
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedSession(session)}
                          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                        >
                          <Play className="w-5 h-5" />
                          Voir le détail
                        </button>
                        <button
                          onClick={() => toggleSessionComplete(session.dayNumber)}
                          className={`px-6 py-3 rounded-xl font-semibold transition ${
                            isCompleted
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <span className="text-sm">Marquer comme fait</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar Badges & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Badges */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-600" />
                Badges & Récompenses
              </h3>
              <div className="space-y-3">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`text-3xl ${!badge.unlocked && 'grayscale opacity-50'}`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          badge.unlocked ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {badge.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-2">
                          {badge.description}
                        </p>
                        {!badge.unlocked && (
                          <>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                                style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              {badge.progress} / {badge.target}
                            </p>
                          </>
                        )}
                        {badge.unlocked && (
                          <div className="flex items-center gap-1 text-yellow-600">
                            <Check className="w-4 h-4" />
                            <span className="text-xs font-medium">Débloqué !</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graphique progression (simplifié) */}
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                Évolution hebdomadaire
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Régularité</span>
                    <span className="font-bold text-purple-600">
                      {Math.round((weeklyStats.completedSessions / weeklyStats.totalSessions) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{ width: `${(weeklyStats.completedSessions / weeklyStats.totalSessions) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Calories objectif</span>
                    <span className="font-bold text-orange-600">
                      {Math.round((weeklyStats.burnedCalories / weeklyStats.totalCalories) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all"
                      style={{ width: `${Math.min((weeklyStats.burnedCalories / weeklyStats.totalCalories) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">Jours d'entraînement</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div
                        key={day}
                        className={`flex-1 h-12 rounded-lg flex items-center justify-center font-bold transition-all ${
                          completedDays.includes(day)
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALE DÉTAIL SESSION */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-r ${getTypeColor(selectedSession.type)} p-6 flex justify-between items-start`}>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {selectedSession.day} - {selectedSession.name}
                </h2>
                <div className="flex items-center gap-4 text-white/90">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {selectedSession.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    {selectedSession.totalCalories} kcal
                  </span>
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {selectedSession.exercises.length} exercices
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSession(null)}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                {selectedSession.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xl font-bold text-white">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {exercise.name}
                        </h3>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {exercise.sets && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                              {exercise.sets} séries
                            </span>
                          )}
                          {exercise.reps && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                              {exercise.reps} reps
                            </span>
                          )}
                          {exercise.duration && (
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                              {exercise.duration}
                            </span>
                          )}
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                            {exercise.caloriesBurned} kcal
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Groupe musculaire</p>
                            <p className="text-sm font-semibold text-gray-800">{exercise.muscleGroup}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Équipement</p>
                            <p className="text-sm font-semibold text-gray-800">{exercise.equipment}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-600" />
                        Instructions
                      </h4>
                      <ol className="space-y-2">
                        {exercise.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-700">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Alternative
                      </h4>
                      <p className="text-sm text-yellow-700">{exercise.alternative}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  toggleSessionComplete(selectedSession.dayNumber)
                  setSelectedSession(null)
                }}
                className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <Check className="w-6 h-6" />
                Marquer la séance comme terminée
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE DÉTAIL EXERCICE */}
      {selectedExercise && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedExercise(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedExercise.name}
                </h2>
                <p className="text-white/90">{selectedExercise.muscleGroup}</p>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedExercise.sets && (
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-600 mb-1">Séries</p>
                    <p className="text-xl font-bold text-blue-700">{selectedExercise.sets}</p>
                  </div>
                )}
                {selectedExercise.reps && (
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 mb-1">Répétitions</p>
                    <p className="text-xl font-bold text-green-700">{selectedExercise.reps}</p>
                  </div>
                )}
                {selectedExercise.duration && (
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-xs text-orange-600 mb-1">Durée</p>
                    <p className="text-xl font-bold text-orange-700">{selectedExercise.duration}</p>
                  </div>
                )}
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs text-red-600 mb-1">Calories</p>
                  <p className="text-xl font-bold text-red-700">{selectedExercise.caloriesBurned}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Instructions détaillées</h3>
                <ol className="space-y-3">
                  {selectedExercise.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 pt-1">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Alternative sans matériel
                </h4>
                <p className="text-yellow-700">{selectedExercise.alternative}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Équipement requis</p>
                    <p className="font-semibold text-gray-800">{selectedExercise.equipment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Groupe musculaire</p>
                    <p className="font-semibold text-gray-800">{selectedExercise.muscleGroup}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}