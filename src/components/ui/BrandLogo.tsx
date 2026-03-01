"use client";

import React from "react";
import { motion } from "framer-motion";

interface BrandLogoProps {
    className?: string;
    size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className, size = 48 }) => {
    return (
        <div className={className} style={{ width: size, height: size }}>
            <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
            >
                {/* Soft Background Plate */}
                <circle cx="60" cy="60" r="54" fill="white" fillOpacity="0.06" />

                {/* Thick Connecting Beams - The Graph */}
                <g stroke="#06B6D4" strokeWidth="4" strokeLinecap="round" opacity="0.6">
                    <line x1="60" y1="40" x2="35" y2="85" strokeDasharray="1 8" />
                    <line x1="60" y1="40" x2="85" y2="85" strokeDasharray="1 8" />
                    <line x1="35" y1="85" x2="85" y2="85" strokeDasharray="1 8" />
                </g>

                {/* CUBES - Multi-layered groups to avoid transform conflicts */}

                {/* TOP CUBE */}
                <g transform="translate(60, 40)">
                    <motion.g
                        initial={{ y: -3 }}
                        animate={{ y: 3 }}
                        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2.4, ease: "easeInOut" }}
                    >
                        {/* Faces */}
                        <path d="M0 -14 L16 -7 L0 0 L-16 -7 Z" fill="#FBBF24" />
                        <path d="M0 0 L16 -7 L16 11 L0 18 Z" fill="#D97706" />
                        <path d="M0 0 L-16 -7 L-16 11 L0 18 Z" fill="#F59E0B" />
                        {/* Small Top Detail */}
                        <path d="M0 -7 L4 -5 L0 -3 L-4 -5 Z" fill="#0891B2" />
                        {/* Front Square Accent */}
                        <path d="M6 3 L12 0 L12 8 L6 11 Z" fill="#0E7490" />
                    </motion.g>
                </g>

                {/* BOTTOM LEFT CUBE */}
                <g transform="translate(35, 85)">
                    <motion.g
                        initial={{ x: -2 }}
                        animate={{ x: 2 }}
                        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2.1, ease: "easeInOut", delay: 0.1 }}
                    >
                        <path d="M0 -14 L16 -7 L0 0 L-16 -7 Z" fill="#FBBF24" />
                        <path d="M0 0 L16 -7 L16 11 L0 18 Z" fill="#D97706" />
                        <path d="M0 0 L-16 -7 L-16 11 L0 18 Z" fill="#F59E0B" />
                        <path d="M0 -7 L4 -5 L0 -3 L-4 -5 Z" fill="#0891B2" />
                        <path d="M-12 0 L-6 3 L-6 11 L-12 8 Z" fill="#0E7490" />
                    </motion.g>
                </g>

                {/* BOTTOM RIGHT CUBE */}
                <g transform="translate(85, 85)">
                    <motion.g
                        initial={{ x: 2 }}
                        animate={{ x: -2 }}
                        transition={{ repeat: Infinity, repeatType: "mirror", duration: 2.2, ease: "easeInOut", delay: 0.2 }}
                    >
                        <path d="M0 -14 L16 -7 L0 0 L-14 -7 Z" fill="#FBBF24" />
                        <path d="M0 0 L16 -7 L16 11 L0 18 Z" fill="#D97706" />
                        <path d="M0 0 L-16 -7 L-16 11 L0 18 Z" fill="#F59E0B" />
                        <path d="M0 -7 L4 -5 L0 -3 L-4 -5 Z" fill="#0891B2" />
                        <path d="M6 3 L12 0 L12 8 L6 11 Z" fill="#0E7490" />
                    </motion.g>
                </g>
            </svg>
        </div>
    );
};
