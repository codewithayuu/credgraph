import { NextRequest, NextResponse } from "next/server";
import { MOCK_CREDENTIALS, MOCK_ISSUERS, MOCK_COMPOSITION_RULES } from "@/lib/mockData";
import { verifyWalletCredentials } from "@/services/verification";

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  if (!address) {
    return NextResponse.json(
      { success: false, error: "Address parameter is required" },
      { status: 400 }
    );
  }

  const result = await verifyWalletCredentials(
    address,
    MOCK_CREDENTIALS,
    MOCK_ISSUERS,
    MOCK_COMPOSITION_RULES
  );

  return NextResponse.json({
    success: true,
    data: result,
  });
}
