"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, truncateAddress } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";
import {
  Wallet,
  Menu,
  X,
  Home,
  Shield,
  GraduationCap,
  Search,
  LogOut,
  ChevronDown,
  Hexagon,
  Zap,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "/issuer", label: "Issuer Portal", icon: <Shield className="w-4 h-4" /> },
  { href: "/student", label: "Dashboard", icon: <GraduationCap className="w-4 h-4" /> },
  { href: "/verify", label: "Verify", icon: <Search className="w-4 h-4" /> },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletDropdown, setWalletDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-dark-950/80 backdrop-blur-2xl border-b border-dark-700/40 shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyber-500 flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-shadow duration-300">
                  <Hexagon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent-400 rounded-full border-2 border-dark-950 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-heading-md font-bold text-white tracking-tight">
                  Cred<span className="gradient-text">Graph</span>
                </span>
                <span className="text-[10px] font-medium text-dark-500 uppercase tracking-widest -mt-0.5">
                  Algorand Protocol
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      className={cn(
                        "relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-300 whitespace-nowrap",
                        isActive
                          ? "text-white"
                          : "text-dark-400 hover:text-dark-200 hover:bg-dark-800/40"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navActive"
                          className="absolute inset-0 bg-brand-600/15 border border-brand-500/25 rounded-xl"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {link.icon}
                        {link.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {isConnected && address ? (
                <div className="relative">
                  <button
                    onClick={() => setWalletDropdown(!walletDropdown)}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-dark-800/60 border border-dark-600/50 hover:border-brand-500/30 transition-all duration-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
                    <span className="text-body-sm font-mono text-dark-200">
                      {truncateAddress(address, 4)}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-dark-400" />
                  </button>

                  <AnimatePresence>
                    {walletDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl bg-dark-900 border border-dark-700/50 shadow-2xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-dark-700/50">
                          <p className="text-caption text-dark-500 mb-1">Connected Wallet</p>
                          <p className="text-body-sm font-mono text-dark-200">
                            {truncateAddress(address, 8)}
                          </p>
                        </div>
                        <div className="p-1.5">
                          <button
                            onClick={() => {
                              disconnect();
                              setWalletDropdown(false);
                            }}
                            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-body-sm text-red-400 hover:bg-red-500/10 transition-colors"
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
                <Button
                  onClick={connect}
                  loading={isConnecting}
                  icon={<Wallet className="w-4 h-4" />}
                  size="md"
                  className="shadow-xl"
                >
                  Connect Wallet
                </Button>
              )}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800/50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-dark-900 border-l border-dark-700/50 shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-dark-700/50">
                <span className="text-heading-md font-bold text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-dark-800 text-dark-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                      <div
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-body-md font-medium transition-all",
                          isActive
                            ? "bg-brand-600/15 text-white border border-brand-500/25"
                            : "text-dark-400 hover:text-white hover:bg-dark-800/50"
                        )}
                      >
                        {link.icon}
                        {link.label}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700/50">
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-800/60">
                      <div className="w-2 h-2 rounded-full bg-accent-400" />
                      <span className="text-body-sm font-mono text-dark-300">{truncateAddress(address!, 6)}</span>
                    </div>
                    <Button onClick={disconnect} variant="danger" fullWidth size="sm" icon={<LogOut className="w-4 h-4" />}>
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button onClick={connect} loading={isConnecting} fullWidth icon={<Wallet className="w-4 h-4" />}>
                    Connect Wallet
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {walletDropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setWalletDropdown(false)} />
      )}
    </>
  );
};
