import { NextResponse, type NextRequest } from "next/server";
import { steamLoginUrl } from "@/lib/steam-openid";

// Redirects to Steam's "Sign in through Steam" page.
export function GET(request: NextRequest) {
  return NextResponse.redirect(steamLoginUrl(request.nextUrl.origin));
}
