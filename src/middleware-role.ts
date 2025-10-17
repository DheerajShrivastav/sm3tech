import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isApiAdminRoute = createRouteMatcher(['/api/admin(.*)'])

export default clerkMiddleware((auth, req) => {
  // Check if the route requires admin access
  if (isAdminRoute(req) || isApiAdminRoute(req)) {
    auth().protect()
    
    // Additional role-based checks will be handled in the actual pages/API routes
    // since middleware can't easily access database
  }
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/(api|trpc)(.*)',
  ],
}