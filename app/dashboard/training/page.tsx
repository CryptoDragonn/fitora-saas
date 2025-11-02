'use client'

import { useState, useEffect } from 'react'
import { 
  Dumbbell,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Target,
  Zap,
  Clock,
  Home,
  Building2,
  TreePine,
  Brain,
  ChevronRight,
  Plus,
  Check,
  Video,
  Award,
  Flame,
  Activity,
  BarChart3,
  Settings,
  Sparkles,
  Timer,
  Calendar,
  Trophy,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

type TrainingMode = 'home' | 'gym' | 'outdoor'
type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced'
type Goal = 'strength' | 'muscle' | 'endurance' | 'weight_loss'

interface Exercise {
  id: string
  name: string
  category: string
  sets: number
  reps: string
  rest: number
  weight?: number
  completed: boolean
  videoUrl?: string
  tips: string[]
}

interface WorkoutSession {
  date: string
  duration: number
  exercises: number
  caloriesBurned: number
}

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'workout' | 'history' | 'generator'>('overview')
  const [trainingMode, setTrainingMode] = useState<TrainingMode>('gym')
  const [timerActive, setTimerActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [selectedGoal, setSelectedGoal] = useState<Goal>('muscle')
  const [selectedLevel, setSelectedLevel] = useState<ExerciseLevel>('intermediate')

  const trainingModes = [
    { id: 'home' as TrainingMode, label: 'Maison', icon: Home, color: 'from-blue-500 to-cyan-500', emoji: '🏠' },
    { id: 'gym' as TrainingMode, label: 'Salle de sport', icon: Building2, color: 'from-purple-500 to-pink-500', emoji: '🏋️' },
    { id: 'outdoor' as TrainingMode, label: 'Extérieur', icon: TreePine, color: 'from-green-500 to-emerald-500', emoji: '🌳' }
  ]

  const goals = [
    { id: 'strength' as Goal, label: 'Force', icon: Zap, color: 'from-orange-500 to-red-500', emoji: '💥' },
    { id: 'muscle' as Goal, label: 'Muscle', icon: Dumbbell, color: 'from-blue-500 to-cyan-500', emoji: '💪' },
    { id: 'endurance' as Goal, label: 'Endurance', icon: Activity, color: 'from-green-500 to-emerald-500', emoji: '🏃' },
    { id: 'weight_loss' as Goal, label: 'Perte de poids', icon: Flame, color: 'from-red-500 to-pink-500', emoji: '🔥' }
  ]

  const todayWorkout: Exercise[] = [
    {
      id: '1',
      name: 'Développé couché',
      category: 'Pectoraux',
      sets: 4,
      reps: '8-10',
      rest: 90,
      weight: 80,
      completed: false,
      videoUrl: '/videos/bench-press.mp4',
      tips: ['Garde les omoplates serrées', 'Descends lentement', 'Expire en poussant']
    },
    {
      id: '2',
      name: 'Squat barre',
      category: 'Jambes',
      sets: 4,
      reps: '10-12',
      rest: 120,
      weight: 100,
      completed: false,
      videoUrl: '/videos/squat.mp4',
      tips: ['Descends sous la parallèle', 'Garde le dos droit', 'Pousse sur les talons']
    },
    {
      id: '3',
      name: 'Tractions',
      category: 'Dos',
      sets: 3,
      reps: '8-10',
      rest: 90,
      completed: false,
      videoUrl: '/videos/pull-up.mp4',
      tips: ['Prise large pour le dos', 'Descends complètement', 'Évite le balancement']
    },
    {
      id: '4',
      name: 'Développé militaire',
      category: 'Épaules',
      sets: 3,
      reps: '10-12',
      rest: 75,
      weight: 50,
      completed: false,
      videoUrl: '/videos/military-press.mp4',
      tips: ['Gainage abdominal constant', 'Pousse verticalement', 'Ne cambre pas le dos']
    }
  ]

  const weekProgress = [
    { day: 'Lun', completed: true, intensity: 85 },
    { day: 'Mar', completed: true, intensity: 70 },
    { day: 'Mer', completed: false, intensity: 0 },
    { day: 'Jeu', completed: true, intensity: 90 },
    { day: 'Ven', completed: false, intensity: 0 },
    { day: 'Sam', completed: true, intensity: 75 },
    { day: 'Dim', completed: false, intensity: 0 }
  ]

  const recentSessions: WorkoutSession[] = [
    { date: '2025-10-20', duration: 65, exercises: 8, caloriesBurned: 420 },
    { date: '2025-10-18', duration: 58, exercises: 7, caloriesBurned: 380 },
    { date: '2025-10-16', duration: 72, exercises: 9, caloriesBurned: 465 },
    { date: '2025-10-14', duration: 60, exercises: 8, caloriesBurned: 395 }
  ]

  const progressStats = {
    totalWorkouts: 42,
    totalMinutes: 2850,
    totalCalories: 18500,
    currentStreak: 5,
    personalRecords: 8,
    weightProgression: '+12%'
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
    } else if (timeRemaining === 0) {
      setTimerActive(false)
      // Notification sonore ici
    }
    return () => clearInterval(interval)
  }, [timerActive, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startRestTimer = (seconds: number) => {
    setTimeRemaining(seconds)
    setTimerActive(true)
  }

  // OVERVIEW TAB
  if (activeTab === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="w-12 h-12 text-blue-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Entraînement & Suivi
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-xl text-gray-600">
              Programme intelligent adapté à tes performances
            </p>
          </div>

          {/* Training Mode Selection */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Où t'entraînes-tu aujourd'hui ?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trainingModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setTrainingMode(mode.id)}
                  className={`p-8 rounded-2xl border-4 transition-all hover:scale-105 ${
                    trainingMode === mode.id
                      ? `border-purple-500 bg-gradient-to-br ${mode.color} bg-opacity-10`
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="text-6xl mb-4">{mode.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.label}</h3>
                  <mode.icon className="w-8 h-8 mx-auto text-gray-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <ArrowUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{progressStats.totalWorkouts}</p>
              <p className="text-sm text-gray-600">Séances totales</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-green-600 font-bold">+15%</span>
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{progressStats.totalCalories}</p>
              <p className="text-sm text-gray-600">Calories brûlées</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{progressStats.currentStreak}</p>
              <p className="text-sm text-gray-600">Jours de suite</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <ArrowUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{progressStats.weightProgression}</p>
              <p className="text-sm text-gray-600">Progression force</p>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-10 h-10 text-white" />
                <h2 className="text-3xl font-black text-white">Analyse IA de ta progression</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
                  <TrendingUp className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-bold mb-1">🎯 Performance en hausse !</p>
                    <p className="text-purple-100">
                      Tu soulèves <span className="font-black text-yellow-400">+12% plus lourd</span> qu'il y a 4 semaines sur les exercices de poussée. Continue comme ça !
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
                  <Clock className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-bold mb-1">⚡ Temps de récupération optimisé</p>
                    <p className="text-purple-100">
                      Tes temps de repos diminuent de 8% en moyenne. Ton endurance musculaire s'améliore !
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-xl p-4">
                  <Award className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-bold mb-1">🏆 Nouveau record personnel !</p>
                    <p className="text-purple-100">
                      Développé couché : 85kg × 8 reps (précédent record : 80kg × 8)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Week Progress */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cette semaine</h2>
            <div className="flex items-end justify-between gap-4 h-48">
              {weekProgress.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                  <div className="relative w-full flex flex-col justify-end h-full">
                    <div
                      className={`w-full rounded-t-xl transition-all cursor-pointer relative group ${
                        day.completed
                          ? 'bg-gradient-to-t from-blue-600 to-purple-500 hover:from-blue-500 hover:to-purple-400'
                          : 'bg-gray-200'
                      }`}
                      style={{ height: day.completed ? `${day.intensity}%` : '20%' }}
                    >
                      {day.completed && (
                        <>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {day.intensity}% intensité
                          </div>
                          <Check className="w-5 h-5 text-white absolute top-2 left-1/2 -translate-x-1/2" />
                        </>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${day.completed ? 'text-purple-600' : 'text-gray-400'}`}>
                    {day.day}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Workout Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Programme du jour 💪</h2>
              <button
                onClick={() => setActiveTab('workout')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Commencer la séance
              </button>
            </div>

            <div className="space-y-4">
              {todayWorkout.slice(0, 3).map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-black text-lg">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{exercise.name}</h3>
                    <p className="text-sm text-gray-600">
                      {exercise.sets} séries × {exercise.reps} reps
                      {exercise.weight && ` • ${exercise.weight}kg`}
                    </p>
                  </div>
                  <Video className="w-5 h-5 text-purple-500" />
                </div>
              ))}
              {todayWorkout.length > 3 && (
                <p className="text-center text-gray-500 py-2">
                  + {todayWorkout.length - 3} autres exercices
                </p>
              )}
            </div>
          </div>

        </div>
      </div>
    )
  }

  // WORKOUT TAB
  if (activeTab === 'workout') {
    const currentExercise = todayWorkout[currentExerciseIndex]
    const progress = ((currentExerciseIndex + 1) / todayWorkout.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-6 flex items-center gap-2 text-white/70 hover:text-white transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Quitter la séance
          </button>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white font-semibold">
                Exercice {currentExerciseIndex + 1} sur {todayWorkout.length}
              </p>
              <p className="text-purple-300">{Math.round(progress)}% complété</p>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current Exercise */}
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-purple-300 text-sm mb-2">{currentExercise.category}</p>
                <h2 className="text-4xl font-black text-white mb-2">{currentExercise.name}</h2>
                <p className="text-2xl text-purple-200">
                  {currentExercise.sets} séries × {currentExercise.reps} reps
                </p>
              </div>
              <button className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center hover:scale-110 transition">
                <Video className="w-10 h-10" />
              </button>
            </div>

            {currentExercise.weight && (
              <div className="flex items-center gap-4 mb-6">
                <button className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition">
                  <Minus className="w-6 h-6" />
                </button>
                <div className="flex-1 text-center">
                  <p className="text-5xl font-black text-white mb-1">{currentExercise.weight}kg</p>
                  <p className="text-purple-300 text-sm">Poids actuel</p>
                </div>
                <button className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition">
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-500/20 rounded-xl p-4 mb-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Conseils de l'IA
              </h3>
              <ul className="space-y-2">
                {currentExercise.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rest Timer */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-8 text-center mb-8">
            <Timer className="w-16 h-16 text-white mx-auto mb-4" />
            <p className="text-white text-xl mb-4">Temps de repos</p>
            <p className="text-7xl font-black text-white mb-6">{formatTime(timeRemaining)}</p>
            
            <div className="flex items-center justify-center gap-4">
              {!timerActive ? (
                <button
                  onClick={() => startRestTimer(currentExercise.rest)}
                  className="px-12 py-4 bg-white text-orange-600 rounded-xl font-black text-xl hover:shadow-2xl transition flex items-center gap-3"
                >
                  <Play className="w-6 h-6" />
                  Démarrer le repos ({currentExercise.rest}s)
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setTimerActive(false)}
                    className="px-8 py-4 bg-white/20 backdrop-blur text-white rounded-xl font-bold hover:bg-white/30 transition flex items-center gap-2"
                  >
                    <Pause className="w-6 h-6" />
                    Pause
                  </button>
                  <button
                    onClick={() => {
                      setTimeRemaining(currentExercise.rest)
                      setTimerActive(false)
                    }}
                    className="px-8 py-4 bg-white/20 backdrop-blur text-white rounded-xl font-bold hover:bg-white/30 transition flex items-center gap-2"
                  >
                    <RotateCcw className="w-6 h-6" />
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentExerciseIndex(Math.max(0, currentExerciseIndex - 1))}
              disabled={currentExerciseIndex === 0}
              className="flex-1 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-bold hover:bg-white/20 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Exercice précédent
            </button>
            <button
              onClick={() => {
                if (currentExerciseIndex < todayWorkout.length - 1) {
                  setCurrentExerciseIndex(currentExerciseIndex + 1)
                  setTimeRemaining(60)
                  setTimerActive(false)
                } else {
                  setActiveTab('overview')
                  alert('🎉 Séance terminée ! Bien joué !')
                }
              }}
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl transition"
            >
              {currentExerciseIndex < todayWorkout.length - 1 ? 'Exercice suivant →' : '✓ Terminer la séance'}
            </button>
          </div>

        </div>
      </div>
    )
  }

  // GENERATOR TAB
  if (activeTab === 'generator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
        <div className="max-w-4xl mx-auto">
          
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Retour
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="text-center mb-12">
              <Brain className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Générateur de programme IA
              </h2>
              <p className="text-gray-600 text-lg">
                L'IA crée un programme adapté à ton objectif, ton niveau et ton matériel
              </p>
            </div>

            {/* Goal Selection */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">1. Ton objectif principal</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                      selectedGoal === goal.id
                        ? `border-purple-500 bg-gradient-to-br ${goal.color} bg-opacity-10`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{goal.emoji}</div>
                    <p className="font-bold text-gray-900 text-sm">{goal.label}</p>
                  </button>
                ))}
              </div>
            </div>

{/* Level Selection */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">2. Ton niveau</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'beginner' as ExerciseLevel, label: 'Débutant', emoji: '🌱' },
                  { id: 'intermediate' as ExerciseLevel, label: 'Intermédiaire', emoji: '💪' },
                  { id: 'advanced' as ExerciseLevel, label: 'Avancé', emoji: '🏆' }
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                      selectedLevel === level.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{level.emoji}</div>
                    <p className="font-bold text-gray-900">{level.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Training Mode */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">3. Où t'entraînes-tu ?</h3>
              <div className="grid grid-cols-3 gap-4">
                {trainingModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setTrainingMode(mode.id)}
                    className={`p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                      trainingMode === mode.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-4xl mb-2">{mode.emoji}</div>
                    <p className="font-bold text-gray-900">{mode.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => {
                setActiveTab('overview')
                alert('🎉 Programme généré ! Ton plan personnalisé est prêt.')
              }}
              className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black text-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              Générer mon programme IA 🚀
            </button>

          </div>
        </div>
      </div>
    )
  }

  // HISTORY TAB
  if (activeTab === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Retour
          </button>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-12 h-12 text-blue-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Historique d'entraînement
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Analyse tes performances passées
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-600 font-semibold">Séances ce mois</h3>
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-2">16</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-sm text-green-600 font-semibold">+25% vs mois dernier</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-600 font-semibold">Temps total</h3>
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-2">18h</p>
              <p className="text-sm text-gray-600">Moyenne : 65 min/séance</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-600 font-semibold">Records battus</h3>
                <Award className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-2">{progressStats.personalRecords}</p>
              <p className="text-sm text-purple-600 font-semibold">Ce mois-ci</p>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Séances récentes</h2>
            
            <div className="space-y-4">
              {recentSessions.map((session, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-bold text-gray-900 mb-2">
                      {new Date(session.date).toLocaleDateString('fr-FR', { 
                        weekday: 'long', 
                        day: 'numeric', 
                        month: 'long' 
                      })}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {session.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        {session.exercises} exercices
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {session.caloriesBurned} kcal
                      </span>
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition">
                    Voir détails
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    )
  }

  return null
}