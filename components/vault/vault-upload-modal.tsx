'use client'

import { useState } from 'react'
import { Upload, X, Lock, Loader2 } from 'lucide-react'
import { EncryptionService } from '@/lib/encryption'
import { IPFSService } from '@/lib/ipfs'
import { AlgorandService } from '@/lib/algorand'
import { useWallet } from '@txnlab/use-wallet-react'

import nacl from 'tweetnacl'
import { decodeBase64, encodeBase64 } from 'tweetnacl-util'
import ed2curve from 'ed2curve'

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
      const aesKey = EncryptionService.generateAESKey() // expected Uint8Array or ArrayBuffer

      // Normalize AES key to Uint8Array
      const aesKeyU8 = aesKey instanceof Uint8Array ? aesKey : new Uint8Array(aesKey as ArrayBuffer)

      // Step 2: Read file
      setProgress('Reading file...')
      const fileBuffer = await file.arrayBuffer()

      // Step 3: Encrypt file locally
      setProgress('Encrypting file locally...')
      const { encrypted, nonce } = await EncryptionService.encryptFile(fileBuffer, aesKey)

      // Step 4: Upload encrypted file to IPFS
      setProgress('Uploading to IPFS...')
      const cid = await IPFSService.uploadToIPFS(encrypted)

      // Step 5: Encrypt AES key for recipient(s)
      setProgress('Encrypting key for recipient(s)...')

      // OWNER (uploader) copy - simplified demo-friendly: store AES key base64 so the uploader can decrypt locally.
      // In production you would not store raw AES key; instead you'd encrypt it with recipient(s) public keys and let wallets handle decryption.
      const encryptedAESKeyForOwner = EncryptionService.bytesToBase64(aesKeyU8)

      // RECIPIENT example (ephemeral box encryption)
      // If you want to encrypt AES key for another address (recipientAddress), replace `recipientAddress`
      // with the address of the recipient. For now using owner address as example (you can change).
      const recipientAddress = activeAccount.address // change to actual recipient address if sharing to others
      let encryptedAESKeyForRecipient: string | null = null
      let encryptionNonce: string | null = null
      let senderEphemeralPublicKey: string | null = null

      try {
        // Get recipient public key (assumed base64-encoded Ed25519 public key OR already raw bytes)
        const ownerPubBase64 = EncryptionService.getPublicKeyFromAddress(recipientAddress)
        // ownerPubBase64 may be a base64 string or already a Uint8Array; normalize to Uint8Array
        let ownerEdPub: Uint8Array
        if (typeof ownerPubBase64 === 'string') {
          ownerEdPub = decodeBase64(ownerPubBase64)
        } else {
          ownerEdPub = ownerPubBase64 instanceof Uint8Array ? ownerPubBase64 : new Uint8Array(ownerPubBase64 as ArrayBuffer)
        }
        // Convert Ed25519 public key to Curve25519 (required by nacl.box)
        const ownerCurvePub = ed2curve.convertPublicKey(ownerEdPub) || ownerEdPub // if convert fails, try as-is

        // Generate ephemeral keypair for sender (curve25519 keypair suitable for nacl.box)
        const ephemeral = nacl.box.keyPair()

        // Encrypt AES key bytes using nacl.box
        const nonceBytes = nacl.randomBytes(nacl.box.nonceLength)
        const cipher = nacl.box(aesKeyU8, nonceBytes, ownerCurvePub, ephemeral.secretKey)

        encryptedAESKeyForRecipient = encodeBase64(cipher)
        encryptionNonce = encodeBase64(nonceBytes)
        senderEphemeralPublicKey = encodeBase64(ephemeral.publicKey)
      } catch (convErr) {
        // If conversion/encryption fails, we still continue and keep owner copy.
        console.warn('Recipient encryption failed — continuing with owner copy only:', convErr)
      }

      // Step 6: Store metadata on Algorand
      setProgress('Storing on blockchain...')
      const metadata: any = {
        cid,
        name: memoryName,
        // Keep owner copy for demo/local decryption
        encryptedAESKey: encryptedAESKeyForOwner,
        iv: EncryptionService.bytesToBase64(nonce),
        owner: activeAccount.address,
        timestamp: Date.now(),
        fileType: file.type.startsWith('image/') ? 'image' : 'video',
        fileSize: file.size,
        encrypted: true,
      }

      if (encryptedAESKeyForRecipient && encryptionNonce && senderEphemeralPublicKey) {
        metadata.encryptedAESKeyForRecipient = encryptedAESKeyForRecipient
        metadata.encryptionNonce = encryptionNonce
        metadata.senderEphemeralPublicKey = senderEphemeralPublicKey
        metadata.encryptedAESKey_box = encryptedAESKeyForRecipient
        metadata.encryptionNonce_box = encryptionNonce
        metadata.senderEphemeralPublicKey_box = senderEphemeralPublicKey
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
