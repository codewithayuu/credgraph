import { NextRequest, NextResponse } from "next/server";
import { generateCredentialId } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { typeId, recipientAddress, evidenceHash, evidenceUri } = body;

    if (!typeId || !recipientAddress) {
      return NextResponse.json(
        { success: false, error: "typeId and recipientAddress are required" },
        { status: 400 }
      );
    }

    const credentialId = generateCredentialId();
    const asaId = Math.floor(Math.random() * 900000) + 100000;
    const txId = `TX${Date.now().toString(36).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      data: {
        credentialId,
        asaId,
        txId,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
