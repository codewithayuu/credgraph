import { NextRequest, NextResponse } from "next/server";
import { MOCK_CREDENTIAL_TYPES } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const issuer = searchParams.get("issuer");

  if (!issuer) {
    return NextResponse.json(
      { success: false, error: "Issuer address is required" },
      { status: 400 }
    );
  }

  const types = MOCK_CREDENTIAL_TYPES.filter(
    (t) => t.issuerAddress === issuer
  );

  return NextResponse.json({
    success: true,
    data: types,
  });
}
