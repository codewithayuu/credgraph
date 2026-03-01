"use client";

import React, { useEffect, useCallback } from "react";
import { useWalletStore } from "@/store/walletStore";
import { useCredentialStore } from "@/store/credentialStore";

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setPeraWallet, setAddress, setConnecting, setError } = useWalletStore();
  const { loadMockData } = useCredentialStore();

  useEffect(() => {
    loadMockData();
  }, [loadMockData]);

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
