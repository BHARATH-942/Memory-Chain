"use client"

import { ArrowRight, Lock, Users, Zap, Shield, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Decentralized Legacy Management</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
            Your Digital Legacy,
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}
              Secured Forever
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            MemoryChain is a decentralized vault for your most precious digital memories. Encrypted, secure, and passed
            down to your loved ones with complete control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/vault"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Your Vault
              <ArrowRight size={20} />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
          <div className="relative bg-gradient-to-br from-card to-secondary/30 rounded-2xl border border-border p-12 sm:p-16 min-h-96 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Lock size={64} className="mx-auto text-primary/40" />
              <p className="text-muted-foreground">Your secure digital vault awaits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">How MemoryChain Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Military-grade encryption meets blockchain security for your digital legacy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">End-to-End Encryption</h3>
              <p className="text-muted-foreground">
                Your memories are encrypted locally with AES-256. Only you and approved family members can decrypt them.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Family Access Control</h3>
              <p className="text-muted-foreground">
                Grant or revoke access to family members instantly. Manage who sees what with granular permissions.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Legacy Mode</h3>
              <p className="text-muted-foreground">
                Set up automatic access transfer to heirs if you're inactive. Your legacy lives on securely.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Blockchain Secured</h3>
              <p className="text-muted-foreground">
                Built on Algorand for immutable records. Your vault metadata is permanently secured on-chain.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">IPFS Storage</h3>
              <p className="text-muted-foreground">
                Decentralized storage ensures your memories are always accessible, never lost or censored.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">NFT Certificates</h3>
              <p className="text-muted-foreground">
                Mint your memories as NFTs for proof of authenticity and ownership on the blockchain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16">Getting Started</h2>

        <div className="space-y-8">
          {[
            {
              step: 1,
              title: "Connect Your Wallet",
              desc: "Link your Algorand wallet (Pera or MyAlgo) to get started.",
            },
            {
              step: 2,
              title: "Create Your Vault",
              desc: "Set up your personal digital vault with encryption settings.",
            },
            {
              step: 3,
              title: "Upload Memories",
              desc: "Add photos, videos, and documents. They're encrypted locally before upload.",
            },
            {
              step: 4,
              title: "Share with Family",
              desc: "Grant access to family members and set up your family tree.",
            },
            {
              step: 5,
              title: "Plan Your Legacy",
              desc: "Configure legacy mode and designate heirs for automatic transfer.",
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                  {item.step}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl border border-primary/30 p-12 sm:p-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Secure Your Legacy?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands protecting their digital memories with MemoryChain
          </p>
          <Link
            href="/vault"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Start Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">MemoryChain</h3>
              <p className="text-sm text-muted-foreground">Securing digital legacies on the blockchain.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/vault" className="hover:text-primary transition-colors">
                    Vault
                  </Link>
                </li>
                <li>
                  <Link href="/family" className="hover:text-primary transition-colors">
                    Family
                  </Link>
                </li>
                <li>
                  <Link href="/legacy" className="hover:text-primary transition-colors">
                    Legacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 MemoryChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
