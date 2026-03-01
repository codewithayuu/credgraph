import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { computedHash, storedHash } = body;

        if (!computedHash || !storedHash) {
            return NextResponse.json(
                { success: false, error: "Both computedHash and storedHash are required" },
                { status: 400 }
            );
        }

        // Normalize hashes
        const normalizedComputed = computedHash.startsWith("sha256:")
            ? computedHash
            : `sha256:${computedHash}`;
        const normalizedStored = storedHash.startsWith("sha256:")
            ? storedHash
            : `sha256:${storedHash}`;

        const match = normalizedComputed === normalizedStored;

        return NextResponse.json({
            success: true,
            data: {
                match,
                computedHash: normalizedComputed,
                storedHash: normalizedStored,
                verifiedAt: Math.floor(Date.now() / 1000),
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
