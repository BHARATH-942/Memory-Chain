'use client'

import { useState, useEffect } from "react"
import { Grid3x3, Clock, Lock, Eye, Trash2, Plus, Share2, Users } from "lucide-react"
import VaultStats from "@/components/vault/vault-stats"
import VaultUploadModal from "@/components/vault/vault-upload-modal"
import VaultAccessControl from "@/components/vault/vault-access-control"
import { useWallet } from '@txnlab/use-wallet-react'
import { AlgorandService } from '@/lib/algorand'
import VaultViewModal from "@/components/vault/vault-view-modal"

export default function VaultPage() {
  const { activeAccount } = useWallet()
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAccessControl, setShowAccessControl] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState<any>(null)
  const [memories, setMemories] = useState<any[]>([])

  useEffect(() => {
    const loadMemories = async () => {
      if (!activeAccount) return
      
      try {
        const res = await fetch(`/api/memories/for-user?viewer=${encodeURIComponent(activeAccount.address)}`)
        if (!res.ok) throw new Error('memories API failed')
        const json = await res.json()
        const fetchedMemories = Array.isArray(json.memories) ? json.memories : []

        const finalMemories = fetchedMemories.length
          ? fetchedMemories
          : (await AlgorandService.getMemoriesForUser(activeAccount.address))

        const formattedMemories = finalMemories.map((m: any) => ({
          id: Number(m.id ?? m.timestamp),
          name: m.name,
          date: new Date(m.timestamp).toISOString().split('T')[0],
          encrypted: true,
          type: m.fileType,
          size: (m.fileSize / (1024 * 1024)).toFixed(1) + ' MB',
          cid: m.cid,
          encryptedAESKey: m.encryptedAESKey,
          iv: m.iv,
          owner: m.owner, // ⭐ ensure owner is carried
        }))

        setMemories(formattedMemories)
      } catch (error) {
        console.error('Error loading memories (API fallback):', error)
      }
    }

    loadMemories()
  }, [activeAccount])

  const handleUploadSuccess = async () => {
    if (!activeAccount) return
    try {
      const res = await fetch(`/api/memories/for-user?viewer=${encodeURIComponent(activeAccount.address)}`)
      const json = await res.json()
      const fetchedMemories = Array.isArray(json.memories) ? json.memories : []

      const finalMemories = fetchedMemories.length
        ? fetchedMemories
        : (await AlgorandService.getMemoriesForUser(activeAccount.address))

      const formattedMemories = finalMemories.map((m: any) => ({
        id: Number(m.id ?? m.timestamp),
        name: m.name,
        date: new Date(m.timestamp).toISOString().split('T')[0],
        encrypted: true,
        type: m.fileType,
        size: (m.fileSize / (1024 * 1024)).toFixed(1) + ' MB',
        cid: m.cid,
        encryptedAESKey: m.encryptedAESKey,
        iv: m.iv,
        owner: m.owner, // ⭐ keep owner
      }))
      setMemories(formattedMemories)
    } catch (err) {
      console.error('Failed to refresh:', err)
    }
  }

  const handleViewMemory = (memory: any) => {
    setSelectedMemory(memory)
    setShowViewModal(true)
  }

  const short = (addr: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Unknown'

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Your Vault</h1>
            <p className="text-muted-foreground">Manage your encrypted memories securely</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowAccessControl(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-secondary/50 transition-all"
            >
              <Users size={20} />
              Family Access
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg"
            >
              <Plus size={20} />
              Upload Memory
            </button>
          </div>
        </div>

        {/* Stats */}
        <VaultStats memories={memories} />

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 mt-8">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}`}
            >
              <Grid3x3 size={20} />
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`p-3 rounded-lg ${viewMode === "timeline" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80"}`}
            >
              <Clock size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock size={16} />
            <span>All memories encrypted with AES-256</span>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <div className="grid md:grid-cols-3 gap-6">
            {memories.map((memory, index) => (
              <div
                key={memory.id || index}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
              >
                {/* Encrypted Preview */}
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <Lock className="text-primary/40" size={48} />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold mb-1 truncate">{memory.name}</h3>
                  <p className="text-sm text-muted-foreground">{memory.date}</p>

                  {/* ⭐ NEW — Owner Label */}
                  <p className="text-xs text-muted-foreground mt-1">
                    From:{" "}
                    {memory.owner === activeAccount?.address
                      ? <span className="text-primary font-semibold">Self</span>
                      : short(memory.owner)}
                  </p>

                  <p className="text-xs text-muted-foreground mb-4">{memory.size}</p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewMemory(memory)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                    >
                      <Eye size={16} />
                      Decrypt
                    </button>
                    <button className="px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TIMELINE VIEW */}
        {viewMode === "timeline" && (
          <div className="space-y-8">
            {memories.map((memory, index) => (
              <div key={memory.id || index} className="flex gap-6">
                
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  {index < memories.length - 1 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-primary/50 to-primary/10 mt-2" />
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all">
                    
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{memory.name}</h3>
                        <p className="text-sm text-muted-foreground">{memory.date}</p>

                        {/* ⭐ NEW — Owner Label */}
                        <p className="text-xs text-muted-foreground mt-1">
                          From:{" "}
                          {memory.owner === activeAccount?.address
                            ? <span className="text-primary font-semibold">Self</span>
                            : short(memory.owner)}
                        </p>

                        <p className="text-xs text-muted-foreground mt-1">
                          {memory.size}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                        <Lock size={14} className="text-primary" />
                        <span className="text-xs text-primary font-medium">Encrypted</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewMemory(memory)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
                      >
                        <Eye size={16} />
                        Decrypt & View
                      </button>

                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary/50">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showUploadModal && (
        <VaultUploadModal 
          onCloseAction={() => setShowUploadModal(false)}
          onUploadSuccessAction={handleUploadSuccess}
        />
      )}

      {showAccessControl && (
        <VaultAccessControl onClose={() => setShowAccessControl(false)} />
      )}

      {showViewModal && selectedMemory && (
        <VaultViewModal
          memory={selectedMemory}
          onCloseAction={() => {
            setShowViewModal(false)
            setSelectedMemory(null)
          }}
        />
      )}
    </main>
  )
}
