import { NextRequest, NextResponse } from "next/server";
import { GOVERNANCE_CONFIG } from "@/lib/constants";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { applicationId, reviewerAddress, decision, reviewNote } = body;

        // Validation
        if (!applicationId || !reviewerAddress || !decision || !reviewNote) {
            return NextResponse.json(
                {
                    success: false,
                    error: "All fields required: applicationId, reviewerAddress, decision, reviewNote",
                },
                { status: 400 }
            );
        }

        // Check admin authorization
        if (!GOVERNANCE_CONFIG.adminWallets.includes(reviewerAddress)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized: Not a governance admin" },
                { status: 403 }
            );
        }

        // Validate decision
        if (!["approved", "rejected", "under_review"].includes(decision)) {
            return NextResponse.json(
                { success: false, error: "Invalid decision. Must be: approved, rejected, or under_review" },
                { status: 400 }
            );
        }

        const txId = `TXGOV${Date.now().toString(36).toUpperCase()}`;

        return NextResponse.json({
            success: true,
            data: {
                applicationId,
                decision,
                txId,
                reviewedAt: Math.floor(Date.now() / 1000),
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
