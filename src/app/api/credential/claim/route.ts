import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { credentialId, walletAddress } = body;

        if (!credentialId || !walletAddress) {
            return NextResponse.json(
                { success: false, error: "credentialId and walletAddress are required" },
                { status: 400 }
            );
        }

        // Mock: simulate opt-in check and claim
        const txId = `TXCLAIM${Date.now().toString(36).toUpperCase()}`;

        return NextResponse.json({
            success: true,
            data: {
                credentialId,
                txId,
                claimedAt: Math.floor(Date.now() / 1000),
                status: "claimed",
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
