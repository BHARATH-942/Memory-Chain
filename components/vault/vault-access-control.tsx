  'use client'

import { X, Plus, Trash2, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { useWallet } from '@txnlab/use-wallet-react'

interface VaultAccessControlProps {
  onClose: () => void
}

interface FamilyMember {
  id: number
  name: string
  walletAddress: string
  role: "viewer" | "editor" | "admin"
  status: "active" | "pending"
}

export default function VaultAccessControl({ onClose }: VaultAccessControlProps) {
  const { activeAccount } = useWallet()
  const ownerAddress = activeAccount?.address ?? ''

  const [members, setMembers] = useState<FamilyMember[]>([])
  const [newWalletAddress, setNewWalletAddress] = useState("")
  const [newRole, setNewRole] = useState<"viewer" | "editor" | "admin">("viewer")
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    // Load members for connected owner
    const fetchMembers = async () => {
      if (!ownerAddress) {
        setMembers([])
        return
      }
      setLoading(true)
      try {
        const res = await fetch(`/api/family/list?owner=${encodeURIComponent(ownerAddress)}`)
        const json = await res.json()
        const arr: string[] = Array.isArray(json.members) ? json.members : []
        // Map simple addresses to FamilyMember shape (retain roles/status as defaults)
        const mapped = arr.map((addr, i) => ({
          id: i + 1,
          name: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
          walletAddress: addr,
          role: 'viewer' as const,
          status: 'active' as const,
        }))
        setMembers(mapped)
      } catch (err) {
        console.error('Failed to load members', err)
        setMsg('Failed to load members')
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [ownerAddress])

  const handleAddMember = async () => {
    setMsg(null)
    if (!ownerAddress) {
      setMsg('Connect wallet as owner first')
      return
    }
    const member = newWalletAddress.trim()
    if (!member) {
      setMsg('Enter a wallet address')
      return
    }

    // Optionally validate basic address length / pattern loosely (Algorand or Eth)
    // We'll not block by strict pattern to support both address formats
    try {
      setLoading(true)
      const res = await fetch('/api/family/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner: ownerAddress, member })
      })
      const json = await res.json()
      if (json.ok) {
        // update members UI from server response if present
        const arr: string[] = Array.isArray(json.members) ? json.members : []
        const mapped = arr.map((addr, i) => ({
          id: i + 1,
          name: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
          walletAddress: addr,
          role: newRole,
          status: 'pending' as const,
        }))
        setMembers(mapped)
        setNewWalletAddress('')
        setMsg('Member added')
      } else {
        setMsg(json.error || 'Add failed')
      }
    } catch (err) {
      console.error('Add member failed', err)
      setMsg('Add failed')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveMember = async (walletAddressToRemove: string) => {
    if (!ownerAddress) {
      setMsg('Connect wallet as owner first')
      return
    }
    try {
      setLoading(true)
      const res = await fetch('/api/family/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ owner: ownerAddress, member: walletAddressToRemove })
      })
      const json = await res.json()
      if (json.ok) {
        const arr: string[] = Array.isArray(json.members) ? json.members : []
        const mapped = arr.map((addr, i) => ({
          id: i + 1,
          name: `${addr.slice(0, 6)}...${addr.slice(-4)}`,
          walletAddress: addr,
          role: 'viewer' as const,
          status: 'active' as const,
        }))
        setMembers(mapped)
        setMsg('Member removed')
      } else {
        setMsg(json.error || 'Remove failed')
      }
    } catch (err) {
      console.error('Remove member failed', err)
      setMsg('Remove failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Family Access Control</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary/50 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Add Member Section */}
        <div className="bg-secondary/30 rounded-xl p-6 mb-6">
          <h3 className="font-semibold mb-4">Invite Family Member</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter wallet address (0x... or Algorand address)"
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as "viewer" | "editor" | "admin")}
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleAddMember}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
              disabled={loading}
            >
              <Plus size={18} />
              Add
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Enter a wallet address (Ethereum or Algorand)
          </p>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          <h3 className="font-semibold mb-4">Current Members</h3>
          {loading && <div className="text-sm">Loading...</div>}
          {!loading && members.length === 0 && <div className="text-sm text-muted-foreground">No members yet</div>}
          <ul className="space-y-2">
            {members.map((member) => (
              <li
                key={member.walletAddress}
                className="flex items-center justify-between p-4 bg-secondary/20 border border-border rounded-lg hover:border-primary/50 transition-all"
              >
                <div className="flex-1">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground font-mono">{member.walletAddress}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-primary" />
                    <span className="text-sm font-medium capitalize">{member.role}</span>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      member.status === "active" ? "bg-green-500/20 text-green-700" : "bg-yellow-500/20 text-yellow-700"
                    }`}
                  >
                    {member.status === "active" ? "Active" : "Pending"}
                  </span>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(member.walletAddress)
                    }}
                    className="p-2 hover:bg-secondary/20 rounded-lg transition-colors text-xs mr-2"
                    title="Copy address"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => handleRemoveMember(member.walletAddress)}
                    className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                    title="Remove member"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Role Descriptions */}
        <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
          <p className="font-semibold mb-3">Role Permissions:</p>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Viewer:</span> Can view and decrypt memories only
            </p>
            <p>
              <span className="font-medium">Editor:</span> Can view, decrypt, and organize memories
            </p>
            <p>
              <span className="font-medium">Admin:</span> Full access including member management
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors font-medium"
          >
            Close
          </button>
        </div>

        {msg && <div className="mt-3 text-sm text-muted-foreground">{msg}</div>}
      </div>
    </div>
  )
}
