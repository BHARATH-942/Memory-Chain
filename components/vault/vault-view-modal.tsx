'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, Lock, Download } from 'lucide-react'
import { EncryptionService } from '@/lib/encryption'
import { IPFSService } from '@/lib/ipfs'

interface VaultViewModalProps {
  memory: {
    id: string | number
    name: string
    cid: string
    encryptedAESKey: string
    iv: string
    type: string
  }
  onCloseAction: () => void
}

export default function VaultViewModal({ memory, onCloseAction }: VaultViewModalProps) {
  const [decrypting, setDecrypting] = useState(true)
  const [decryptedUrl, setDecryptedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    decryptAndDisplay()
  }, [])

  const decryptAndDisplay = async () => {
    try {
      setDecrypting(true)
      setError(null)

      // Step 1: Download encrypted file from IPFS
      console.log('Downloading from IPFS:', memory.cid)
      const encryptedData = await IPFSService.downloadFromIPFS(memory.cid)

      // Step 2: Get AES key (simplified - decode from base64)
      // In production, this should be decrypted with private key
      const aesKey = EncryptionService.base64ToBytes(memory.encryptedAESKey)
      const iv = EncryptionService.base64ToBytes(memory.iv)

      // Step 3: Decrypt file
      console.log('Decrypting file...')
      const decryptedData = await EncryptionService.decryptFile(
        encryptedData,
        aesKey,
        iv
      )

      if (!decryptedData) {
        throw new Error('Decryption failed')
      }

      // Step 4: Create blob URL for display
      const mimeType = memory.type === 'image' ? 'image/jpeg' : 'video/mp4'
      const blob = new Blob([decryptedData], { type: mimeType })
      const url = URL.createObjectURL(blob)
      
      setDecryptedUrl(url)
    } catch (err) {
      console.error('Decryption error:', err)
      setError(err instanceof Error ? err.message : 'Decryption failed')
    } finally {
      setDecrypting(false)
    }
  }

  const handleDownload = () => {
    if (!decryptedUrl) return
    
    const a = document.createElement('a')
    a.href = decryptedUrl
    a.download = memory.name || 'memory'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <Lock className="text-primary" size={20} />
            <h2 className="text-xl font-bold">{memory.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            {decryptedUrl && (
              <button
                onClick={handleDownload}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Download"
              >
                <Download size={20} />
              </button>
            )}
            <button
              onClick={onCloseAction}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {decrypting && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin text-primary mb-4" size={48} />
              <p className="text-sm text-muted-foreground">Decrypting memory...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md">
                <p className="text-destructive font-medium mb-2">Decryption Failed</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {decryptedUrl && (
            <div className="flex justify-center">
              {memory.type === 'image' ? (
                <img
                  src={decryptedUrl}
                  alt={memory.name}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <video
                  src={decryptedUrl}
                  controls
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 bg-secondary/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock size={16} className="text-primary" />
            <span>This memory was decrypted locally on your device</span>
          </div>
        </div>
      </div>
    </div>
  )
}
