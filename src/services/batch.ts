import {
    BatchIssueJob,
    BatchIssueRow,
    CredentialType,
    Credential,
} from "@/lib/types";
import { BATCH_CONFIG } from "@/lib/constants";
import {
    generateBatchId,
    generateCredentialId,
    parseCSV,
    validateCSVHeaders,
    isValidAlgorandAddress,
    sleep,
} from "@/lib/utils";

/**
 * Batch issuance service handles CSV-based bulk credential minting.
 *
 * Flow:
 * 1. Issuer uploads CSV file
 * 2. System parses and validates rows
 * 3. Issuer reviews preview table
 * 4. System processes in batches of 16 (Algorand group transaction limit)
 * 5. Progress bar shows completion
 * 6. Summary report with success/failure per row
 *
 * Current: Mock layer that simulates batch processing with delays.
 * Production: Real ASA creation + group transactions via Pera Wallet.
 */

// ─── CSV Parsing & Validation ────────────────

export interface CSVParseResult {
    success: boolean;
    rows: BatchIssueRow[];
    errors: string[];
    totalRows: number;
}

export function parseAndValidateCSV(
    csvContent: string,
    availableTypes: CredentialType[],
    issuerAddress: string
): CSVParseResult {
    const errors: string[] = [];
    const { headers, rows: rawRows } = parseCSV(csvContent);

    // Validate headers
    const headerValidation = validateCSVHeaders(
        headers,
        BATCH_CONFIG.requiredColumns
    );
    if (!headerValidation.valid) {
        return {
            success: false,
            rows: [],
            errors: [`Missing required columns: ${headerValidation.missing.join(", ")}`],
            totalRows: 0,
        };
    }

    if (rawRows.length === 0) {
        return {
            success: false,
            rows: [],
            errors: ["CSV file contains no data rows"],
            totalRows: 0,
        };
    }

    if (rawRows.length > BATCH_CONFIG.maxTotalRows) {
        return {
            success: false,
            rows: [],
            errors: [`CSV exceeds maximum of ${BATCH_CONFIG.maxTotalRows} rows`],
            totalRows: rawRows.length,
        };
    }

    // Map header indices
    const walletIdx = headers.indexOf("wallet_address");
    const typeIdx = headers.indexOf("credential_type_id");
    const evidenceIdx = headers.indexOf("evidence_hash");

    const availableTypeIds = availableTypes
        .filter((t) => t.issuerAddress === issuerAddress && t.status === "active")
        .map((t) => t.id);

    const parsedRows: BatchIssueRow[] = rawRows.map((row, i) => {
        const walletAddress = row[walletIdx] || "";
        const credentialTypeId = row[typeIdx] || "";
        const evidenceHash = evidenceIdx >= 0 ? row[evidenceIdx] : undefined;

        // Validate wallet address
        if (!walletAddress) {
            errors.push(`Row ${i + 2}: Missing wallet address`);
            return {
                recipientAddress: walletAddress,
                credentialTypeId,
                evidenceHash,
                status: "skipped" as const,
                error: "Missing wallet address",
            };
        }

        if (!isValidAlgorandAddress(walletAddress)) {
            errors.push(`Row ${i + 2}: Invalid wallet address "${walletAddress}"`);
            return {
                recipientAddress: walletAddress,
                credentialTypeId,
                evidenceHash,
                status: "skipped" as const,
                error: "Invalid wallet address",
            };
        }

        // Validate credential type
        if (!credentialTypeId) {
            errors.push(`Row ${i + 2}: Missing credential type ID`);
            return {
                recipientAddress: walletAddress,
                credentialTypeId,
                evidenceHash,
                status: "skipped" as const,
                error: "Missing credential type ID",
            };
        }

        if (!availableTypeIds.includes(credentialTypeId)) {
            errors.push(
                `Row ${i + 2}: Unknown or unauthorized credential type "${credentialTypeId}"`
            );
            return {
                recipientAddress: walletAddress,
                credentialTypeId,
                evidenceHash,
                status: "skipped" as const,
                error: "Unknown or unauthorized credential type",
            };
        }

        return {
            recipientAddress: walletAddress,
            credentialTypeId,
            evidenceHash: evidenceHash || undefined,
            status: "pending" as const,
        };
    });

    return {
        success: errors.length === 0 || parsedRows.some((r) => r.status === "pending"),
        rows: parsedRows,
        errors,
        totalRows: rawRows.length,
    };
}

