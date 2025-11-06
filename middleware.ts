import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Routes publiques (accessibles sans connexion)
  const publicRoutes = ['/', '/login', '/signup']
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname === route)

  // Si route publique, laisser passer
  if (isPublicRoute) {
    return res
  }

  // Si pas de session et route protégée, rediriger vers login
  if (!session && !isPublicRoute) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Si session existe et route protégée, vérifier onboarding
  if (session && !isPublicRoute) {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('onboarding_completed')
      .eq('user_id', session.user.id)
      .single()

    // Si onboarding non complété et pas sur /onboarding, rediriger
    if (!profile?.onboarding_completed && req.nextUrl.pathname !== '/onboarding') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/onboarding'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}