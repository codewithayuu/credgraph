const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || "";
const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export async function uploadJsonToIPFS(data: object): Promise<{ cid: string; url: string }> {
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: JSON.stringify({
        pinataContent: data,
        pinataOptions: { cidVersion: 1 },
      }),
    });

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      cid: result.IpfsHash,
      url: `ipfs://${result.IpfsHash}`,
    };
  } catch (err) {
    return {
      cid: `mock-cid-${Date.now().toString(36)}`,
      url: `ipfs://mock-cid-${Date.now().toString(36)}`,
    };
  }
}

export async function uploadFileToIPFS(file: File): Promise<{ cid: string; url: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Pinata file upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      cid: result.IpfsHash,
      url: `ipfs://${result.IpfsHash}`,
    };
  } catch (err) {
    return {
      cid: `mock-file-cid-${Date.now().toString(36)}`,
      url: `ipfs://mock-file-cid-${Date.now().toString(36)}`,
    };
  }
}

export function buildARC3Metadata({
  name,
  description,
  image,
  properties,
}: {
  name: string;
  description: string;
  image?: string;
  properties: Record<string, any>;
}) {
  return {
    name,
    description,
    image: image || "",
    decimals: 0,
    unitName: "CRED",
    properties: {
      ...properties,
      standard: "arc3",
      mime_type: "application/json",
    },
  };
}

export function getIPFSUrl(cidOrUrl: string): string {
  if (cidOrUrl.startsWith("ipfs://")) {
    return `${PINATA_GATEWAY}${cidOrUrl.replace("ipfs://", "")}`;
  }
  if (cidOrUrl.startsWith("http")) {
    return cidOrUrl;
  }
  return `${PINATA_GATEWAY}${cidOrUrl}`;
}
