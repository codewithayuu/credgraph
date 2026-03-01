import { NextRequest, NextResponse } from "next/server";
import { generateCredentialId } from "@/lib/utils";
import { BATCH_CONFIG } from "@/lib/constants";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { issuerAddress, rows } = body;

        if (!issuerAddress || !rows || !Array.isArray(rows)) {
            return NextResponse.json(
                { success: false, error: "issuerAddress and rows array are required" },
                { status: 400 }
            );
        }

        if (rows.length > BATCH_CONFIG.maxTotalRows) {
            return NextResponse.json(
                {
                    success: false,
                    error: `Batch exceeds maximum of ${BATCH_CONFIG.maxTotalRows} rows`,
                },
                { status: 400 }
            );
        }

        // Process rows (mock)
        const results = rows.map((row: any, index: number) => {
            const success = Math.random() > 0.05; // 95% success rate mock
            if (success) {
                return {
                    index,
                    success: true,
                    credentialId: generateCredentialId(),
                    asaId: Math.floor(Math.random() * 900000) + 100000,
                    txId: `TXBATCH${Date.now().toString(36).toUpperCase()}${index}`,
                };
            } else {
                return {
                    index,
                    success: false,
                    error: "Simulated batch failure for testing",
                };
            }
        });

        const successCount = results.filter((r: any) => r.success).length;
        const failedCount = results.filter((r: any) => !r.success).length;

        return NextResponse.json({
            success: true,
            data: {
                totalRows: rows.length,
                successCount,
                failedCount,
                results,
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
