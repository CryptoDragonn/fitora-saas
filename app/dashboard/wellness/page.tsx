'use client'

import { useState, useEffect } from 'react'
import { 
  Moon,
  Droplets,
  Heart,
  Brain,
  Wind,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Activity,
  Zap,
  Check,
  Plus,
  Play,
  Pause,
  RefreshCw,
  Calendar,
  AlertCircle,
  Award,
  Target,
  Sun,
  CloudRain,
  Smile,
  Frown,
  Meh
} from 'lucide-react'

type MoodType = 'great' | 'good' | 'okay' | 'bad' | 'terrible'
type StressLevel = 1 | 2 | 3 | 4 | 5

interface SleepData {
  date: string
  hours: number
  quality: number
}

interface WaterIntake {
  current: number
  goal: number
  glasses: boolean[]
}

export default function WellnessPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sleep' | 'hydration' | 'heart' | 'relaxation'>('overview')
  const [waterIntake, setWaterIntake] = useState<WaterIntake>({
    current: 5,
    goal: 8,
    glasses: [true, true, true, true, true, false, false, false]
  })
  const [sleepHours, setSleepHours] = useState(7.5)
  const [heartRate, setHeartRate] = useState(72)
  const [stressLevel, setStressLevel] = useState<StressLevel>(2)
  const [mood, setMood] = useState<MoodType>('good')
  const [breathingActive, setBreathingActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')

  const sleepWeekData: SleepData[] = [
    { date: 'Lun', hours: 7.2, quality: 75 },
    { date: 'Mar', hours: 6.8, quality: 65 },
    { date: 'Mer', hours: 8.1, quality: 85 },
    { date: 'Jeu', hours: 7.5, quality: 80 },
    { date: 'Ven', hours: 6.5, quality: 60 },
    { date: 'Sam', hours: 8.5, quality: 90 },
    { date: 'Dim', hours: 7.5, quality: 78 }
  ]

  const relaxationExercises = [
    {
      title: 'Respiration 4-7-8',
      duration: '5 min',
      description: 'Technique pour réduire l\'anxiété et favoriser le sommeil',
      icon: Wind,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Débutant'
    },
    {
      title: 'Méditation guidée',
      duration: '10 min',
      description: 'Méditation de pleine conscience pour se recentrer',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Tous niveaux'
    },
    {
      title: 'Stretching doux',
      duration: '15 min',
      description: 'Étirements relaxants pour détendre les muscles',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Tous niveaux'
    },
    {
      title: 'Body scan',
      duration: '12 min',
      description: 'Scan corporel pour relâcher les tensions',
      icon: Sparkles,
      color: 'from-orange-500 to-red-500',
      difficulty: 'Débutant'
    }
  ]

  const aiRecommendations = [
    {
      type: 'sleep',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      title: 'Optimisez votre sommeil',
      message: 'Couche-toi 30 min plus tôt ce soir pour mieux récupérer demain. Tu as une séance intense prévue !',
      priority: 'high'
    },
    {
      type: 'hydration',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      title: 'Hydratation insuffisante',
      message: 'Il te reste 3 verres à boire avant 20h. Pense à boire régulièrement pendant ton entraînement.',
      priority: 'medium'
    },
    {
      type: 'stress',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      title: 'Stress détecté',
      message: 'Ta fréquence cardiaque est élevée. Prends 5 minutes pour faire une respiration profonde.',
      priority: 'high'
    }
  ]

  const moods = [
    { id: 'great' as MoodType, emoji: '😄', label: 'Excellent', color: 'text-green-500' },
    { id: 'good' as MoodType, emoji: '🙂', label: 'Bien', color: 'text-blue-500' },
    { id: 'okay' as MoodType, emoji: '😐', label: 'Moyen', color: 'text-yellow-500' },
    { id: 'bad' as MoodType, emoji: '😕', label: 'Pas bien', color: 'text-orange-500' },
    { id: 'terrible' as MoodType, emoji: '😢', label: 'Très mal', color: 'text-red-500' }
  ]

  const addWaterGlass = () => {
    if (waterIntake.current < waterIntake.goal) {
      const newGlasses = [...waterIntake.glasses]
      newGlasses[waterIntake.current] = true
      setWaterIntake({
        ...waterIntake,
        current: waterIntake.current + 1,
        glasses: newGlasses
      })
    }
  }

  useEffect(() => {
    if (breathingActive) {
      const interval = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [breathingActive])

  // OVERVIEW TAB
  if (activeTab === 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-12 h-12 text-pink-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Santé & Bien-être
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-xl text-gray-600">
              Suivi complet de votre santé physique et mentale
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <button
              onClick={() => setActiveTab('sleep')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Moon className="w-7 h-7 text-white" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm text-gray-600 mb-2">Sommeil</h3>
              <p className="text-3xl font-black text-gray-900">{sleepHours}h</p>
              <p className="text-sm text-green-600 font-semibold mt-2">+0.5h vs hier</p>
            </button>

            <button
              onClick={() => setActiveTab('hydration')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Droplets className="w-7 h-7 text-white" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm text-gray-600 mb-2">Hydratation</h3>
              <p className="text-3xl font-black text-gray-900">{waterIntake.current}/{waterIntake.goal}</p>
              <div className="h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                  style={{ width: `${(waterIntake.current / waterIntake.goal) * 100}%` }}
                ></div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('heart')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-white animate-pulse" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm text-gray-600 mb-2">Fréquence cardiaque</h3>
              <p className="text-3xl font-black text-gray-900">{heartRate}</p>
              <p className="text-sm text-gray-600 mt-2">bpm au repos</p>
            </button>

            <button
              onClick={() => setActiveTab('relaxation')}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Wind className="w-7 h-7 text-white" />
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm text-gray-600 mb-2">Relaxation</h3>
              <p className="text-3xl font-black text-gray-900">3</p>
              <p className="text-sm text-gray-600 mt-2">séances cette semaine</p>
            </button>
          </div>

          {/* AI Recommendations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-500" />
              Recommandations IA personnalisées
            </h2>
            
            <div className="space-y-4">
              {aiRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${
                    rec.priority === 'high' ? 'border-red-500' : 'border-yellow-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${rec.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <rec.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                        {rec.priority === 'high' && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{rec.message}</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                      Appliquer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Tracker */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comment te sens-tu aujourd'hui ? 😊
            </h2>
            <div className="grid grid-cols-5 gap-4">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`p-6 rounded-2xl border-4 transition-all hover:scale-105 ${
                    mood === m.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-5xl mb-2">{m.emoji}</div>
                  <p className={`text-sm font-bold ${m.color}`}>{m.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Relaxation Exercises */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Wind className="w-6 h-6 text-blue-500" />
              Exercices de relaxation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relaxationExercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${exercise.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <exercise.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{exercise.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {exercise.duration}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{exercise.description}</p>
                  <button 
                    onClick={() => setActiveTab('relaxation')}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Commencer
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    )
  }

  // SLEEP TAB
  if (activeTab === 'sleep') {
    const avgSleep = sleepWeekData.reduce((sum, day) => sum + day.hours, 0) / sleepWeekData.length
    const avgQuality = sleepWeekData.reduce((sum, day) => sum + day.quality, 0) / sleepWeekData.length

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8">
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
              <Moon className="w-12 h-12 text-indigo-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Suivi du sommeil
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Analysez et optimisez votre qualité de sommeil
            </p>
          </div>

          {/* Weekly Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-600 font-semibold">Moyenne cette semaine</h3>
                <Moon className="w-6 h-6 text-indigo-500" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-2">{avgSleep.toFixed(1)}h</p>
              <p className="text-sm text-green-600 font-semibold">Objectif : 8h</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-600 font-semibold">Qualité moyenne</h3>
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-2">{Math.round(avgQuality)}%</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${avgQuality}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-600 font-semibold">Régularité</h3>
                <Target className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-4xl font-black text-gray-900 mb-2">85%</p>
              <p className="text-sm text-gray-600">Couché à heure régulière</p>
            </div>
          </div>

          {/* Sleep Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Heures de sommeil - 7 derniers jours</h2>
            
            <div className="flex items-end justify-between gap-4 h-64">
              {sleepWeekData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                  <div className="relative w-full flex flex-col justify-end h-full">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-xl hover:from-indigo-500 hover:to-purple-400 transition-all cursor-pointer relative group"
                      style={{ height: `${(day.hours / 10) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.hours}h • {day.quality}%
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-600">{day.date}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-100">
              <div className="w-4 h-4 bg-gradient-to-br from-indigo-600 to-purple-500 rounded"></div>
              <span className="text-sm text-gray-600">Heures de sommeil</span>
            </div>
          </div>

          {/* Add Sleep Entry */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6">Ajouter une nuit de sommeil</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white font-semibold mb-3">Heures dormies</label>
                <input
                  type="number"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl text-gray-900 font-bold text-lg"
                  placeholder="7.5"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Qualité du sommeil</label>
                <select className="w-full px-4 py-3 rounded-xl text-gray-900 font-bold text-lg">
                  <option>Excellente</option>
                  <option>Bonne</option>
                  <option>Moyenne</option>
                  <option>Mauvaise</option>
                </select>
              </div>
            </div>

            <button className="w-full py-4 bg-white text-indigo-600 rounded-xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105">
              Enregistrer ma nuit 🌙
            </button>
          </div>

        </div>
      </div>
    )
  }

  // HYDRATION TAB
  if (activeTab === 'hydration') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8">
        <div className="max-w-4xl mx-auto">
          
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Retour
          </button>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="w-12 h-12 text-blue-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Suivi hydratation
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Restez hydraté tout au long de la journée
            </p>
          </div>

          {/* Progress Circle */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-12 text-center shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="white"
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - waterIntake.current / waterIntake.goal)}`}
                    className="transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="text-6xl font-black text-white">{waterIntake.current}</p>
                  <p className="text-white text-xl">/ {waterIntake.goal} verres</p>
                </div>
              </div>

              <h2 className="text-3xl font-black text-white mb-2">
                {Math.round((waterIntake.current / waterIntake.goal) * 100)}% complété
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Plus que {waterIntake.goal - waterIntake.current} verres à boire aujourd'hui !
              </p>

              <button
                onClick={addWaterGlass}
                disabled={waterIntake.current >= waterIntake.goal}
                className="px-12 py-5 bg-white text-blue-600 rounded-full font-black text-xl hover:shadow-2xl transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              >
                <Plus className="w-6 h-6" />
                J'ai bu un verre 💧
              </button>
            </div>
          </div>

          {/* Water Glasses Grid */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Progression aujourd'hui</h2>
            
            <div className="grid grid-cols-4 gap-4">
              {waterIntake.glasses.map((filled, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const newGlasses = [...waterIntake.glasses]
                    newGlasses[index] = !newGlasses[index]
                    const newCurrent = newGlasses.filter(g => g).length
                    setWaterIntake({
                      ...waterIntake,
                      current: newCurrent,
                      glasses: newGlasses
                    })
                  }}
                  className={`aspect-square rounded-2xl border-4 transition-all hover:scale-105 flex items-center justify-center ${
                    filled
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 border-blue-500'
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Droplets className={`w-12 h-12 ${filled ? 'text-white' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <Brain className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">💡 Conseil IA</h3>
                  <p className="text-gray-700">
                    Bois un grand verre d'eau au réveil pour réhydrater ton corps après la nuit. 
                    Ton prochain rappel dans 2 heures !
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }

  // HEART RATE TAB
  if (activeTab === 'heart') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-8">
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
              <Heart className="w-12 h-12 text-red-500 animate-pulse" />
              <h1 className="text-5xl font-black text-gray-900">
                Fréquence cardiaque & Stress
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Surveillez votre santé cardiovasculaire en temps réel
            </p>
          </div>

          {/* Current Heart Rate */}
          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl p-12 text-center shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <Heart className="w-24 h-24 text-white mx-auto mb-6 animate-pulse" />
              <p className="text-8xl font-black text-white mb-4">{heartRate}</p>
              <p className="text-white text-2xl font-semibold mb-8">battements par minute</p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-xl">
                  <p className="text-white text-sm">Zone</p>
                  <p className="text-white font-bold">Repos</p>
                </div>
                <div className="px-6 py-3 bg-white/20 backdrop-blur rounded-xl">
                  <p className="text-white text-sm">État</p>
                  <p className="text-white font-bold">Normal ✓</p>
                </div>
              </div>
            </div>
          </div>

          {/* Heart Rate Zones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-600">Zone Repos</h3>
                  <p className="text-xl font-black text-gray-900">60-80 bpm</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-4/5"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-600">Zone Cardio</h3>
                  <p className="text-xl font-black text-gray-900">120-150 bpm</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-3/5"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-600">Zone Intense</h3>
                  <p className="text-xl font-black text-gray-900">150-180 bpm</p>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-2/5"></div>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Niveau de stress</h2>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Très faible</span>
                <span className="text-sm text-gray-600">Très élevé</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value) as StressLevel)}
                className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex items-center justify-center mt-6">
                <div className="text-center">
                  <p className="text-5xl font-black text-gray-900 mb-2">{stressLevel}/5</p>
                  <p className={`text-lg font-bold ${
                    stressLevel <= 2 ? 'text-green-600' : 
                    stressLevel === 3 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {stressLevel <= 2 ? 'Stress faible ✓' : 
                     stressLevel === 3 ? 'Stress modéré' : 
                     'Stress élevé ⚠️'}
                  </p>
                </div>
              </div>
            </div>

            {stressLevel >= 4 && (
              <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-2">⚠️ Niveau de stress élevé détecté</h3>
                    <p className="text-red-700 mb-4">
                      L'IA recommande une pause immédiate. Prends 10 minutes pour faire une respiration guidée.
                    </p>
                    <button 
                      onClick={() => setActiveTab('relaxation')}
                      className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition"
                    >
                      Commencer une séance maintenant
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    )
  }

  // RELAXATION TAB
  if (activeTab === 'relaxation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
        <div className="max-w-4xl mx-auto">
          
          <button
            onClick={() => setActiveTab('overview')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Retour
          </button>

          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Wind className="w-12 h-12 text-blue-500" />
              <h1 className="text-5xl font-black text-gray-900">
                Relaxation & Respiration
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Exercices guidés pour réduire le stress et améliorer votre bien-être
            </p>
          </div>

          {/* Breathing Exercise */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-12 text-center shadow-2xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-8">
                Exercice de respiration 4-7-8
              </h2>

              <div className="w-64 h-64 mx-auto mb-8 relative">
                <div 
                  className={`w-full h-full rounded-full bg-white/30 backdrop-blur flex items-center justify-center transition-all duration-1000 ${
                    breathingActive && breathingPhase === 'inhale' ? 'scale-100' :
                    breathingActive && breathingPhase === 'hold' ? 'scale-110' :
                    breathingActive && breathingPhase === 'exhale' ? 'scale-90' :
                    'scale-100'
                  }`}
                >
                  <div className="text-center">
                    <Wind className="w-16 h-16 text-white mx-auto mb-4" />
                    <p className="text-2xl font-bold text-white">
                      {!breathingActive ? 'Prêt ?' :
                       breathingPhase === 'inhale' ? 'Inspire' :
                       breathingPhase === 'hold' ? 'Retiens' :
                       'Expire'}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className="px-12 py-5 bg-white text-blue-600 rounded-full font-black text-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center gap-3 mx-auto"
              >
                {breathingActive ? (
                  <>
                    <Pause className="w-6 h-6" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    Commencer
                  </>
                )}
              </button>

              {breathingActive && (
                <p className="text-white text-lg mt-6">
                  Inspire pendant 4 secondes, retiens pendant 7 secondes, expire pendant 8 secondes
                </p>
              )}
            </div>
          </div>

          {/* All Relaxation Exercises */}
          <div className="space-y-6">
            {relaxationExercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${exercise.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <exercise.icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-3">{exercise.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {exercise.duration}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>

                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Démarrer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Conseils pour une relaxation optimale</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Trouve un endroit calme sans distractions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Porte des vêtements confortables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Pratique idéalement le matin ou avant de dormir</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Commence par 5 minutes et augmente progressivement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return null
}