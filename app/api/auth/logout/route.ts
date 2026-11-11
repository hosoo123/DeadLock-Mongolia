import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

export function POST(request: NextRequest) {
  const response = NextResponse.redirect(`${request.nextUrl.origin}/`, { status: 303 });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
