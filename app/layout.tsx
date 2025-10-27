'use client'

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Navigation from "@/components/navigation"
import { WalletProvider, WalletManager, NetworkId, WalletId } from '@txnlab/use-wallet-react';


const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.EXODUS,
    // Add more as needed
  ],
  defaultNetwork: NetworkId.TESTNET, // or MAINNET
});

const algodConfig = {
  algodServer: "https://testnet-api.algonode.cloud",
  algodToken: "",
  algodPort: "",
};

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const Metadata = {
  title: "MemoryChain - Digital Legacy Vault",
  description: "Secure, decentralized digital legacy management on Algorand",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <WalletProvider manager={walletManager}>
          <Navigation />
          {children}
          <Analytics />
        </WalletProvider>
      </body>
    </html>
  )
}
