import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Désactivé temporairement pour debug
  return NextResponse.next()
}

export const config = {
  matcher: []
}