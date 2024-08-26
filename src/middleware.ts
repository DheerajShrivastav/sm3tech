import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  '/home',
  '/api',
  '/site',
  '/api/uploadthing',
])
const isPublicApiRoute = createRouteMatcher(['/api/videos', '/api/uploadthing'])

export default clerkMiddleware((auth, req) => {
  const { userId } = auth()
  const currentUrl = new URL(req.url)
  const isAccessingDashboard = currentUrl.pathname === '/home'
  const isApiRequest = currentUrl.pathname.startsWith('/api')
  console.log(userId)
  if(isApiRequest)  return NextResponse.next()
  // Prevent redirect loops when accessing the /agency/sign-in page
  if (
    currentUrl.pathname === '/agency/sign-in' ||
    currentUrl.pathname === '/agency/sign-up'
  ) {
    return NextResponse.next() // Allow the user to access the sign-in page
  }

  // If user is logged in and accessing a public route but not the dashboard
  if (userId && isPublicRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // If not logged in
  if (!userId) {
    // If user is trying to access a protected route
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    // If the request is for a protected API and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    // If the user is trying to access sign-in or sign-up page
    if (
      currentUrl.pathname === '/sign-in' ||
      currentUrl.pathname === '/sign-up'
    ) {
      return NextResponse.redirect(new URL('/agency/sign-in', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
