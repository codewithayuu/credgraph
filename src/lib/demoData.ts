import { Credential, CredentialType, CompositionRule, Issuer } from "@/lib/types";

const NOW = Math.floor(Date.now() / 1000);
const DAY = 86400;

export const DEMO_ISSUER_ADDRESSES = {
  csDepartment: "ISSUER1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890ABC",
  trainingOrg: "ISSUER2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ2345678",
  codingClub: "ISSUER3HACKCLUBDEFGHIJKLMNOPQRSTUVWXYZ23456",
};

export const DEMO_STUDENT_ADDRESSES = {
  rahul: "STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890",
  priya: "STUDENT2XYZABCDEFGHIJKLMNOPQRSTUVWXYZ234568",
};

export function getDemoScenario() {
  return {
    issuers: DEMO_ISSUER_ADDRESSES,
    students: DEMO_STUDENT_ADDRESSES,
    instructions: {
      step1: `Connect wallet as issuer using address: ${DEMO_ISSUER_ADDRESSES.csDepartment}`,
      step2: "Navigate to Credential Types tab — 5 types are pre-defined",
      step3: `Issue a credential to student: ${DEMO_STUDENT_ADDRESSES.rahul}`,
      step4: "Switch to Student Dashboard to see credentials and skill path progress",
      step5: "Issue the missing 'Cloud Deployment' credential to trigger composite auto-issuance",
      step6: `Open verification page: /verify/${DEMO_STUDENT_ADDRESSES.rahul}`,
      step7: "Demonstrate revocation from Issuer Portal",
      step8: "Refresh verification page to show revoked status",
    },
  };
}

export function generateDemoBadgeColors(category: string): {
  primary: string;
  secondary: string;
  gradient: string;
} {
  const colors: Record<string, { primary: string; secondary: string; gradient: string }> = {
    technical: {
      primary: "#3b82f6",
      secondary: "#1d4ed8",
      gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    },
    soft_skill: {
      primary: "#a855f7",
      secondary: "#7c3aed",
      gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    },
    achievement: {
      primary: "#f59e0b",
      secondary: "#d97706",
      gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
    research: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    },
    certification: {
      primary: "#10b981",
      secondary: "#059669",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
    },
    academic: {
      primary: "#6366f1",
      secondary: "#4f46e5",
      gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
    },
  };

  return colors[category] || colors.technical;
}

export const DEMO_CREDENTIAL_BADGES: Record<string, { icon: string; color: string }> = {
  "CT-001": { icon: "Code", color: "#3b82f6" },
  "CT-002": { icon: "Database", color: "#8b5cf6" },
  "CT-003": { icon: "Server", color: "#10b981" },
  "CT-004": { icon: "Plug", color: "#f59e0b" },
  "CT-005": { icon: "Cloud", color: "#06b6d4" },
  "CT-006": { icon: "Trophy", color: "#ef4444" },
  "CT-007": { icon: "Brain", color: "#ec4899" },
  "CT-010": { icon: "Crown", color: "#f59e0b" },
};
