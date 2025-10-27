"use client"

import { X, Plus, Trash2, Shield } from "lucide-react"
import { useState } from "react"

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
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1b",
      role: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "John Smith",
      walletAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      role: "viewer",
      status: "active",
    },
    {
      id: 3,
      name: "Emma Davis",
      walletAddress: "0x1234567890123456789012345678901234567890",
      role: "editor",
      status: "pending",
    },
  ])

  const [newWalletAddress, setNewWalletAddress] = useState("")
  const [newRole, setNewRole] = useState<"viewer" | "editor" | "admin">("viewer")

  const handleAddMember = () => {
    if (newWalletAddress && /^0x[a-fA-F0-9]{40}$/.test(newWalletAddress)) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: `${newWalletAddress.slice(0, 6)}...${newWalletAddress.slice(-4)}`,
          walletAddress: newWalletAddress,
          role: newRole,
          status: "pending",
        },
      ])
      setNewWalletAddress("")
    }
  }

  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((m) => m.id !== id))
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
              placeholder="Enter wallet address (0x...)"
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
            >
              <Plus size={18} />
              Add
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Enter a valid Ethereum/Algorand wallet address (42 characters starting with 0x)
          </p>
        </div>

        {/* Members List */}
        <div className="space-y-3">
          <h3 className="font-semibold mb-4">Current Members</h3>
          {members.map((member) => (
            <div
              key={member.id}
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
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
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
      </div>
    </div>
  )
}
