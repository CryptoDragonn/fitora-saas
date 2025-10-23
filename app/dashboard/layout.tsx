'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  TrendingUp, 
  Utensils, 
  Dumbbell,
  User,
  LogOut
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
      { name: 'Mon plan d\'action', icon: TrendingUp, href: '/dashboard/progression' },
      { name: 'Plan repas', icon: Utensils, href: '/dashboard/repas' },
      { name: 'Tutoriels exercices', icon: Dumbbell, href: '/dashboard/exercices' }
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-indigo-800">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Dumbbell className="w-8 h-8" />
            Fitora
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-xs font-semibold text-indigo-300 mb-3 px-3">
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
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                          isActive
                            ? 'bg-indigo-700 text-white'
                            : 'text-indigo-200 hover:bg-indigo-800/50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-indigo-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Utilisateur Demo</p>
              <p className="text-xs text-indigo-300">150 crédits</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-indigo-200 hover:bg-indigo-800/50 rounded-lg transition">
            <LogOut className="w-4 h-4" />
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