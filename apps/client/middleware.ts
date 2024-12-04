import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_ROUTE, public_routes } from "./routes";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  // If no token and not a public route, redirect to sign-in
  if (!token && !public_routes.includes(request.nextUrl.pathname)) {
    const redirectUrl = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(
        `/sign-in?redirectUrl=${encodeURIComponent(redirectUrl)}`,
        request.nextUrl.origin
      )
    );
  }

  // Automatic handling of post-authentication redirect
  if (token) {
    const redirectUrl = request.nextUrl.searchParams.get("redirectUrl");

    // If there's a stored redirect URL, use it automatically
    if (redirectUrl) {
      return NextResponse.redirect(
        new URL(decodeURIComponent(redirectUrl), request.nextUrl.origin)
      );
    }

    // If currently on sign-in page with a token, redirect to default route
    if (request.nextUrl.pathname === "/sign-in") {
      return NextResponse.redirect(
        new URL(DEFAULT_ROUTE, request.nextUrl.origin)
      );
    }
  }

  // Redirect root to default route
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL(DEFAULT_ROUTE, request.nextUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
