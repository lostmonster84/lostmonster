import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware: Auto-redirect mobile users to TikTok-style experience
 * 
 * Mobile users: / → /m/ (TikTok-style)
 * Desktop users: / → stays on desktop version
 */
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
  const pathname = request.nextUrl.pathname

  // Mobile users → redirect to /m/ routes
  if (isMobile && !pathname.startsWith('/m') && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL(`/m${pathname}`, request.url))
  }

  // Desktop users accidentally on /m/ → redirect back
  if (!isMobile && pathname.startsWith('/m')) {
    const desktopPath = pathname.replace(/^\/m/, '') || '/'
    return NextResponse.redirect(new URL(desktopPath, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

