import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        return NextResponse.redirect(new URL(`/synchronizations`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|api|.*\\.).*)"
    ],
};