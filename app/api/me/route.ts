import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, getSession } from "@/lib/session";
import { deleteProfile, getProfile, saveProfile, validateProfileInput } from "@/lib/profiles";

export const dynamic = "force-dynamic";

// Writes must come from our own pages (basic CSRF guard on top of SameSite=Lax).
function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

// Pages that list public profiles are ISR-cached; refresh them right away.
function refreshPublicPages(accountId: number) {
  revalidatePath("/pro");
  revalidatePath("/crosshair");
  revalidatePath(`/players/${accountId}`);
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const profile = await getProfile(session.accountId);
  return NextResponse.json({ profile });
}

export async function PUT(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  const result = validateProfileInput(body);
  if ("errors" in result) return NextResponse.json({ error: "invalid", fields: result.errors }, { status: 422 });

  const profile = await saveProfile(session.accountId, result.input);
  if (!profile) return NextResponse.json({ error: "not_found" }, { status: 404 });
  refreshPublicPages(session.accountId);
  return NextResponse.json({ profile });
}

// "Delete my data": removes the row and logs out.
export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await deleteProfile(session.accountId);
  refreshPublicPages(session.accountId);
  const response = NextResponse.json({ deleted: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
