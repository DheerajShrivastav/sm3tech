import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  // '/home',
  '/api',
  '/site',
  '/api/uploadthing',
])
const isPublicApiRoute = createRouteMatcher(['/api/videos', '/api/uploadthing'])

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth()
    const currentUrl = new URL(req.url)
    const isFastRefresh = req.url.includes('_rsc')

    if (isFastRefresh) {
      // Handle Fast Refresh requests
      return NextResponse.next()
    }

    if (currentUrl.pathname.startsWith('/api')) {
      // Allow API requests to proceed
      return NextResponse.next()
    }

    if (
      currentUrl.pathname === '/agency/sign-in' ||
      currentUrl.pathname === '/agency/sign-up' ||
      currentUrl.pathname.startsWith('/agency/sign-in/') ||
      currentUrl.pathname.startsWith('/agency/sign-up/')
    ) {
      // Allow the user to access the sign-in/sign-up pages and their sub-routes (verification, etc.)
      return NextResponse.next()
    }

    // Don't redirect if user is in the middle of sign-up verification
    if (currentUrl.pathname.includes('sign-up') || currentUrl.pathname.includes('verify')) {
      return NextResponse.next()
    }

    if (userId && isPublicRoute(req) && currentUrl.pathname !== '/home') {
      // Redirect the user to the dashboard if they are logged in and accessing a public route
      // BUT NOT if they're in sign-up flow
      if (!currentUrl.pathname.includes('/agency/')) {
        return NextResponse.redirect(new URL('/home', req.url))
      }
    }

    if (!userId && !isPublicRoute(req) && !isPublicApiRoute(req)) {
      // Redirect the user to the sign-in page if they are not logged in and accessing a protected route
      return NextResponse.redirect(new URL('/agency/sign-in', req.url))
    }

    // Allow the request to proceed
    return NextResponse.next()
  } catch (error) {
    // console.error(error)
    // Handle errors and prevent the server from crashing
    return NextResponse.error()
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next|_rsc).*)', '/', '/(api|trpc)(.*)'],
}
