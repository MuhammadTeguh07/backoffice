import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;

    // Cookie values
    const token = request.cookies.get('authToken')?.value;

    if (!token && pathname !== '/') {
        return NextResponse.redirect(new URL('/', origin));
    }

    if (token && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/category/:path*',
        '/product/:path*',
    ],
};