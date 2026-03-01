import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WalletProvider } from "@/providers/WalletProvider";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { BackToTop } from "@/components/shared/BackToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "CredGraph — Verifiable Credentials on Algorand",
  description:
    "Composable, verifiable academic credentials on Algorand. Issue, own, verify, compose. Don't trust the resume — verify the chain.",
  keywords: ["credentials", "blockchain", "algorand", "NFT", "verification", "education"],
  openGraph: {
    title: "CredGraph — Verifiable Credentials on Algorand",
    description: "Don't trust the resume. Verify the chain.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <WalletProvider>
          <ScrollProgress />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-[72px]">{children}</main>
            <Footer />
          </div>
          <BackToTop />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e293b",
                color: "#e2e8f0",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                borderRadius: "12px",
                fontSize: "14px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
              },
              success: {
                iconTheme: { primary: "#10b981", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </WalletProvider>
      </body>
    </html>
  );
}
