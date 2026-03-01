"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ACTIVE_NETWORK } from "@/lib/constants";
import { Wifi, WifiOff, Activity } from "lucide-react";

export const NetworkStatus: React.FC<{ className?: string }> = ({ className }) => {
  const [status, setStatus] = useState<"connected" | "checking" | "error">("checking");
  const [blockHeight, setBlockHeight] = useState<number>(0);

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        const response = await fetch("https://testnet-api.algonode.cloud/v2/status");
        if (response.ok) {
          const data = await response.json();
          setBlockHeight(data["last-round"] || 0);
          setStatus("connected");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    checkNetwork();
    const interval = setInterval(checkNetwork, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-caption font-medium",
        status === "connected"
          ? "bg-accent-500/10 border-accent-500/20 text-accent-400"
          : status === "error"
          ? "bg-red-500/10 border-red-500/20 text-red-400"
          : "bg-amber-500/10 border-amber-500/20 text-amber-400",
        className
      )}
    >
      {status === "connected" ? (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Activity className="w-3 h-3" />
          </motion.div>
          <span>{ACTIVE_NETWORK === "testnet" ? "Testnet" : "Mainnet"}</span>
          {blockHeight > 0 && (
            <>
              <div className="w-px h-3 bg-current opacity-30" />
              <span className="font-mono opacity-70">#{blockHeight.toLocaleString()}</span>
            </>
          )}
        </>
      ) : status === "error" ? (
        <>
          <WifiOff className="w-3 h-3" />
          <span>Disconnected</span>
        </>
      ) : (
        <>
          <Wifi className="w-3 h-3 animate-pulse" />
          <span>Connecting...</span>
        </>
      )}
    </div>
  );
};
