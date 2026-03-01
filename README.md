# CredGraph — Verifiable Credentials on Algorand

> Don't trust the resume. Verify the chain.

Composable, blockchain-verified academic credentials as NFTs on Algorand. Issue, own, verify, compose.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Architecture

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- **Blockchain**: Algorand Testnet (ASAs, Smart Contracts)
- **Storage**: IPFS via Pinata (metadata, evidence)
- **Wallet**: Pera Wallet Connect

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/issuer` | Issuer portal — define types, issue credentials, manage |
| `/student` | Student dashboard — view credentials, track progress, share |
| `/verify` | Public verification search |
| `/verify/[address]` | Public credential verification for a wallet |

## Demo Wallets

- **Issuer (CS Dept)**: `ISSUER1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890ABC`
- **Student (Rahul)**: `STUDENT1ABCDEFGHIJKLMNOPQRSTUVWXYZ234567890`

## Environment Variables

Copy `.env.local` and fill in your Pinata API keys for IPFS uploads.

## Built for Algorand Hackathon 2025
