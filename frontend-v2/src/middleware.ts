import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = new Set<string>(['/login', '/signup', '/forgot-password'])

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/_next') || pathname.startsWith('/assets')) {
		return NextResponse.next()
	}

	if (PUBLIC_PATHS.has(pathname)) {
		return NextResponse.next()
	}

	const hasSession = request.cookies.has('session')
	if (!hasSession) {
		const url = request.nextUrl.clone()
		url.pathname = '/login'
		url.searchParams.set('redirect', pathname)
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
