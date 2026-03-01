import { NextRequest, NextResponse } from "next/server";
import { MOCK_ISSUERS } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { success: false, error: "Address parameter is required" },
      { status: 400 }
    );
  }

  const issuer = MOCK_ISSUERS.find(
    (i) => i.address === address && i.status === "active"
  );

  return NextResponse.json({
    success: true,
    data: {
      authorized: !!issuer,
      issuerInfo: issuer || null,
    },
  });
}
