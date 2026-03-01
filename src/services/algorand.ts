import algosdk from "algosdk";
import { NETWORK_CONFIG, ASA_CONFIG } from "@/lib/constants";

let algodClient: algosdk.Algodv2 | null = null;
let indexerClient: algosdk.Indexer | null = null;

export function getAlgodClient(): algosdk.Algodv2 {
  if (!algodClient) {
    algodClient = new algosdk.Algodv2(
      NETWORK_CONFIG.algodToken,
      NETWORK_CONFIG.algodServer,
      NETWORK_CONFIG.algodPort
    );
  }
  return algodClient;
}

export function getIndexerClient(): algosdk.Indexer {
  if (!indexerClient) {
    indexerClient = new algosdk.Indexer(
      NETWORK_CONFIG.indexerToken,
      NETWORK_CONFIG.indexerServer,
      NETWORK_CONFIG.indexerPort
    );
  }
  return indexerClient;
}

export async function getAccountInfo(address: string) {
  const client = getAlgodClient();
  try {
    const info = await client.accountInformation(address).do();
    return info;
  } catch (err) {
    return null;
  }
}

export async function getAccountAssets(address: string) {
  const indexer = getIndexerClient();
  try {
    const result = await indexer
      .lookupAccountAssets(address)
      .do();
    return result.assets || [];
  } catch (err) {
    return [];
  }
}

export async function getAssetInfo(assetId: number) {
  const indexer = getIndexerClient();
  try {
    const result = await indexer.lookupAssetByID(assetId).do();
    return result.asset;
  } catch (err) {
    return null;
  }
}

export async function getSuggestedParams() {
  const client = getAlgodClient();
  return await client.getTransactionParams().do();
}

export function buildCreateAsaTxn(
  sender: string,
  params: algosdk.SuggestedParams,
  name: string,
  metadataUrl: string,
  note?: Uint8Array
): algosdk.Transaction {
  return algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    sender: sender,
    total: ASA_CONFIG.totalSupply,
    decimals: ASA_CONFIG.decimals,
    defaultFrozen: false,
    unitName: ASA_CONFIG.unitName,
    assetName: `${ASA_CONFIG.namePrefix} ${name}`.slice(0, 32),
    assetURL: metadataUrl,
    manager: sender,
    reserve: undefined,
    freeze: undefined,
    clawback: undefined,
    suggestedParams: params,
    note: note,
  });
}

export function buildAssetTransferTxn(
  sender: string,
  receiver: string,
  assetId: number,
  amount: number,
  params: algosdk.SuggestedParams
): algosdk.Transaction {
  return algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    sender: sender,
    receiver: receiver,
    assetIndex: assetId,
    amount: amount,
    suggestedParams: params,
  });
}

export function buildOptInTxn(
  sender: string,
  assetId: number,
  params: algosdk.SuggestedParams
): algosdk.Transaction {
  return algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
    sender: sender,
    receiver: sender,
    assetIndex: assetId,
    amount: 0,
    suggestedParams: params,
  });
}

export function groupTransactions(txns: algosdk.Transaction[]): algosdk.Transaction[] {
  algosdk.assignGroupID(txns);
  return txns;
}

export async function submitSignedTransactions(signedTxns: Uint8Array[]) {
  const client = getAlgodClient();
  const response = await client.sendRawTransaction(signedTxns).do();
  const txId = response.txId;
  const result = await algosdk.waitForConfirmation(client, txId, 4);
  return { txId, ...result };
}

export function encodeNote(data: object): Uint8Array {
  return new Uint8Array(Buffer.from(JSON.stringify(data)));
}
