"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import { useIssuer } from "@/hooks/useIssuer";
import toast from "react-hot-toast";

export function ManageIssuancesTab() {
    const { address } = useIssuer();
    const { credentials } = useCredentialStore();

    // Only show credentials issued by this issuer
    const issuedCredentials = credentials.filter(c => c.issuerAddress === address);

    const handleRevoke = () => {
        toast("Action restricted in Hackathon Demo environment.", { icon: "🔒" });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-h2 font-semibold text-white">Manage Issuances</h3>
                    <p className="text-b3 text-surface-400 mt-1">
                        Track and manage all credentials you have issued.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-surface-800 bg-surface-900 shadow-card">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-surface-800 bg-surface-800/50">
                                <th className="py-4 px-6 text-micro font-semibold text-surface-400 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-micro font-semibold text-surface-400 uppercase tracking-wider">Recipient</th>
                                <th className="py-4 px-6 text-micro font-semibold text-surface-400 uppercase tracking-wider">Credential</th>
                                <th className="py-4 px-6 text-micro font-semibold text-surface-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-micro font-semibold text-surface-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-800">
                            {issuedCredentials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-surface-500">
                                        No issuances found. Emit your first credential to see it here!
                                    </td>
                                </tr>
                            ) : (
                                issuedCredentials.map((cred, i) => {
                                    const date = new Date(cred.issuedAt * 1000).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
                                    const isRevoked = cred.status === "revoked";

                                    return (
                                        <motion.tr
                                            key={cred.id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-surface-800/30 transition-colors"
                                        >
                                            <td className="py-4 px-6 text-b3 text-surface-300 whitespace-nowrap">{date}</td>
                                            <td className="py-4 px-6 text-b3 font-mono text-electric-400 whitespace-nowrap">
                                                {cred.recipientAddress.slice(0, 8)}...{cred.recipientAddress.slice(-6)}
                                            </td>
                                            <td className="py-4 px-6 text-b3 text-white font-medium max-w-xs truncate" title={cred.credentialTypeName}>
                                                {cred.credentialTypeName}
                                                <br />
                                                <span className="text-micro font-mono text-surface-500">{cred.id}</span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-full text-micro font-medium ${isRevoked ? 'bg-crimson-500/10 text-crimson-400 border border-crimson-500/20' : 'bg-neon-500/10 text-neon-400 border border-neon-500/20'}`}>
                                                    {isRevoked ? 'Revoked' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <button
                                                    onClick={handleRevoke}
                                                    className="text-micro text-surface-400 hover:text-white px-3 py-1.5 rounded border border-surface-700 hover:bg-surface-800 transition-colors"
                                                >
                                                    Revoke
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
