import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
// TODO: add auth redirection here
// TODO: add  role based permition here

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/faq',
}