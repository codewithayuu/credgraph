import { create } from "zustand";

interface WalletStore {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  peraWallet: any | null;
  setAddress: (address: string | null) => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
  setPeraWallet: (wallet: any) => void;
  disconnect: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  peraWallet: null,
  setAddress: (address) =>
    set({ address, isConnected: !!address, isConnecting: false, error: null }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setError: (error) => set({ error, isConnecting: false }),
  setPeraWallet: (wallet) => set({ peraWallet: wallet }),
  disconnect: () =>
    set({ address: null, isConnected: false, isConnecting: false, error: null }),
}));
