import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_ROUTE, public_routes } from "./routes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  // If no token and not a public route, redirect to sign-in
  if (!token && !public_routes.includes(pathname)) {
    const redirectUrl = pathname;
    return NextResponse.redirect(
      new URL(
        `/sign-in?redirectUrl=${encodeURIComponent(redirectUrl)}`,
        request.nextUrl.origin
      )
    );
  }

  // Handle post-authentication redirect
  if (token) {
    const redirectUrl = request.nextUrl.searchParams.get("redirectUrl");

    if (redirectUrl) {
      return NextResponse.redirect(
        new URL(decodeURIComponent(redirectUrl), request.nextUrl.origin)
      );
    }
    
    // Prevent redirect loop if already on sign-in page
    if (pathname === "/sign-in") {
      return NextResponse.redirect(
        new URL(DEFAULT_ROUTE, request.nextUrl.origin)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
