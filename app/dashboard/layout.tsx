'use client'

import { useState } from 'react'
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
  Heart,
  Sparkles,
  Menu,
  X,
  Settings
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        w-64 h-full
        bg-gradient-to-b from-indigo-900 via-purple-900 to-indigo-950 
        text-white 
        flex flex-col 
        shadow-2xl
        z-40
        transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Dumbbell className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fitora
              </h1>
              <p className="text-xs text-purple-300">Votre coach</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-3 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-bold text-purple-300 mb-2 px-2 tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                            : 'text-purple-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                        <span className="text-sm font-semibold truncate">{item.name}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Settings Link */}
        <div className="px-3 pb-3">
          <Link
            href="/dashboard/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all ${
              pathname === '/dashboard/settings'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-purple-200 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Settings className={`w-4 h-4 ${pathname === '/dashboard/settings' ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
            <span className="text-sm font-semibold">Paramètres</span>
            {pathname === '/dashboard/settings' && (
              <div className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </Link>
        </div>

        {/* User section */}
        <div className="p-3 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-2 mb-3 p-2 bg-white/5 rounded-lg backdrop-blur border border-white/10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white/20">
                <User className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-indigo-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Utilisateur Demo</p>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <p className="text-xs text-purple-300 font-semibold">150 crédits</p>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-all group">
            <LogOut className="w-3 h-3 group-hover:translate-x-[-2px] transition-transform" />
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