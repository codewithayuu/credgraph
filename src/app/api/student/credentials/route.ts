import { NextRequest, NextResponse } from "next/server";
import { MOCK_CREDENTIALS } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { success: false, error: "Address parameter is required" },
      { status: 400 }
    );
  }

  const credentials = MOCK_CREDENTIALS.filter(
    (c) => c.recipientAddress === address
  );

  return NextResponse.json({
    success: true,
    data: credentials,
  });
}
