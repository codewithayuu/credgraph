import { NextRequest, NextResponse } from "next/server";
import { generateApplicationId } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            applicantAddress,
            institutionName,
            institutionType,
            email,
            website,
            description,
            documentUri,
            documentHash,
        } = body;

        // Validation
        if (!applicantAddress || !institutionName || !institutionType || !email || !website || !description) {
            return NextResponse.json(
                {
                    success: false,
                    error: "All required fields must be provided: applicantAddress, institutionName, institutionType, email, website, description",
                },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Invalid email address" },
                { status: 400 }
            );
        }

        const applicationId = generateApplicationId();
        const txId = `TXGOV${Date.now().toString(36).toUpperCase()}`;

        return NextResponse.json({
            success: true,
            data: {
                applicationId,
                txId,
                status: "pending",
                submittedAt: Math.floor(Date.now() / 1000),
            },
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
