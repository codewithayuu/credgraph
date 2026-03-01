"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function SkillPathsTab() {
  const { compositionRules } = useCredentialStore();

  const handleEdit = () => {
    toast("Editing disabled in demo mode.", { icon: "🔒" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-h2 font-semibold text-white">Skill Paths (Mastery Rules)</h3>
          <p className="text-b3 text-surface-400 mt-1">Define logic for composite credentials.</p>
        </div>
        <button onClick={handleEdit} className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-void font-bold rounded-lg text-sm hover:brightness-110 transition-all">
          New Path
        </button>
      </div>

      <div className="space-y-6">
        {compositionRules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="panel rounded-3xl border border-surface-800 p-6 md:p-8 relative overflow-hidden"
          >
            {/* Visual background element */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-gold-500/5 blur-3xl rounded-full" />

            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-h3 font-semibold text-white">{rule.name}</h4>
                <p className="text-micro text-surface-400 mt-1 max-w-xl">{rule.description}</p>
              </div>
              <button onClick={handleEdit} className="px-3 py-1.5 rounded-lg border border-surface-700 text-surface-300 hover:text-white hover:bg-surface-800 text-micro font-medium transition-colors">
                Edit Path
              </button>
            </div>

            <div className="relative">
              <h5 className="text-micro font-semibold text-surface-400 uppercase tracking-widest mb-4">Required Micro-Credentials</h5>

              <div className="flex flex-wrap items-center gap-3">
                {rule.requiredCredentialTypes?.map((reqItem, i) => (
                  <React.Fragment key={reqItem.id}>
                    <div className="px-4 py-3 rounded-xl bg-surface-900 border border-surface-700 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center border border-surface-700 text-gold-400 text-micro font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-b3 font-medium text-white">{reqItem.name}</p>
                        <p className="text-micro text-surface-500 font-mono mt-0.5">{reqItem.id}</p>
                      </div>
                    </div>
                    {i < (rule.requiredCredentialTypes?.length || 0) - 1 && (
                      <div className="text-surface-600 px-1 hidden md:block">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}

                <div className="text-surface-600 px-2 hidden md:block">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="px-5 py-4 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-400 flex items-center justify-center text-void">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4L14 8L18 9L15 12L16 16L12 14L8 16L9 12L6 9L10 8L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-micro font-bold text-gold-400 uppercase tracking-wider block">Yields Mastery</span>
                    <p className="text-b2 font-semibold text-white mt-0.5">{rule.name}</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}
