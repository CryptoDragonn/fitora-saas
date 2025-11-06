import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Laisser passer toutes les requêtes
  // Le middleware est désactivé pour permettre l'accès libre à la landing page
  return NextResponse.next()
}

export const config = {
  matcher: [],
}