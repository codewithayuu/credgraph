"use client";

import { useCallback } from "react";
import { useWalletStore } from "@/store/walletStore";
import toast from "react-hot-toast";

export function useWallet() {
  const {
    address,
    isConnected,
    isConnecting,
    error,
    peraWallet,
    setAddress,
    setConnecting,
    setError,
    disconnect: storeDisconnect,
  } = useWalletStore();

  const connect = useCallback(async () => {
    if (!peraWallet) {
      toast.error("Wallet not initialized. Please refresh.");
      return;
    }

    try {
      setConnecting(true);
      const accounts = await peraWallet.connect();
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        toast.success("Wallet connected successfully");
      }
    } catch (err: any) {
      if (err?.data?.type !== "CONNECT_MODAL_CLOSED") {
        setError(err?.message || "Failed to connect wallet");
        toast.error("Failed to connect wallet");
      } else {
        setConnecting(false);
      }
    }
  }, [peraWallet, setAddress, setConnecting, setError]);

  const disconnect = useCallback(async () => {
    if (peraWallet) {
      try {
        await peraWallet.disconnect();
      } catch (err) {}
    }
    storeDisconnect();
    toast.success("Wallet disconnected");
  }, [peraWallet, storeDisconnect]);

  return {
    address,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    peraWallet,
  };
}
