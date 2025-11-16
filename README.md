# MemoryChain 🔗

> **Decentralized Legacy Management — Your Digital Legacy, Secured Forever**

MemoryChain is a blockchain-powered platform that enables secure, encrypted storage and inheritance of digital memories. Built on Algorand with IPFS storage, it ensures your precious memories are preserved forever and automatically transferred to loved ones when needed.

---

## 📋 Overview

MemoryChain solves the critical problem of **digital legacy preservation** by combining:
- **Client-side AES-256 encryption** — Your data never leaves your device unencrypted
- **IPFS permanent storage** — Decentralized, immutable memory storage
- **Algorand blockchain** — Secure metadata and inheritance logic
- **Dead-Man Switch** — Automatic access transfer to beneficiaries after inactivity
- **NFT Certificates** — Mint memories as NFTs for proof of ownership

Unlike traditional cloud storage, MemoryChain gives you **true ownership** and **cryptographic guarantees** that your memories will reach your loved ones, even when you can't.

---

## ✨ Key Features

### 🔐 End-to-End Encryption
- All files encrypted **locally in your browser** using AES-256-GCM
- Encryption keys never touch our servers
- Only you (and your designated beneficiaries) can decrypt memories

### 🌐 Decentralized Storage
- Files stored on **IPFS via Pinata**
- Permanent, censorship-resistant storage
- Content-addressed (CID) ensures data integrity

### ⛓️ Blockchain Security
- Smart contracts on **Algorand** manage access control
- Immutable audit trail of all actions
- Dead-Man Switch logic for automatic inheritance

### 👨‍👩‍👧‍👦 Family Access Control
- Granular permissions for family members
- Add/revoke access instantly
- Set up beneficiaries for legacy transfer

### ⏰ Legacy Mode
- Automatic access transfer if you're inactive
- Configurable inactivity period
- Cryptographic key transfer to beneficiaries

### 🎨 NFT Minting
- Mint memories as NFTs on Algorand
- Proof of authenticity and ownership
- Transferable digital heirlooms

---

## 🏗️ Architecture

MemoryChain uses a **zero-knowledge architecture** where the platform never has access to your unencrypted data:

```
┌─────────────┐
│   Browser   │ ← User uploads memory
│  (Client)   │
└──────┬──────┘
       │
       │ 1️⃣ Generate AES-256 key
       │ 2️⃣ Encrypt file locally
       │
       ▼
┌─────────────┐
│    IPFS     │ ← Upload encrypted file only
│  (Pinata)   │
└──────┬──────┘
       │
       │ Returns CID (Content ID)
       │
       ▼
┌─────────────┐
│  Algorand   │ ← Store metadata:
│ Blockchain  │   • CID
└─────────────┘   • Encrypted AES key
                  • Owner address
                  • Beneficiary address
                  • Timestamp
```

### Data Flow

#### **Upload Process:**
1. **Local Encryption** — File encrypted in browser with random AES key
2. **IPFS Upload** — Encrypted file uploaded to Pinata, returns CID
3. **Key Encryption** — AES key encrypted using ECDH ephemeral key
4. **Blockchain Storage** — CID + encrypted key stored in Algorand smart contract

#### **Retrieval Process:**
1. **Fetch Metadata** — Get CID and encrypted AES key from Algorand
2. **Download File** — Fetch encrypted file from IPFS using CID
3. **Decrypt Key** — Use wallet private key to decrypt AES key
4. **Decrypt File** — Decrypt memory in browser and display

#### **Inheritance Process:**
1. **Inactivity Detection** — Smart contract monitors owner's last activity
2. **Dead-Man Trigger** — After threshold period, inheritance activates
3. **Key Transfer** — Encrypted AES key re-encrypted for beneficiary
4. **Access Granted** — Beneficiary can now decrypt and view memories

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16 or higher
- Algorand wallet (Pera Wallet or MyAlgo)
- Pinata account for IPFS storage

### Installation

```bash
# Clone the repository
git clone https://github.com/BHARATH-942/Memory-Chain.git
cd Memory-Chain

# Install dependencies
npm install
```

### Configuration

Create a `.env` file in the root directory:

```env
# Pinata IPFS Configuration
PINATA_JWT=your_pinata_jwt_token

# Algorand Network Configuration
ALGOD_TOKEN=your_algod_token
ALGOD_SERVER=https://testnet-api.algonode.cloud
ALGOD_PORT=443

# Network (testnet or mainnet)
NETWORK=testnet
```

### Running the Application

#### Frontend (Next.js)
```bash
npm run dev
# Open http://localhost:3000
```

#### Backend Upload Script
```bash
node upload.js
```

---

## 📦 Smart Contract Deployment

MemoryChain smart contracts are deployed on **Algorand TestNet**. You can verify them using AlgoKit:

### Deployed Contracts

We actually dont have a smart contract the process is done by a transaction code from the link below:
`https://github.com/BHARATH-942/Memory-Chain/blob/main/lib/algorand.ts`

### Verify on TestNet

Use [https://testnet.explorer.perawallet.app/] to view and verify an exaple transactions:

# Example transaction
[https://testnet.explorer.perawallet.app/tx/D2NFNSDUGX2GK5WBUM5ECGG7Q5J7JVVJPQJVD3HWIA6IKRHATA3A/](https://testnet.explorer.perawallet.app/tx/D2NFNSDUGX2GK5WBUM5ECGG7Q5J7JVVJPQJVD3HWIA6IKRHATA3A/)


---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** — React framework
- **TypeScript** — Type safety
- **TailwindCSS** — Styling
- **Framer Motion** — Animations
- **@algorandfoundation/algokit-utils** — Wallet integration

### Backend
- **Node.js** — Server runtime
- **Algorand SDK** — Blockchain interactions
- **Pinata SDK** — IPFS uploads
- **crypto-js** — Encryption utilities

### Blockchain
- **Algorand** — Layer-1 blockchain
- **PyTeal** — Smart contract language
- **AlgoKit** — Development toolchain

### Storage
- **IPFS (Pinata)** — Decentralized file storage
- **Algorand Box Storage** — On-chain metadata

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
# Install dev dependencies
npm install --include=dev

# Run in development mode
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

---


## 🙏 Acknowledgments

- **Algorand Foundation** — For the robust blockchain infrastructure
- **Pinata** — For reliable IPFS pinning services
- **AlgoKit** — For excellent development tools
- **Open Source Community** — For the amazing libraries and tools

---



<div align="center">

**Built with ❤️ for preserving memories that matter**

⭐ Star us on GitHub if you find this project useful!

</div>
