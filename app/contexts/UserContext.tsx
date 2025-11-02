'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Goal = 'lose_weight' | 'gain_muscle' | 'maintain'
type DietType = 'standard' | 'vegetarian' | 'vegan' | 'halal' | 'keto' | 'paleo'
type TrainingMode = 'home' | 'gym' | 'outdoor'
type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced'

interface UserProfile {
  // Onboarding
  hasCompletedOnboarding: boolean
  goal: Goal | null
  currentWeight: number | null
  targetWeight: number | null
  height: number | null
  age: number | null
  gender: 'male' | 'female' | 'other' | null
  
  // Preferences
  dietType: DietType
  trainingMode: TrainingMode
  exerciseLevel: ExerciseLevel
  
  // Personal Info
  displayName: string
  email: string
  
  // Progress
  workoutsCompleted: number
  totalCaloriesBurned: number
  currentStreak: number
  
  // Settings
  notificationPreferences: {
    workoutReminders: boolean
    nutritionReminders: boolean
    weeklyProgress: boolean
    tips: boolean
    news: boolean
    marketing: boolean
  }
}

interface UserContextType {
  user: UserProfile
  updateUser: (updates: Partial<UserProfile>) => void
  completeOnboarding: (data: Partial<UserProfile>) => void
  resetUser: () => void
}

const defaultUser: UserProfile = {
  hasCompletedOnboarding: false,
  goal: null,
  currentWeight: null,
  targetWeight: null,
  height: null,
  age: null,
  gender: null,
  dietType: 'standard',
  trainingMode: 'gym',
  exerciseLevel: 'intermediate',
  displayName: 'Utilisateur Demo',
  email: 'demo@fitora.com',
  workoutsCompleted: 0,
  totalCaloriesBurned: 0,
  currentStreak: 0,
  notificationPreferences: {
    workoutReminders: true,
    nutritionReminders: true,
    weeklyProgress: true,
    tips: false,
    news: true,
    marketing: false
  }
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fitora_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fitora_user', JSON.stringify(user))
    }
  }, [user, isLoaded])

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updates }))
  }

  const completeOnboarding = (data: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...data,
      hasCompletedOnboarding: true
    }))
  }

  const resetUser = () => {
    setUser(defaultUser)
    localStorage.removeItem('fitora_user')
  }

  return (
    <UserContext.Provider value={{ user, updateUser, completeOnboarding, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}