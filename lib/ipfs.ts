export class IPFSService {
  private static PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY!
  private static PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY!
  private static PINATA_GATEWAY = 'https://gateway.pinata.cloud'

  /**
   * Upload encrypted file to IPFS via Pinata
   */
  static async uploadToIPFS(encryptedData: Uint8Array): Promise<string> {
    const formData = new FormData()
    
    // Convert to regular array then to Blob
    const blob = new Blob([new Uint8Array(encryptedData)], { 
      type: 'application/octet-stream' 
    })
    
    formData.append('file', blob, 'encrypted-memory.bin')

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: this.PINATA_API_KEY,
        pinata_secret_api_key: this.PINATA_SECRET_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`IPFS upload failed: ${response.statusText} - ${error}`)
    }

    const data = await response.json()
    return data.IpfsHash
  }

  /**
   * Download encrypted file from IPFS
   */
  static async downloadFromIPFS(cid: string): Promise<Uint8Array> {
    const response = await fetch(`${this.PINATA_GATEWAY}/ipfs/${cid}`)
    
    if (!response.ok) {
      throw new Error(`IPFS download failed: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  }
}
