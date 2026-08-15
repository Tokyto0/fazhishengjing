import { NextRequest, NextResponse } from "next/server";
import { searchKnowledge } from "@/lib/retrieval";

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const requestedLimit = Number(request.nextUrl.searchParams.get("limit") ?? 5);
  const limit = Number.isFinite(requestedLimit) ? requestedLimit : 5;
  if (query.length < 2) return NextResponse.json({ query, results: [] });
  return NextResponse.json({ query, results: searchKnowledge(query.slice(0, 200), limit) }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
}
