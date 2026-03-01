"use client";

import React, { useEffect } from "react";
import { useWalletStore } from "@/store/walletStore";
import { useCredentialStore } from "@/store/credentialStore";
import { useGovernanceStore } from "@/store/governanceStore";

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setPeraWallet, setAddress } = useWalletStore();
  const { loadMockData: loadCredentialData } = useCredentialStore();
  const { loadMockData: loadGovernanceData } = useGovernanceStore();

  // Load all mock data on mount
  useEffect(() => {
    loadCredentialData();
    loadGovernanceData();
  }, [loadCredentialData, loadGovernanceData]);

  // Initialize Pera Wallet
  useEffect(() => {
    const initWallet = async () => {
      try {
        const { PeraWalletConnect } = await import("@perawallet/connect");
        const peraWallet = new PeraWalletConnect();
        setPeraWallet(peraWallet);

        if (peraWallet.isConnected) {
          const accounts = await peraWallet.reconnectSession();
          if (accounts.length > 0) {
            setAddress(accounts[0]);
          }
        }

        peraWallet.connector?.on("disconnect", () => {
          setAddress(null);
        });
      } catch (err) {
        console.error("Failed to initialize wallet:", err);
      }
    };

    initWallet();
  }, [setPeraWallet, setAddress]);

  return <>{children}</>;
};
