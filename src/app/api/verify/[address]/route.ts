import { NextRequest, NextResponse } from "next/server";
import { MOCK_CREDENTIALS, MOCK_ISSUERS, MOCK_COMPOSITION_RULES } from "@/lib/mockData";

export async function GET(
    request: NextRequest,
    { params }: { params: { address: string } }
) {
    const walletAddress = params.address;

    if (!walletAddress) {
        return NextResponse.json(
            { success: false, error: "Wallet address is required" },
            { status: 400 }
        );
    }

    // Get credentials for this wallet
    const credentials = MOCK_CREDENTIALS.filter(
        (c) => c.recipientAddress === walletAddress
    );

    // Verify each credential's issuer
    const verifiedCredentials = credentials.map((cred) => {
        const issuer = MOCK_ISSUERS.find((i) => i.address === cred.issuerAddress);
        return {
            ...cred,
            issuerVerified: issuer?.status === "active",
            issuerInfo: issuer || null,
            isOriginalRecipient: true,
        };
    });

    // Find composite credentials and their components
    const composites = verifiedCredentials
        .filter((c) => c.category === "certification" && c.tier === "expert")
        .map((comp) => {
            const rule = MOCK_COMPOSITION_RULES.find(
                (r) => r.compositeCredentialTypeId === comp.credentialTypeId
            );
            if (!rule) return null;

            const components = rule.requiredCredentialTypeIds
                .map((typeId) =>
                    verifiedCredentials.find((vc) => vc.credentialTypeId === typeId)
                )
                .filter(Boolean);

            return {
                compositeCredential: comp,
                components,
                allComponentsValid: components.every(
                    (c: any) => c.status === "active" && c.issuerVerified
                ),
                rule,
            };
        })
        .filter(Boolean);

    // Build summary
    const now = Math.floor(Date.now() / 1000);
    const activeCredentials = verifiedCredentials.filter(
        (c) => c.status === "active" && (!c.expiresAt || c.expiresAt > now)
    );
    const revokedCredentials = verifiedCredentials.filter(
        (c) => c.status === "revoked"
    );
    const expiredCredentials = verifiedCredentials.filter(
        (c) => c.status === "active" && c.expiresAt && c.expiresAt <= now
    );

    const summary = {
        totalCredentials: verifiedCredentials.length,
        activeCredentials: activeCredentials.length,
        revokedCredentials: revokedCredentials.length,
        expiredCredentials: expiredCredentials.length,
        compositeCredentials: composites.length,
        allIssuersVerified: verifiedCredentials.every((c) => c.issuerVerified),
    };

    return NextResponse.json({
        success: true,
        data: {
            walletAddress,
            credentials: verifiedCredentials,
            composites,
            summary,
        },
    });
}
