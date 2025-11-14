'use client'
import { useEffect, useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'

export function useVisibleMemories() {
  const { activeAccount } = useWallet()
  const [memories, setMemories] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!activeAccount?.address) return
    setLoading(true)
    fetch(`/api/memories/for-user?viewer=${encodeURIComponent(activeAccount.address)}`)
      .then(r => r.json())
      .then(j => {
        setMemories(Array.isArray(j.memories) ? j.memories : [])
      })
      .catch(err => {
        console.error(err)
        setMemories([])
      })
      .finally(() => setLoading(false))
  }, [activeAccount?.address])

  return { memories, loading }
}
