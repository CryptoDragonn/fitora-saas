'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Utensils, 
  Dumbbell,
  User,
  LogOut,
  Apple,
  Flame,
  Crown,
  Sparkles,
  Heart
} from 'lucide-react'

const menuItems = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'Dashboard de suivi', icon: TrendingUp, href: '/dashboard/suivi' }
    ]
  },
{
  title: 'PROGRESSION',
  items: [
    { name: 'Entraînement & Suivi', icon: Dumbbell, href: '/dashboard/training' },
    { name: 'Nutrition', icon: Apple, href: '/dashboard/nutrition' },
    { name: 'Santé & Bien-être', icon: Heart, href: '/dashboard/wellness' },
    { name: 'Exercices', icon: Dumbbell, href: '/dashboard/exercices' }
  ]
}
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 text-white flex flex-col shadow-2xl">
        
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Dumbbell className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fitora
              </h1>
              <p className="text-xs text-purple-300">Votre coach personnel</p>
            </div>
          </Link>
        </div>

        {/* Premium Badge */}
        <div className="mx-4 mt-4 mb-2">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-white" />
                <span className="font-bold text-white text-sm">Premium</span>
              </div>
              <p className="text-xs text-white/90 mb-3">
                Accès illimité à toutes les fonctionnalités
              </p>
              <button className="w-full py-2 bg-white text-orange-600 rounded-lg text-xs font-bold hover:shadow-lg transition">
                Gérer mon abonnement
              </button>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.title} className="mb-8">
              <h3 className="text-xs font-bold text-purple-300 mb-3 px-3 tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                            : 'text-purple-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                        <span className="text-sm font-semibold">{item.name}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Quick Stats */}
          <div className="mt-8 px-3">
            <h3 className="text-xs font-bold text-purple-300 mb-3 tracking-wider">
              AUJOURD'HUI
            </h3>
            <div className="space-y-3">
              <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-purple-300">Calories brûlées</span>
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-2xl font-black text-white">450</p>
                <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-3/4"></div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur rounded-xl p-3 border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-purple-300">Séances</span>
                  <Dumbbell className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-black text-white">1/7</p>
                <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-1/7"></div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-xl backdrop-blur border border-white/10">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white/20">
                <User className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-indigo-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Utilisateur Demo</p>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <p className="text-xs text-purple-300 font-semibold">150 crédits</p>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-purple-200 hover:text-white hover:bg-white/10 rounded-xl transition-all group">
            <LogOut className="w-4 h-4 group-hover:translate-x-[-2px] transition-transform" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}