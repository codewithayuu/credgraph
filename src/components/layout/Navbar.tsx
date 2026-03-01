"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, truncateAddress } from "@/lib/utils";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/Button";
import { Wallet, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/developers", label: "Developers" },
  { href: "/issuer", label: "Issuer Portal" },
  { href: "/student", label: "Student" },
  { href: "/verify", label: "Verify" },
  { href: "/governance", label: "Governance" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(false);
  }, [pathname]);

  const navBg = scrolled
    ? "bg-void/65 backdrop-blur-2xl border-b border-white/5"
    : "bg-transparent";

  return (
    <>
      <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", navBg)}>
        <div className="section-wrapper">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ type: "spring", stiffness: 520, damping: 34 }}
                className="relative"
              >
                <BrandLogo size={44} className="relative z-10" />
                <div className="absolute inset-0 rounded-full bg-gold-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <span className="font-display text-h3 text-white tracking-tight">
                Cred<span className="text-gradient-gold">Graph</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link key={link.href} href={link.href} className="relative">
                    <div
                      className={cn(
                        "relative px-4 py-2 rounded-xl text-b3 font-medium transition-colors",
                        active
                          ? "text-surface-100"
                          : "text-surface-400 hover:text-surface-200 hover:bg-surface-800/35"
                      )}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="navDot"
                          className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-1.5 h-1.5 rounded-full bg-gold-400 shadow-glow-gold"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop wallet */}
            <div className="hidden lg:flex items-center gap-3">
              {isConnected && address ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdown((v) => !v)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl",
                      "bg-surface-900/55 border border-surface-700/45",
                      "hover:border-gold-500/18 hover:shadow-panel-hover",
                      "transition-[border-color,box-shadow,background-color] duration-200",
                      "text-b3"
                    )}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-400" />
                    <span className="font-mono text-surface-300">{truncateAddress(address, 4)}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-surface-500" />
                  </button>

                  <AnimatePresence>
                    {dropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.985 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl panel-elevated overflow-hidden"
                      >
                        <div className="p-3.5 border-b border-surface-800/55">
                          <p className="text-micro text-surface-500 uppercase tracking-wider">Connected</p>
                          <p className="text-b3 font-mono text-surface-300 mt-1">{truncateAddress(address, 10)}</p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              disconnect();
                              setDropdown(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-b3 text-crimson-400 hover:bg-crimson-500/8 transition-colors"
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

            {/* Mobile button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl text-surface-400 hover:text-white hover:bg-surface-800/35 transition-colors"
              aria-label="Open menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-surface-900/90 backdrop-blur-xl border-l border-white/6"
            >
              <div className="p-4 border-b border-surface-800/55 flex items-center justify-between">
                <span className="font-display text-h3 text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-surface-800/50 text-surface-400"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-1.5">
                {links.map((link) => {
                  const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link key={link.href} href={link.href}>
                      <div
                        className={cn(
                          "px-4 py-3 rounded-2xl text-b2 font-medium transition-[background-color,border-color,color] duration-200 border",
                          active
                            ? "bg-gold-500/8 text-surface-100 border-gold-500/15"
                            : "text-surface-400 border-transparent hover:text-white hover:bg-surface-800/40"
                        )}
                      >
                        {link.label}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-800/55">
                {isConnected ? (
                  <Button onClick={disconnect} variant="danger" fullWidth size="sm" icon={<LogOut className="w-4 h-4" />}>
                    Disconnect
                  </Button>
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

      {/* click-away for dropdown */}
      {dropdown && <div className="fixed inset-0 z-30" onClick={() => setDropdown(false)} />}
    </>
  );
};
