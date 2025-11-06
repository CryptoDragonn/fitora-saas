'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Dumbbell, Mail, Lock, Loader2, AlertCircle, Check } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email || !password || !confirmPassword) {
      setError('Tous les champs sont obligatoires')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
        }
      })

      if (signUpError) throw signUpError

      setSuccess(true)
      setTimeout(() => {
        router.push('/onboarding')
      }, 2000)

    } catch (err: any) {
      console.error('Erreur inscription:', err)
      
      if (err.message.includes('already registered')) {
        setError('Cet email est deja utilise')
      } else {
        setError(err.message || 'Erreur lors de la creation du compte')
      }
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/20 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Compte cree avec succes</h2>
          <p className="text-white/70 mb-4">Redirection vers la configuration...</p>
          <Loader2 className="w-6 h-6 text-white animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Dumbbell className="w-10 h-10 text-purple-400" />
            <span className="text-3xl font-black text-white">Fitora</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Creer un compte</h1>
          <p className="text-white/70">Commence ton parcours fitness maintenant</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <form onSubmit={handleSignup} className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 caracteres"
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Confirmer</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Retape ton mot de passe"
                  className="w-full bg-white/5 border-2 border-white/10 focus:border-purple-500 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/30 outline-none transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creation en cours...
                </>
              ) : (
                'Creer mon compte'
              )}
            </button>
          </form>

          {/* Link to login */}
          <p className="text-center text-white/70 text-sm mt-6">
            Tu as deja un compte ?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Se connecter
            </button>
          </p>
        </div>

        {/* Back home */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-white/60 hover:text-white text-sm"
          >
            Retour a l accueil
          </button>
        </div>
      </div>
    </div>
  )
}