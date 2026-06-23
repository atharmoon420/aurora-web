import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Gate every /admin route behind a session cookie. Unauthenticated requests are
 * redirected to /admin/login. This is a minimal, real gate suitable for an
 * internal tool; for production, swap the cookie check for Auth.js or Clerk with
 * proper sessions and role-based access (the seam is just this file + the API routes).
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const session = req.cookies.get("aurora_session")?.value;
  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
