'use client'

import { useState } from 'react'
import { 
  User,
  Shield,
  CreditCard,
  Bell,
  Trash2,
  Save,
  Edit2,
  Mail,
  Lock,
  Crown,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

type Tab = 'account' | 'security' | 'subscription' | 'notifications'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('account')
  const [displayName, setDisplayName] = useState('Utilisateur Demo')
  const [email, setEmail] = useState('demo@fitora.com')
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)

  const tabs = [
    { id: 'account' as Tab, label: 'Compte', icon: User },
    { id: 'security' as Tab, label: 'Sécurité', icon: Shield },
    { id: 'subscription' as Tab, label: 'Abonnement', icon: CreditCard },
    { id: 'notifications' as Tab, label: 'Notifications', icon: Bell }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header */}
        <div className="mb-8 pt-16 lg:pt-0">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            Paramètres
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Gérez votre compte, sécurité et préférences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              
              {/* ACCOUNT TAB */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations du compte</h2>
                  
                  <div className="space-y-6">
                    {/* Display Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom d'affichage
                      </label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Adresse email
                        </label>
                        <button className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
                          <Edit2 className="w-4 h-4" />
                          Modifier
                        </button>
                      </div>
                      <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{email}</span>
                      </div>
                    </div>

                    {/* Save Button */}
                    <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2">
                      <Save className="w-5 h-5" />
                      Enregistrer
                    </button>
                  </div>

                  {/* Delete Account Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-bold text-red-900 mb-2">Zone dangereuse</h3>
                          <p className="text-red-700 text-sm">
                            La suppression de votre compte est irréversible.
                          </p>
                        </div>
                      </div>
                      
                      {!showDeleteWarning ? (
                        <button
                          onClick={() => setShowDeleteWarning(true)}
                          className="px-6 py-3 bg-white border-2 border-red-500 text-red-600 rounded-xl font-bold hover:bg-red-50 transition"
                        >
                          Supprimer mon compte
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-red-800 font-semibold">
                            Êtes-vous sûr ? Cette action ne peut pas être annulée.
                          </p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => alert('Compte supprimé (simulation)')}
                              className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition flex items-center gap-2"
                            >
                              <Trash2 className="w-5 h-5" />
                              Confirmer la suppression
                            </button>
                            <button
                              onClick={() => setShowDeleteWarning(false)}
                              className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité</h2>
                  
                  <div className="space-y-6">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Mot de passe actuel
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirmer le mot de passe
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105">
                      Mettre à jour le mot de passe
                    </button>
                  </div>

                  {/* Two-Factor Auth */}
                  <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">
                          Authentification à deux facteurs
                        </h3>
                        <p className="text-blue-700 text-sm mb-4">
                          Ajoutez une couche de sécurité supplémentaire à votre compte.
                        </p>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                          Activer 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBSCRIPTION TAB */}
              {activeTab === 'subscription' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Abonnement</h2>
                  
                  {/* Current Plan */}
                  <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Crown className="w-10 h-10 text-yellow-400" />
                        <div>
                          <h3 className="text-2xl font-black">Fitora Premium</h3>
                          <p className="text-purple-200">Plan actuel</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-black">9,99€</p>
                        <p className="text-purple-200">/mois</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Plans personnalisés illimités</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>500+ exercices vidéo HD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Suivi nutrition complet</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>Support prioritaire 24/7</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-purple-200">
                      <span>Prochain renouvellement : 23 novembre 2025</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <button className="w-full px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition">
                      Modifier le moyen de paiement
                    </button>
                    <button className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition">
                      Annuler l'abonnement
                    </button>
                  </div>

                  {/* Billing History */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Historique de facturation</h3>
                    <div className="space-y-3">
                      {[
                        { date: '23 octobre 2025', amount: '9,99€', status: 'Payé' },
                        { date: '23 septembre 2025', amount: '9,99€', status: 'Payé' },
                        { date: '23 août 2025', amount: '9,99€', status: 'Payé' }
                      ].map((invoice, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-semibold text-gray-900">{invoice.date}</p>
                            <p className="text-sm text-gray-600">Fitora Premium</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">{invoice.amount}</p>
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
                  
                  <div className="space-y-6">
                    {[
                      { id: 1, title: 'Rappels d\'entraînement', description: 'Notifications pour les séances planifiées', enabled: true },
                      { id: 2, title: 'Rappels nutrition', description: 'Rappels pour les repas et hydratation', enabled: true },
                      { id: 3, title: 'Progression hebdomadaire', description: 'Résumé de vos performances chaque semaine', enabled: true },
                      { id: 4, title: 'Conseils et astuces', description: 'Conseils personnalisés de l\'IA', enabled: false },
                      { id: 5, title: 'Nouveautés Fitora', description: 'Nouvelles fonctionnalités et mises à jour', enabled: true },
                      { id: 6, title: 'Emails marketing', description: 'Offres spéciales et promotions', enabled: false }
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105">
                    Enregistrer les préférences
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}