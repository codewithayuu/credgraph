"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useStudent } from "@/hooks/useStudent";
import { useCredentialStore } from "@/store/credentialStore";
import { cn } from "@/lib/utils";

export function StudentTimelineTab() {
    const { address } = useStudent();
    const { credentials } = useCredentialStore();

    const sortedCredentials = useMemo(() => {
        return credentials
            .filter(c => c.recipientAddress === address)
            .sort((a, b) => b.issuedAt - a.issuedAt);
    }, [credentials, address]);

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <h3 className="text-h2 font-semibold text-white">Timeline</h3>
                <p className="text-b3 text-surface-400 mt-1">Your cryptographic achievements over time</p>
            </div>

            <div className="relative pl-6 lg:pl-10 space-y-8 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-surface-800 before:ml-10 lg:before:ml-14">
                {sortedCredentials.length === 0 ? (
                    <div className="py-8 text-surface-500">No achievements recorded yet.</div>
                ) : (
                    sortedCredentials.map((cred, i) => {
                        const date = new Date(cred.issuedAt * 1000).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
                        const isRevoked = cred.status === "revoked";

                        return (
                            <motion.div
                                key={cred.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "relative pl-8 md:pl-12 py-2 pr-4 md:pr-0",
                                    "before:absolute before:top-4 before:left-[-1.125rem] before:w-4 before:h-4 before:rounded-full before:z-10",
                                    isRevoked
                                        ? "before:bg-crimson-500 before:border-4 before:border-void"
                                        : "before:bg-electric-500 before:border-4 before:border-void before:shadow-glow-electric"
                                )}
                            >
                                <div className="mb-1 text-micro font-medium text-surface-400 tracking-wider uppercase">
                                    {date}
                                </div>

                                <div className={cn(
                                    "panel rounded-2xl border p-5 mt-3 shadow-card transition-all",
                                    isRevoked
                                        ? "border-crimson-500/20 bg-crimson-500/5 opacity-80"
                                        : "border-surface-800 hover:border-surface-700 bg-surface-900"
                                )}>
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h4 className={cn("text-h3 font-semibold mb-1", isRevoked ? "text-crimson-400 line-through" : "text-white")}>
                                                {cred.credentialTypeName}
                                            </h4>
                                            <p className="text-b3 text-surface-300">
                                                Issued by <span className="text-white font-medium">{cred.issuerName}</span>
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-start md:items-end gap-1">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-micro font-bold tracking-wide uppercase",
                                                isRevoked
                                                    ? "bg-crimson-500/10 text-crimson-400 border border-crimson-500/20"
                                                    : "bg-electric-500/10 text-electric-400 border border-electric-500/20"
                                            )}>
                                                {isRevoked ? "Revoked" : "Active"}
                                            </span>
                                            <span className="text-micro font-mono text-surface-500">ID: {cred.id}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