// ─── Create Batch Job ────────────────────────

export function createBatchJob(
    issuerAddress: string,
    rows: BatchIssueRow[]
): BatchIssueJob {
    return {
        id: generateBatchId(),
        issuerAddress,
        totalRows: rows.length,
        processedRows: 0,
        successCount: 0,
        failedCount: 0,
        status: "preparing",
        rows,
        startedAt: Math.floor(Date.now() / 1000),
    };
}

// ─── Process Batch Job ───────────────────────

export type BatchProgressCallback = (
    processedRows: number,
    successCount: number,
    failedCount: number,
    currentRow: BatchIssueRow
) => void;

export async function processBatchJob(
    job: BatchIssueJob,
    credentialTypes: CredentialType[],
    issuerName: string,
    onProgress: BatchProgressCallback,
    onRowComplete: (rowIndex: number, row: BatchIssueRow, credential?: Credential) => void
): Promise<BatchIssueJob> {
    const updatedJob = { ...job, status: "processing" as const };
    let processedRows = 0;
    let successCount = 0;
    let failedCount = 0;

    const pendingRows = job.rows
        .map((row, index) => ({ row, index }))
        .filter(({ row }) => row.status === "pending");

    // Process in batches of BATCH_CONFIG.maxRowsPerBatch
    for (let batchStart = 0; batchStart < pendingRows.length; batchStart += BATCH_CONFIG.maxRowsPerBatch) {
        const batch = pendingRows.slice(
            batchStart,
            batchStart + BATCH_CONFIG.maxRowsPerBatch
        );

        // Process each row in the batch
        for (const { row, index } of batch) {
            try {
                // Simulate processing delay
                await sleep(300 + Math.random() * 400);

                const credType = credentialTypes.find(
                    (t) => t.id === row.credentialTypeId
                );
                if (!credType) {
                    throw new Error("Credential type not found");
                }

                // Mock: Generate credential
                const credentialId = generateCredentialId();
                const asaId = Math.floor(Math.random() * 900000) + 100000;
                const txId = `TXBATCH${Date.now().toString(36).toUpperCase()}${index}`;

                const credential: Credential = {
                    id: credentialId,
                    asaId,
                    credentialTypeId: row.credentialTypeId,
                    credentialTypeName: credType.name,
                    category: credType.category,
                    tier: credType.tier,
                    issuerAddress: job.issuerAddress,
                    issuerName,
                    recipientAddress: row.recipientAddress,
                    evidenceHash: row.evidenceHash,
                    issuedAt: Math.floor(Date.now() / 1000),
                    status: "pending",
                    txId,
                    claimStatus: "claimable",
                    privacyLevel: "public",
                    expiresAt: credType.expiryDuration
                        ? Math.floor(Date.now() / 1000) + credType.expiryDuration
                        : undefined,
                };

                const updatedRow: BatchIssueRow = {
                    ...row,
                    status: "success",
                    credentialId,
                    asaId,
                    txId,
                };

                successCount++;
                processedRows++;

                onRowComplete(index, updatedRow, credential);
                onProgress(processedRows, successCount, failedCount, updatedRow);
            } catch (err: any) {
                const updatedRow: BatchIssueRow = {
                    ...row,
                    status: "failed",
                    error: err?.message || "Unknown error",
                };

                failedCount++;
                processedRows++;

                onRowComplete(index, updatedRow);
                onProgress(processedRows, successCount, failedCount, updatedRow);
            }
        }

        // Small delay between batches (simulates group tx submission)
        if (batchStart + BATCH_CONFIG.maxRowsPerBatch < pendingRows.length) {
            await sleep(500);
        }
    }

    return {
        ...updatedJob,
        processedRows,
        successCount,
        failedCount,
        status: "completed",
        completedAt: Math.floor(Date.now() / 1000),
    };
}

// ─── Generate Sample CSV ─────────────────────

export function generateSampleCSV(credentialTypes: CredentialType[]): string {
    const headers = "wallet_address,credential_type_id,evidence_hash";
    const sampleRows = credentialTypes
        .filter((t) => t.status === "active")
        .slice(0, 3)
        .map(
            (t, i) =>
                `STUDENT${i + 1}SAMPLEADDRESSXYZABCDEFGHIJKLMNOPQRST,${t.id},sha256:sample${i + 1}hash`
        );

    return [headers, ...sampleRows].join("\n");
}
