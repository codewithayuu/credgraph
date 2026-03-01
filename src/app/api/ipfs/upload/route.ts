import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const mockCid = `Qm${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

    return NextResponse.json({
      success: true,
      data: {
        cid: mockCid,
        url: `ipfs://${mockCid}`,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${mockCid}`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
