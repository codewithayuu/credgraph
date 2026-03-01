"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCredentialStore } from "@/store/credentialStore";
import toast from "react-hot-toast";

export function CredentialTypesTab() {
  const { credentialTypes } = useCredentialStore();

  const handleEdit = () => {
    toast("Editing disabled in demo mode.", { icon: "🔒" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-h2 font-semibold text-white">Credential Types</h3>
          <p className="text-b3 text-surface-400 mt-1">Manage definitions of credentials you issue.</p>
        </div>
        <button onClick={handleEdit} className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-void font-bold rounded-lg text-sm hover:brightness-110 transition-all">
          Create New Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {credentialTypes.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-surface-900 border border-surface-800 shadow-card flex flex-col h-full hover:border-surface-700 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold-400">
                  <path d="M4 6V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V6C16 4.89543 15.1046 4 14 4H6C4.89543 4 4 4.89543 4 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M8 10L12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 7L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-micro font-medium px-2 py-0.5 rounded-md bg-neon-500/10 text-neon-400 border border-neon-500/20">
                Active
              </span>
            </div>

            <h4 className="text-b2 font-semibold text-white truncate">{type.name}</h4>
            <p className="text-micro text-surface-400 mt-2 line-clamp-2 min-h-[36px]">{type.description}</p>

            <div className="mt-auto pt-5 flex items-center justify-between border-t border-surface-800/60 mt-4">
              <span className="text-micro text-surface-500 font-mono">ID: {type.id}</span>
              <button onClick={handleEdit} className="text-micro text-gold-400 hover:text-gold-300 font-medium">Edit</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
