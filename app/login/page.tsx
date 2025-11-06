'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Dumbbell, Mail, Lock, Loader2, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  const addDebug = (message: string) => {
    console.log(message)
    setDebugInfo(prev => [...prev, message])
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setDebugInfo([])
    setLoading(true)

    addDebug('🔐 DEBUT CONNEXION')
    addDebug(`📧 Email: ${email}`)
    addDebug(`🔑 Password: ${password.length} caracteres`)

    try {
      // Test 1: Vérifier la connexion Supabase
      addDebug('🔍 Test connexion Supabase...')
      const { data: testData, error: testError } = await supabase.auth.getSession()
      addDebug(`Session actuelle: ${testData.session ? 'Existe' : 'Aucune'}`)

      // Test 2: Tentative de connexion
      addDebug('🔐 Tentative signInWithPassword...')
      
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (signInError) {
        addDebug(`❌ Erreur signIn: ${signInError.message}`)
        addDebug(`Code erreur: ${signInError.status}`)
        throw signInError
      }

      addDebug('✅ SignIn SUCCESS!')
      addDebug(`User ID: ${authData.user?.id}`)
      addDebug(`Email: ${authData.user?.email}`)
      addDebug(`Email confirmed: ${authData.user?.email_confirmed_at ? 'OUI' : 'NON'}`)

      // Test 3: Vérifier la session après connexion
      const { data: sessionAfter } = await supabase.auth.getSession()
      addDebug(`Session apres login: ${sessionAfter.session ? 'EXISTE' : 'AUCUNE'}`)

      // Test 4: Récupérer le profil
      addDebug('📊 Recherche du profil...')
      
      const { data: profiles, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authData.user.id)

      addDebug(`Nombre de profils trouves: ${profiles?.length || 0}`)

      if (profileError) {
        addDebug(`⚠️ Erreur profil: ${profileError.message}`)
      }

      if (!profiles || profiles.length === 0) {
        addDebug('⚠️ AUCUN PROFIL - Redirection onboarding')
        addDebug('Attente 2 secondes...')
        
        setTimeout(() => {
          addDebug('➡️ GO ONBOARDING')
          window.location.href = '/onboarding'
        }, 2000)
        return
      }

      const profile = profiles[0]
      addDebug(`✅ Profil trouve: ${JSON.stringify(profile)}`)

      if (profile.onboarding_completed) {
        addDebug('✅ ONBOARDING COMPLET')
        addDebug('Attente 2 secondes...')
        
        setTimeout(() => {
          addDebug('➡️ GO DASHBOARD')
          window.location.href = '/dashboard'
        }, 2000)
      } else {
        addDebug('⚠️ ONBOARDING INCOMPLET')
        addDebug('Attente 2 secondes...')
        
        setTimeout(() => {
          addDebug('➡️ GO ONBOARDING')
          window.location.href = '/onboarding'
        }, 2000)
      }

    } catch (err: any) {
      addDebug(`❌ ERREUR FATALE: ${err.message}`)
      addDebug(`Stack: ${err.stack}`)
      
      if (err.message.includes('Invalid login credentials')) {
        setError('❌ Email ou mot de passe incorrect')
      } else if (err.message.includes('Email not confirmed')) {
        setError('❌ Email non confirme. Verifie ta boite mail ou desactive la confirmation dans Supabase.')
      } else {
        setError(`❌ ${err.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      
      <div className="w-full max-w-2xl">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Dumbbell className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-black text-white">Fitora</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bon retour !</h1>
          <p className="text-white/60">Mode DEBUG active</p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <form onSubmit={handleLogin} className="space-y-6">
            
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl pl-12 pr-12 py-3.5 text-white placeholder-white/30 outline-none"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <p className="text-red-200 font-semibold text-sm">{error}</p>
              </div>
            )}

            {debugInfo.length > 0 && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl max-h-96 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <p className="text-blue-200 font-semibold text-sm">Logs en direct:</p>
                </div>
                <div className="space-y-1">
                  {debugInfo.map((info, i) => (
                    <p key={i} className="text-blue-200/80 text-xs font-mono leading-relaxed">
                      {i + 1}. {info}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Pas de compte ?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-purple-400 hover:text-purple-300 font-bold"
              >
                Creer un compte
              </button>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => window.location.href = '/'}
            className="text-white/50 hover:text-white/80 text-sm"
          >
            ← Retour accueil
          </button>
        </div>
      </div>
    </div>
  )
}