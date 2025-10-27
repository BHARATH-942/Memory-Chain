"use client"

import { useState } from "react"
import { Clock, AlertCircle, CheckCircle2, Plus, Edit2 } from "lucide-react"

export default function LegacyPage() {
  const [legacySetup, setLegacySetup] = useState({
    inactivityDays: 365,
    heirs: [
      { id: 1, name: "John Doe", address: "0x1234...5678", status: "confirmed" },
      { id: 2, name: "Jane Doe", address: "0x8765...4321", status: "pending" },
    ],
    enabled: true,
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">Legacy Transfer</h1>
          <p className="text-muted-foreground">Set up automatic access transfer to your heirs</p>
        </div>

        {/* Status Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-primary" size={24} />
              <h3 className="font-semibold">Inactivity Period</h3>
            </div>
            <p className="text-3xl font-bold">{legacySetup.inactivityDays}</p>
            <p className="text-sm text-muted-foreground mt-2">days until legacy transfer</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="text-accent" size={24} />
              <h3 className="font-semibold">Heirs Configured</h3>
            </div>
            <p className="text-3xl font-bold">{legacySetup.heirs.length}</p>
            <p className="text-sm text-muted-foreground mt-2">designated heirs</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className={legacySetup.enabled ? "text-accent" : "text-muted-foreground"} size={24} />
              <h3 className="font-semibold">Status</h3>
            </div>
            <p className="text-3xl font-bold">{legacySetup.enabled ? "Active" : "Inactive"}</p>
            <p className="text-sm text-muted-foreground mt-2">legacy mode</p>
          </div>
        </div>

        {/* Setup Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Inactivity Settings */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Inactivity Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Days of Inactivity</label>
                <input
                  type="number"
                  value={legacySetup.inactivityDays}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setLegacySetup({ ...legacySetup, inactivityDays: Number.parseInt(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  After this period of no activity, your vault will be transferred to designated heirs
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <AlertCircle className="text-accent flex-shrink-0" size={20} />
                <p className="text-sm">
                  Your activity is tracked automatically. Any login resets the inactivity counter.
                </p>
              </div>

              <button className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all">
                Save Settings
              </button>
            </div>
          </div>

          {/* Legacy Flow Diagram */}
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: "You Set Inactivity Period", desc: "Configure how long before transfer triggers" },
                { step: 2, title: "Activity Monitored", desc: "System tracks your login activity" },
                { step: 3, title: "Threshold Reached", desc: "After inactivity period, transfer begins" },
                { step: 4, title: "Heirs Notified", desc: "Designated heirs receive access notification" },
                { step: 5, title: "Access Transferred", desc: "Vault keys re-encrypted for heirs" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heirs Management */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-2xl font-bold">Designated Heirs</h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all">
              <Plus size={18} />
              Add Heir
            </button>
          </div>

          <div className="divide-y divide-border">
            {legacySetup.heirs.map((heir) => (
              <div
                key={heir.id}
                className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <h3 className="font-semibold mb-1">{heir.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{heir.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      heir.status === "confirmed" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {heir.status === "confirmed" ? "Confirmed" : "Pending"}
                  </span>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Edit2 size={18} />
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
