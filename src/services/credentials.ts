import {
  getAlgodClient,
  getSuggestedParams,
  buildCreateAsaTxn,
  buildAssetTransferTxn,
  encodeNote,
} from "./algorand";
import { uploadJsonToIPFS, buildARC3Metadata } from "./ipfs";
import { CredentialType, Credential } from "@/lib/types";
import { generateCredentialId } from "@/lib/utils";
import { ASA_CONFIG } from "@/lib/constants";

export interface IssueCredentialParams {
  issuerAddress: string;
  recipientAddress: string;
  credentialType: CredentialType;
  evidenceHash?: string;
  evidenceUri?: string;
  peraWallet: any;
}

export interface IssueCredentialResult {
  success: boolean;
  credentialId?: string;
  asaId?: number;
  txId?: string;
  metadataCid?: string;
  error?: string;
}

export async function issueCredentialOnChain(
  params: IssueCredentialParams
): Promise<IssueCredentialResult> {
  try {
    const { issuerAddress, recipientAddress, credentialType, evidenceHash, evidenceUri, peraWallet } = params;

    const credentialId = generateCredentialId();

    const metadata = buildARC3Metadata({
      name: credentialType.name,
      description: credentialType.description,
      properties: {
        credential_id: credentialId,
        credential_type_id: credentialType.id,
        issuer_address: issuerAddress,
        issuer_name: credentialType.issuerName,
        recipient_address: recipientAddress,
        category: credentialType.category,
        tier: credentialType.tier,
        evidence_hash: evidenceHash || "",
        evidence_uri: evidenceUri || "",
        issued_at: new Date().toISOString(),
      },
    });

    const { cid, url: metadataUrl } = await uploadJsonToIPFS(metadata);

    const suggestedParams = await getSuggestedParams();

    const noteData = {
      credgraph: true,
      credential_id: credentialId,
      type_id: credentialType.id,
      recipient: recipientAddress,
    };
    const note = encodeNote(noteData);

    const createAsaTxn = buildCreateAsaTxn(
      issuerAddress,
      suggestedParams,
      credentialType.name,
      metadataUrl,
      note
    );

    const signedTxns = await peraWallet.signTransaction([[{ txn: createAsaTxn }]]);

    const client = getAlgodClient();
    const response = await client.sendRawTransaction(signedTxns[0]).do();
    const txId = response.txid;

    const confirmedTxn = await import("algosdk").then((sdk) =>
      sdk.default.waitForConfirmation(client, txId, 4)
    );

    const asaId = Number(confirmedTxn.assetIndex);

    return {
      success: true,
      credentialId,
      asaId,
      txId,
      metadataCid: cid,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to issue credential on-chain",
    };
  }
}

export function buildCredentialRecord(
  result: IssueCredentialResult,
  params: IssueCredentialParams
): Credential | null {
  if (!result.success || !result.credentialId || !result.asaId) return null;

  return {
    id: result.credentialId,
    asaId: result.asaId,
    credentialTypeId: params.credentialType.id,
    credentialTypeName: params.credentialType.name,
    category: params.credentialType.category,
    tier: params.credentialType.tier,
    issuerAddress: params.issuerAddress,
    issuerName: params.credentialType.issuerName,
    recipientAddress: params.recipientAddress,
    evidenceHash: params.evidenceHash,
    evidenceUri: params.evidenceUri,
    issuedAt: Math.floor(Date.now() / 1000),
    status: "active",
    txId: result.txId,
    metadataUri: result.metadataCid ? `ipfs://${result.metadataCid}` : undefined,
  };
}
