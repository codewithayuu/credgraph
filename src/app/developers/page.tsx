"use client";

import React from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/shared/PageTransition";
import { cn } from "@/lib/utils";

export default function DevelopersPage() {
    return (
        <PageTransition>
            <div className="min-h-screen pb-20">
                {/* Hero Section */}
                <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
                    <div className="absolute top-0 right-1/4 w-[600px] h-[500px] rounded-full bg-neon-500/[0.03] blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-800 border border-surface-700 mb-6">
                            <span className="w-2 h-2 rounded-full bg-neon-400 animate-pulse" />
                            <span className="text-micro font-medium text-surface-200 uppercase tracking-widest">API v1.0 Live</span>
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
                            Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-400 to-electric-400">Trust.</span>
                        </h1>
                        <p className="text-b1 text-surface-400 leading-relaxed text-balance">
                            Integrate trustless, on-chain credential issuance and verification directly into your applications. Plumb the truth layer of the internet.
                        </p>
                    </motion.div>
                </div>

                {/* Layout */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Sidebar Navigation */}
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="lg:w-64 shrink-0"
                        >
                            <div className="sticky top-28 space-y-8">
                                <div>
                                    <h4 className="text-micro font-bold text-surface-500 uppercase tracking-widest mb-3">Getting Started</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-b3 font-medium text-neon-400">Overview</a></li>
                                        <li><a href="#" className="text-b3 font-medium text-surface-400 hover:text-white transition-colors">Authentication (Trustless)</a></li>
                                        <li><a href="#" className="text-b3 font-medium text-surface-400 hover:text-white transition-colors">Errors & Webhooks</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-micro font-bold text-surface-500 uppercase tracking-widest mb-3">API Endpoints</h4>
                                    <ul className="space-y-2">
                                        <li><a href="#" className="text-b3 font-medium text-surface-400 hover:text-white transition-colors">Issue Credential POST</a></li>
                                        <li><a href="#" className="text-b3 font-medium text-surface-400 hover:text-white transition-colors">Revoke Credential DELETE</a></li>
                                        <li><a href="#" className="text-b3 font-medium text-surface-400 hover:text-white transition-colors">Verify Credential GET</a></li>
                                        <li><a href="#" className="text-b3 font-medium text-surface-400 hover:text-white transition-colors">List Types GET</a></li>
                                    </ul>
                                </div>
                            </div>
                        </motion.aside>

                        {/* Main Content Area */}
                        <motion.main
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex-1 min-w-0 pb-20"
                        >
                            <article className="prose prose-invert max-w-none">
                                <h2 className="text-h2 font-semibold text-white mb-4">Ecosystem Integration Example</h2>
                                <p className="text-b2 text-surface-300 mb-10 leading-relaxed">
                                    The true power of CredGraph lies in cross-platform interoperability. Platforms can hook into our API to automatically mint credentials upon user achievement, while other platforms can instantly verify those claims without relying on central databases.
                                </p>

                                {/* Example 1: Algo Atlas Issuance */}
                                <div className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-electric-500/10 border border-electric-500/20 flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-electric-400">
                                                <path d="M12 4L4 8L12 12L20 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 12L12 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M4 16L12 20L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-h3 font-semibold text-white m-0">EdTech Flow: Auto-Issuance</h3>
                                            <p className="text-micro text-surface-400 m-0">Triggered by Algo Atlas upon course completion</p>
                                        </div>
                                    </div>

                                    <div className="panel rounded-2xl border border-surface-800 bg-[#0d1117] overflow-hidden shadow-2xl">
                                        <div className="flex items-center px-4 py-2 bg-surface-900 border-b border-surface-800">
                                            <div className="flex gap-1.5 mr-4">
                                                <div className="w-3 h-3 rounded-full bg-crimson-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-gold-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-neon-500/50" />
                                            </div>
                                            <span className="text-micro font-mono text-surface-400">POST /v1/credentials/issue</span>
                                        </div>
                                        <div className="p-5 overflow-x-auto text-sm font-mono leading-relaxed">
                                            {`curl -X POST https://api.credgraph.app/v1/credentials/issue \\
  -H "Authorization: Bearer <ISSUER_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "credentialTypeId": "CT-ALGO-DSA-01",
    "recipientAddress": "STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ...",
    "category": "technical",
    "tier": "advanced",
    "evidenceHash": "ipfs://QmSubmitCodeHash839210",
    "metadata": {
      "course": "DSA Pattern Mastery",
      "grade": "98%",
      "platform": "Algo Atlas"
    }
}'`}
                                        </div>
                                    </div>
                                </div>

                                {/* Example 2: DevPaglu Verification */}
                                <div className="mb-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neon-400">
                                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-h3 font-semibold text-white m-0">Hiring Flow: Instant Verification</h3>
                                            <p className="text-micro text-surface-400 m-0">Called by DevPaglu to un-gate job applications</p>
                                        </div>
                                    </div>

                                    <div className="panel rounded-2xl border border-surface-800 bg-[#0d1117] overflow-hidden shadow-2xl">
                                        <div className="flex items-center px-4 py-2 bg-surface-900 border-b border-surface-800">
                                            <div className="flex gap-1.5 mr-4">
                                                <div className="w-3 h-3 rounded-full bg-crimson-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-gold-500/50" />
                                                <div className="w-3 h-3 rounded-full bg-neon-500/50" />
                                            </div>
                                            <span className="text-micro font-mono text-surface-400">Response 200 OK</span>
                                        </div>
                                        <div className="p-5 overflow-x-auto text-sm font-mono leading-relaxed">
                                            <span className="text-surface-300">{`{`}</span>
                                            <br />
                                            <span className="text-neon-300">  &quot;verified&quot;</span><span className="text-surface-300">: </span><span className="text-electric-400">true</span><span className="text-surface-300">,</span>
                                            <br />
                                            <span className="text-neon-300">  &quot;status&quot;</span><span className="text-surface-300">: </span><span className="text-gold-300">&quot;active&quot;</span><span className="text-surface-300">,</span>
                                            <br />
                                            <span className="text-neon-300">  &quot;data&quot;</span><span className="text-surface-300">: {`{`}</span>
                                            <br />
                                            <span className="text-neon-300">    &quot;credentialId&quot;</span><span className="text-surface-300">: </span><span className="text-gold-300">&quot;CRED-XYZ-789&quot;</span><span className="text-surface-300">,</span>
                                            <br />
                                            <span className="text-neon-300">    &quot;issuer&quot;</span><span className="text-surface-300">: </span><span className="text-gold-300">&quot;ISSUER_ALGO_ATLAS...&quot;</span><span className="text-surface-300">,</span>
                                            <br />
                                            <span className="text-neon-300">    &quot;recipient&quot;</span><span className="text-surface-300">: </span><span className="text-gold-300">&quot;STUDENT1ABC...&quot;</span><span className="text-surface-300">,</span>
                                            <br />
                                            <span className="text-neon-300">    &quot;type&quot;</span><span className="text-surface-300">: </span><span className="text-gold-300">&quot;DSA Pattern Mastery&quot;</span><span className="text-surface-300">,</span>
                                            <br />
                                            <span className="text-neon-300">    &quot;txId&quot;</span><span className="text-surface-300">: </span><span className="text-gold-300">&quot;TX987654321...&quot;</span>
                                            <br />
                                            <span className="text-surface-300">  {`}`}</span>
                                            <br />
                                            <span className="text-surface-300">{`}`}</span>
                                        </div>
                                    </div>
                                </div>

                            </article>
                        </motion.main>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
