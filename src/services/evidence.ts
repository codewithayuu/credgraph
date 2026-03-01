import { EvidenceRecord } from "@/lib/types";
import { hashFile, hashString, sleep } from "@/lib/utils";
import { uploadFileToIPFS, getIPFSUrl } from "./ipfs";

/**
 * Evidence service handles evidence file anchoring, integrity verification,
 * and IPFS storage.
 *
 * Evidence flow:
 * 1. Issuer or student uploads evidence file
 * 2. File is hashed (SHA-256)
 * 3. File is uploaded to IPFS (via Pinata, with mock fallback)
 * 4. Hash + CID stored on credential metadata
 * 5. Anyone can verify: re-hash the file and compare with stored hash
 */

// ─── Upload Evidence ─────────────────────────

export async function uploadEvidence(
    file: File
): Promise<{ success: boolean; record?: EvidenceRecord; error?: string }> {
    try {
        // Step 1: Hash the file
        const hash = await hashFile(file);

        // Step 2: Upload to IPFS
        const { cid, url } = await uploadFileToIPFS(file);

        const record: EvidenceRecord = {
            hash,
            uri: url,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            uploadedAt: Math.floor(Date.now() / 1000),
            ipfsCid: cid,
            verified: true,
            verifiedAt: Math.floor(Date.now() / 1000),
        };

        return { success: true, record };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Failed to upload evidence",
        };
    }
}

// ─── Verify Evidence Integrity ───────────────

export async function verifyEvidenceIntegrity(
    file: File,
    expectedHash: string
): Promise<{
    valid: boolean;
    computedHash: string;
    expectedHash: string;
    match: boolean;
}> {
    const computedHash = await hashFile(file);
    const match = computedHash === expectedHash;

    return {
        valid: match,
        computedHash,
        expectedHash,
        match,
    };
}

// ─── Verify Evidence Hash Against String ─────

export async function verifyEvidenceHashString(
    inputHash: string,
    storedHash: string
): Promise<{ match: boolean }> {
    // Direct comparison — both should be in format "sha256:..."
    const normalizedInput = inputHash.startsWith("sha256:")
        ? inputHash
        : `sha256:${inputHash}`;
    const normalizedStored = storedHash.startsWith("sha256:")
        ? storedHash
        : `sha256:${storedHash}`;

    return { match: normalizedInput === normalizedStored };
}

// ─── Fetch Evidence from IPFS ────────────────

export async function fetchEvidenceFromIPFS(
    cidOrUri: string
): Promise<{ success: boolean; url: string; error?: string }> {
    try {
        const url = getIPFSUrl(cidOrUri);

        // Simulate checking if the file is accessible
        await sleep(500);

        return { success: true, url };
    } catch (err: any) {
        return {
            success: false,
            url: "",
            error: err?.message || "Failed to fetch evidence from IPFS",
        };
    }
}

// ─── Format File Size ────────────────────────

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
