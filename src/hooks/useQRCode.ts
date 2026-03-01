"use client";

import { useState, useEffect } from "react";

interface QRCodeOptions {
  width?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

export function useQRCode(text: string, options: QRCodeOptions = {}) {
  const {
    width = 400,
    margin = 2,
    darkColor = "#e2e8f0",
    lightColor = "#0f172a",
  } = options;

  const [dataUrl, setDataUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!text) {
      setLoading(false);
      return;
    }

    const generate = async () => {
      try {
        setLoading(true);
        const QRCode = (await import("qrcode")).default;
        const url = await QRCode.toDataURL(text, {
          width,
          margin,
          color: {
            dark: darkColor,
            light: lightColor,
          },
          errorCorrectionLevel: "M",
        });
        setDataUrl(url);
        setError(null);
      } catch (err: any) {
        setError(err?.message || "QR generation failed");
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [text, width, margin, darkColor, lightColor]);

  const download = (filename?: string) => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = filename || `credgraph-qr-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return { dataUrl, loading, error, download };
}
