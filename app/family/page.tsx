"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2, Users } from "lucide-react"

export default function FamilyPage() {
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      relation: "Father",
      walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e1b",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Doe",
      relation: "Mother",
      walletAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      status: "active",
    },
    {
      id: 3,
      name: "Alice Smith",
      relation: "Sister",
      walletAddress: "0x1234567890123456789012345678901234567890",
      status: "pending",
    },
  ])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-2">Family Tree</h1>
            <p className="text-muted-foreground">Manage family members and access permissions</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg">
            <Plus size={20} />
            Add Member
          </button>
        </div>

        {/* Tree Visualization */}
        <div className="mb-12 bg-card border border-border rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-8">Your Family Structure</h2>
          <div className="flex flex-col items-center gap-8">
            {/* Root */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white shadow-lg">
                <div className="text-center">
                  <Users size={40} className="mx-auto mb-2" />
                  <span className="text-sm font-semibold">You</span>
                </div>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="w-1 h-12 bg-gradient-to-b from-primary/50 to-primary/10" />

            {/* Family Members Grid */}
            <div className="grid md:grid-cols-3 gap-8 w-full">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center">
                  {/* Line from center */}
                  <div className="w-1 h-8 bg-primary/30 mb-4" />

                  {/* Member Card */}
                  <div className="w-full bg-gradient-to-br from-card to-secondary/30 border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={32} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.relation}</p>
                    <p className="text-xs text-muted-foreground font-mono mb-4 truncate">{member.walletAddress}</p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {member.status === "active" ? "Active" : "Pending"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                        <Edit2 size={16} className="mx-auto" />
                      </button>
                      <button className="flex-1 p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                        <Trash2 size={16} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold">Family Members</h2>
          </div>
          <div className="divide-y divide-border">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.relation}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate">{member.walletAddress}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.status === "active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {member.status === "active" ? "Active" : "Pending"}
                  </span>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
