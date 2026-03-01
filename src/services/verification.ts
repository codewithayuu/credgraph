import { getAccountAssets, getAssetInfo } from "./algorand";
import {
  Credential,
  VerificationResult,
  VerifiedCredential,
  VerifiedComposite,
  VerificationSummary,
  Issuer,
  CompositionRule,
} from "@/lib/types";

export async function verifyWalletCredentials(
  walletAddress: string,
  knownCredentials: Credential[],
  knownIssuers: Issuer[],
  compositionRules: CompositionRule[]
): Promise<VerificationResult> {
  const credentials = knownCredentials.filter(
    (c) => c.recipientAddress === walletAddress
  );

  const verifiedCredentials: VerifiedCredential[] = credentials.map((cred) => {
    const issuer = knownIssuers.find((i) => i.address === cred.issuerAddress);
    const issuerVerified = issuer?.status === "active";

    return {
      ...cred,
      issuerVerified,
      issuerInfo: issuer,
      isOriginalRecipient: cred.recipientAddress === walletAddress,
    };
  });

  const composites: VerifiedComposite[] = [];
  const compositeCredentials = verifiedCredentials.filter(
    (c) => c.category === "certification" && c.tier === "expert"
  );

  compositeCredentials.forEach((compCred) => {
    const rule = compositionRules.find(
      (r) => r.compositeCredentialTypeId === compCred.credentialTypeId
    );
    if (!rule) return;

    const components = rule.requiredCredentialTypeIds
      .map((typeId) =>
        verifiedCredentials.find((vc) => vc.credentialTypeId === typeId)
      )
      .filter(Boolean) as VerifiedCredential[];

    const allComponentsValid = components.every(
      (c) => c.status === "active" && c.issuerVerified
    );

    composites.push({
      compositeCredential: compCred,
      components,
      allComponentsValid,
      rule,
    });
  });

  const activeCredentials = verifiedCredentials.filter((c) => c.status === "active");
  const revokedCredentials = verifiedCredentials.filter((c) => c.status === "revoked");
  const expiredCredentials = verifiedCredentials.filter((c) => typeof c.status === 'string' && c.status === "expired");
  const allIssuersVerified = verifiedCredentials.every((c) => c.issuerVerified);

  const summary: VerificationSummary = {
    totalCredentials: verifiedCredentials.length,
    activeCredentials: activeCredentials.length,
    revokedCredentials: revokedCredentials.length,
    expiredCredentials: expiredCredentials.length,
    compositeCredentials: composites.length,
    allIssuersVerified,
  };

  return {
    walletAddress,
    credentials: verifiedCredentials,
    composites,
    summary,
  };
}

export async function verifyOnChain(walletAddress: string) {
  try {
    const assets = await getAccountAssets(walletAddress);

    const credentialAssets = assets.filter((asset: any) => {
      return asset.amount > 0;
    });

    const detailedAssets = await Promise.all(
      credentialAssets.slice(0, 20).map(async (asset: any) => {
        const info = await getAssetInfo(asset["asset-id"]);
        return {
          assetId: asset["asset-id"],
          amount: asset.amount,
          info,
        };
      })
    );

    return detailedAssets.filter((a) => {
      if (!a.info) return false;
      const params = a.info.params;
      return (
        params.unitName === "CRED" ||
        (params.name && params.name.startsWith("CG:"))
      );
    });
  } catch (err) {
    return [];
  }
}
