import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credentialId, reason } = body;

    if (!credentialId || !reason) {
      return NextResponse.json(
        { success: false, error: "credentialId and reason are required" },
        { status: 400 }
      );
    }

    const txId = `TXREV${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      data: {
        txId,
        revokedAt: Math.floor(Date.now() / 1000),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
