"use client"

import { BarChart3, Lock, Users, Clock } from "lucide-react"

interface Memory {
  id: number
  name: string
  date: string
  encrypted: boolean
  type: string
  size: string
}

interface VaultStatsProps {
  memories: Memory[]
}

export default function VaultStats({ memories }: VaultStatsProps) {
  const totalSize = memories.reduce((acc, m) => {
    const sizeNum = Number.parseFloat(m.size)
    const isMB = m.size.includes("MB")
    return acc + (isMB ? sizeNum : sizeNum * 1024)
  }, 0)

  const videoCount = memories.filter((m) => m.type === "video").length
  const imageCount = memories.filter((m) => m.type === "image").length

  const formatSize = (mb: number) => {
    if (mb > 1024) {
      return `${(mb / 1024).toFixed(1)} GB`
    }
    return `${mb.toFixed(1)} MB`
  }

  const stats = [
    {
      label: "Total Memories",
      value: memories.length,
      icon: BarChart3,
      color: "from-primary/10 to-primary/5",
    },
    {
      label: "Storage Used",
      value: formatSize(totalSize),
      icon: Lock,
      color: "from-accent/10 to-accent/5",
    },
    {
      label: "Videos",
      value: videoCount,
      icon: Clock,
      color: "from-secondary/10 to-secondary/5",
    },
    {
      label: "Family Members",
      value: "3",
      icon: Users,
      color: "from-primary/10 to-accent/5",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} border border-border rounded-xl p-6 hover:border-primary/50 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon className="text-primary" size={20} />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
