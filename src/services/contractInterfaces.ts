import algosdk from "algosdk";
import { getAlgodClient, getSuggestedParams } from "./algorand";
import { CONTRACT_IDS } from "@/lib/constants";

export interface IssuerRegistryMethods {
  registerIssuer: (address: string, name: string, type: string, metadataUri: string) => Promise<algosdk.Transaction>;
  suspendIssuer: (address: string, reason: string) => Promise<algosdk.Transaction>;
  revokeIssuer: (address: string, reason: string) => Promise<algosdk.Transaction>;
  isAuthorized: (address: string) => Promise<boolean>;
  getIssuer: (address: string) => Promise<any>;
}

export interface CredentialRegistryMethods {
  registerCredential: (asaId: number, typeId: string, recipient: string, evidenceHash: string) => Promise<algosdk.Transaction>;
  revokeCredential: (credentialId: string, reason: string) => Promise<algosdk.Transaction>;
  getCredential: (credentialId: string) => Promise<any>;
  isActive: (credentialId: string) => Promise<boolean>;
}

export interface CompositionRegistryMethods {
  createRule: (name: string, description: string, requiredTypes: string[], compositeTypeId: string) => Promise<algosdk.Transaction>;
  checkEligibility: (studentAddress: string, ruleId: string) => Promise<boolean>;
  getRule: (ruleId: string) => Promise<any>;
}

export async function buildIssuerRegistryCall(
  sender: string,
  method: string,
  args: any[]
): Promise<algosdk.Transaction> {
  const client = getAlgodClient();
  const params = await getSuggestedParams();

  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    sender: sender,
    appIndex: CONTRACT_IDS.issuerRegistry,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from(method)),
      ...args.map((arg) => new Uint8Array(Buffer.from(String(arg)))),
    ],
    suggestedParams: params,
  });

  return appCallTxn;
}

export async function buildCredentialRegistryCall(
  sender: string,
  method: string,
  args: any[]
): Promise<algosdk.Transaction> {
  const client = getAlgodClient();
  const params = await getSuggestedParams();

  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    sender: sender,
    appIndex: CONTRACT_IDS.credentialRegistry,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from(method)),
      ...args.map((arg) => new Uint8Array(Buffer.from(String(arg)))),
    ],
    suggestedParams: params,
  });

  return appCallTxn;
}

export async function buildCompositionRegistryCall(
  sender: string,
  method: string,
  args: any[]
): Promise<algosdk.Transaction> {
  const client = getAlgodClient();
  const params = await getSuggestedParams();

  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    sender: sender,
    appIndex: CONTRACT_IDS.compositionRules,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from(method)),
      ...args.map((arg) => new Uint8Array(Buffer.from(String(arg)))),
    ],
    suggestedParams: params,
  });

  return appCallTxn;
}

export async function readGlobalState(appId: number): Promise<Record<string, any>> {
  if (appId === 0) return {};

  try {
    const client = getAlgodClient();
    const appInfo = await client.getApplicationByID(appId).do();
    const globalState = appInfo.params.globalState || [];

    const decoded: Record<string, any> = {};
    globalState.forEach((item: any) => {
      const key = Buffer.from(item.key, "base64").toString();
      if (item.value.type === 1) {
        decoded[key] = Buffer.from(item.value.bytes, "base64").toString();
      } else {
        decoded[key] = item.value.uint;
      }
    });

    return decoded;
  } catch (err) {
    return {};
  }
}

export async function readBoxStorage(appId: number, boxName: string): Promise<any> {
  if (appId === 0) return null;

  try {
    const client = getAlgodClient();
    const boxValue = await client.getApplicationBoxByName(appId, new Uint8Array(Buffer.from(boxName))).do();
    return JSON.parse(Buffer.from(boxValue.value).toString());
  } catch (err) {
    return null;
  }
}
