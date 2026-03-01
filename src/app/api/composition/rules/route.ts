import { NextRequest, NextResponse } from "next/server";
import { MOCK_COMPOSITION_RULES } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const issuer = searchParams.get("issuer");

  let rules = MOCK_COMPOSITION_RULES;

  if (issuer) {
    rules = rules.filter((r) => r.definedBy === issuer);
  }

  return NextResponse.json({
    success: true,
    data: rules,
  });
}
