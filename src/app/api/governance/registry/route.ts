import { NextRequest, NextResponse } from "next/server";
import { MOCK_ISSUERS } from "@/lib/mockData";
import { MOCK_GOVERNANCE_APPLICATIONS, MOCK_GOVERNANCE_ACTIONS } from "@/lib/mockData";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const view = searchParams.get("view") || "issuers"; // issuers | applications | actions

    switch (view) {
        case "issuers":
            return NextResponse.json({
                success: true,
                data: MOCK_ISSUERS,
            });

        case "applications": {
            const status = searchParams.get("status");
            let apps = MOCK_GOVERNANCE_APPLICATIONS;
            if (status) {
                apps = apps.filter((a) => a.status === status);
            }
            return NextResponse.json({
                success: true,
                data: apps,
            });
        }

        case "actions": {
            const target = searchParams.get("target");
            const limit = parseInt(searchParams.get("limit") || "20");
            let actions = MOCK_GOVERNANCE_ACTIONS;
            if (target) {
                actions = actions.filter((a) => a.targetAddress === target);
            }
            actions = actions
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, limit);
            return NextResponse.json({
                success: true,
                data: actions,
            });
        }

        default:
            return NextResponse.json(
                { success: false, error: "Invalid view parameter" },
                { status: 400 }
            );
    }
}
