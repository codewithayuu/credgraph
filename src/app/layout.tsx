import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletProvider } from "@/providers/WalletProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://credgraph.app"),
  title: "CredGraph — Verify the Chain",
  description:
    "Don't trust the resume. Verify the chain. CredGraph is a blockchain-powered credential verification protocol on Algorand.",
  keywords: [
    "credentials",
    "blockchain",
    "verification",
    "Algorand",
    "NFT",
    "education",
    "governance",
  ],
  authors: [{ name: "CredGraph Team" }],
  creator: "CredGraph",
  publisher: "CredGraph",
  robots: "index, follow",
  openGraph: {
    title: "CredGraph — Verify the Chain",
    description:
      "Don't trust the resume. Verify the chain. Blockchain-powered credential verification on Algorand.",
    url: "https://credgraph.app",
    siteName: "CredGraph",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CredGraph — Verify the Chain",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CredGraph — Verify the Chain",
    description:
      "Blockchain-powered credential verification on Algorand.",
    images: ["/og-image.png"],
    creator: "@credgraph",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-void text-white antialiased">
        <WalletProvider>
          <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 w-full pt-20">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#141825",
                color: "#f8f9fc",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                fontSize: "14px",
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  );
}
