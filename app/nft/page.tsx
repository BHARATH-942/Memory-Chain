"use client"

import { useState } from "react"
import { Sparkles, Lock, Zap, Plus } from "lucide-react"

export default function NFTPage() {
  const [nfts, setNfts] = useState([
    { id: 1, name: "Summer Memories 2024", minted: true, date: "2024-08-15" },
    { id: 2, name: "Family Reunion", minted: false, date: "2024-07-20" },
  ])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Memory NFTs</h1>
            <p className="text-muted-foreground">Mint your memories as NFTs for proof of authenticity</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg">
            <Plus size={20} />
            Mint NFT
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="text-primary" size={24} />
              <h3 className="font-semibold">Authenticity</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Prove ownership and authenticity of your memories on the blockchain
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-primary" size={24} />
              <h3 className="font-semibold">Secure</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Your NFTs remain encrypted and only accessible to you and approved viewers
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-primary" size={24} />
              <h3 className="font-semibold">Transferable</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Pass down your memory NFTs to heirs as part of your digital legacy
            </p>
          </div>
        </div>

        {/* NFT Gallery */}
        <div className="grid md:grid-cols-2 gap-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
            >
              {/* NFT Preview */}
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="relative flex flex-col items-center gap-2">
                  <Sparkles className="text-primary/40" size={64} />
                  <span className="text-sm text-muted-foreground">Memory NFT</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{nft.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{nft.date}</p>

                {nft.minted ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg">
                      <p className="text-xs font-mono text-accent">Contract: 0x1234...5678</p>
                    </div>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors font-medium">
                      View on Explorer
                    </button>
                  </div>
                ) : (
                  <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Sparkles size={18} />
                    Mint NFT
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Minting Info */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">About Memory NFTs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">What is a Memory NFT?</h3>
              <p className="text-muted-foreground">
                A Memory NFT is a blockchain-verified certificate of authenticity for your digital memories. It proves
                you owned and created the memory at a specific time, creating an immutable record on the Algorand
                blockchain.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Why Mint?</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Prove ownership and authenticity</li>
                <li>• Create a permanent record</li>
                <li>• Transfer to heirs as digital assets</li>
                <li>• Participate in the digital legacy economy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
