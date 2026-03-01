"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, truncateAddress } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";
import { Wallet, Menu, X, LogOut, ChevronDown } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/issuer", label: "Issuers" },
  { href: "/student", label: "Dashboard" },
  { href: "/verify", label: "Verify" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-void/70 backdrop-blur-2xl border-b border-surface-800/30" : "bg-transparent"
      )}>
        <div className="section-wrapper">
          <div className="flex items-center justify-between h-[68px]">

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-gold opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-void">
                    <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" fill="currentColor" />
                    <path d="M12 8L16 10.5V15.5L12 18L8 15.5V10.5L12 8Z" fill="rgba(255,255,255,0.3)" />
                  </svg>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-neon-400 rounded-full animate-breathe" />
              </div>
              <span className="text-h3 text-white tracking-tight">
                Cred<span className="text-gradient-gold">Graph</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link key={link.href} href={link.href}>
                    <div className={cn(
                      "relative px-4 py-2 rounded-lg text-b3 font-medium transition-all duration-200",
                      active ? "text-gold-400" : "text-surface-400 hover:text-surface-200 hover:bg-surface-800/40"
                    )}>
                      {active && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-2 right-2 h-0.5 bg-gold-400 rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {isConnected && address ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-850 border border-surface-700/50 hover:border-gold-500/20 transition-all text-b3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-400" />
                    <span className="font-mono text-surface-300">{truncateAddress(address, 4)}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-surface-500" />
                  </button>
                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        className="absolute right-0 mt-2 w-52 panel-elevated rounded-xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-surface-800/50">
                          <p className="text-micro text-surface-500 uppercase tracking-wider">Connected</p>
                          <p className="text-b3 font-mono text-surface-300 mt-1">{truncateAddress(address, 8)}</p>
                        </div>
                        <div className="p-1.5">
                          <button
                            onClick={() => { disconnect(); setDropdown(false); }}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-b3 text-crimson-400 hover:bg-crimson-500/8 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button onClick={connect} loading={isConnecting} size="md" icon={<Wallet className="w-4 h-4" />}>
                  Connect
                </Button>
              )}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/40 transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-surface-900 border-l border-surface-800/50"
            >
              <div className="p-4 border-b border-surface-800/50 flex items-center justify-between">
                <span className="text-h3 text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-surface-800 text-surface-400"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-4 space-y-1">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                      <div className={cn(
                        "px-4 py-3 rounded-xl text-b2 font-medium transition-all",
                        active ? "bg-gold-500/8 text-gold-400 border border-gold-500/15" : "text-surface-400 hover:text-white hover:bg-surface-800/40"
                      )}>
                        {link.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-800/50">
                {isConnected ? (
                  <Button onClick={disconnect} variant="danger" fullWidth size="sm" icon={<LogOut className="w-4 h-4" />}>Disconnect</Button>
                ) : (
                  <Button onClick={connect} loading={isConnecting} fullWidth icon={<Wallet className="w-4 h-4" />}>Connect Wallet</Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {dropdown && <div className="fixed inset-0 z-30" onClick={() => setDropdown(false)} />}
    </>
  );
};
