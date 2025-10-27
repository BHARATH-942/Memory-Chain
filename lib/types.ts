export interface MemoryMetadata {
  id?: string
  cid: string // IPFS hash
  name: string
  encryptedAESKey: string // Base64 encoded
  iv: string // Base64 encoded initialization vector
  owner: string // Algorand address
  timestamp: number
  fileType: string // 'image' | 'video'
  fileSize: number
  encrypted: boolean
}

export interface MemoryWithAccess extends MemoryMetadata {
  allowedViewers?: {
    address: string
    relationship: string
    encryptedAESKey: string
  }[]
}
