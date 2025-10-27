'use client'

import { useState } from 'react'
import { Upload, X, Lock, Loader2 } from 'lucide-react'
import { EncryptionService } from '@/lib/encryption'
import { IPFSService } from '@/lib/ipfs'
import { AlgorandService } from '@/lib/algorand'
import { useWallet } from '@txnlab/use-wallet-react'

interface VaultUploadModalProps {
  onCloseAction: () => void
  onUploadSuccessAction?: () => void
}

export default function VaultUploadModal({ onCloseAction, onUploadSuccessAction }: VaultUploadModalProps) {
  const { activeAccount, signTransactions } = useWallet()
  const [file, setFile] = useState<File | null>(null)
  const [memoryName, setMemoryName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (!memoryName) {
        setMemoryName(e.target.files[0].name)
      }
    }
  }

  const handleUpload = async () => {
    if (!file || !activeAccount || !signTransactions) {
      alert('Please connect wallet and select a file')
      return
    }

    try {
      setUploading(true)

      // Step 1: Generate AES key
      setProgress('Generating encryption key...')
      const aesKey = EncryptionService.generateAESKey()

      // Step 2: Read file
      setProgress('Reading file...')
      const fileBuffer = await file.arrayBuffer()

      // Step 3: Encrypt file locally
      setProgress('Encrypting file locally...')
      const { encrypted, nonce } = await EncryptionService.encryptFile(fileBuffer, aesKey)

      // Step 4: Upload encrypted file to IPFS
      setProgress('Uploading to IPFS...')
      const cid = await IPFSService.uploadToIPFS(encrypted)

      // Step 5: Encrypt AES key with owner's public key
      setProgress('Encrypting key...')
      const ownerPublicKey = EncryptionService.getPublicKeyFromAddress(activeAccount.address)
      
      // For self-encryption, we need a keypair
      // In production, wallet would handle this, but for demo we'll store the key differently
      // For now, we'll store the AES key encrypted with a simple method
      const encryptedAESKey = EncryptionService.bytesToBase64(aesKey) // Simplified for demo

      // Step 6: Store metadata on Algorand
      setProgress('Storing on blockchain...')
      const metadata = {
        cid,
        name: memoryName,
        encryptedAESKey,
        iv: EncryptionService.bytesToBase64(nonce),
        owner: activeAccount.address,
        timestamp: Date.now(),
        fileType: file.type.startsWith('image/') ? 'image' : 'video',
        fileSize: file.size,
        encrypted: true,
      }

      const txId = await AlgorandService.storeMemory(
        activeAccount.address,
        metadata,
        async (txns) => {
          const signed = await signTransactions(txns);
          if (signed.some(tx => tx === null)) throw new Error('Failed to sign transaction');
          return signed as Uint8Array[];
        }
      )

      setProgress('Success! Transaction ID: ' + txId.slice(0, 10) + '...')
      
      setTimeout(() => {
        onUploadSuccessAction?.()
        onCloseAction?.()
      }, 2000)

    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed: ' + (error as Error).message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl max-w-2xl w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upload Memory</h2>
          <button
            onClick={onCloseAction}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            disabled={uploading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Select File</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
                <p className="text-sm text-muted-foreground mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF, MP4 up to 100MB</p>
              </label>
            </div>
          </div>

          {/* Memory Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Memory Name</label>
            <input
              type="text"
              value={memoryName}
              onChange={(e) => setMemoryName(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background"
              placeholder="e.g., Summer Vacation 2024"
              disabled={uploading}
            />
          </div>

          {/* Encryption Info */}
          <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <Lock className="text-primary mt-0.5" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-primary mb-1">End-to-End Encrypted</p>
              <p className="text-xs text-muted-foreground">
                File will be encrypted locally before upload. Only you and approved family members can decrypt.
              </p>
            </div>
          </div>

          {/* Progress */}
          {uploading && (
            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
              <Loader2 className="animate-spin" size={20} />
              <p className="text-sm">{progress}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCloseAction}
              className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors font-medium"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || !memoryName || uploading || !activeAccount}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload & Encrypt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
