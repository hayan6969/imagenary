import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { PathParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'

const protectedRoutes=createRouteMatcher([
    '/profile',
    '/',
    '/transformations(.*)',
    '/credits',
    '/transformations(.*)/update',
    '/transformations/add(.*)',
    
])

export default clerkMiddleware((auth,req)=>{
    if(protectedRoutes(req)){
        auth().protect()
    }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}