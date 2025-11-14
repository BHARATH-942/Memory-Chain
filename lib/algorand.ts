// lib/algorand.ts
import algosdk from 'algosdk'
import { MemoryMetadata } from './types'

export class AlgorandService {
  private static algodClient = new algosdk.Algodv2(
    '',
    'https://testnet-api.algonode.cloud',
    443
  )

  /**
   * Store memory metadata on Algorand blockchain
   */
  static async storeMemory(
    walletAddress: string,
    metadata: MemoryMetadata,
    signTransactions: (txns: any[]) => Promise<Uint8Array[]>
  ): Promise<string> {
    try {
      // Get suggested params
      const suggestedParams = await this.algodClient.getTransactionParams().do()

      // Create note with metadata (JSON stored in transaction note)
      const note = new TextEncoder().encode(JSON.stringify({
        cid: metadata.cid,
        name: metadata.name,
        encryptedAESKey: metadata.encryptedAESKey,
        iv: metadata.iv,
        timestamp: metadata.timestamp,
        fileType: metadata.fileType,
        fileSize: metadata.fileSize,
      }))

      // Create transaction (send 0 ALGO to self with metadata in note)
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: walletAddress,
        receiver: walletAddress,
        amount: 0,
        note: note,
        suggestedParams,
      })

      // Sign transaction via wallet
      const signedTxns = await signTransactions([txn])

      // Send transaction
      const { txid } = await this.algodClient.sendRawTransaction(signedTxns).do()

      // Wait for confirmation
      await algosdk.waitForConfirmation(this.algodClient, txid, 4)

      return txid
    } catch (error) {
      console.error('Error storing memory on blockchain:', error)
      throw error
    }
  }

  /**
   * Helper: decode base64 note to UTF-8 string in both Node and browser envs
   */
  private static base64ToString(b64: string): string {
    try {
      if (typeof Buffer !== 'undefined') {
        return Buffer.from(b64, 'base64').toString('utf-8')
      }
      // browser fallback
      const binary = atob(b64)
      const bytes = new Uint8Array(binary.length)
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
      return new TextDecoder().decode(bytes)
    } catch (e) {
      // last resort: return atob result (may be raw)
      try {
        return atob(b64)
      } catch {
        return ''
      }
    }
  }

  /**
   * Retrieve all memories for a user from blockchain
   */
  static async getMemoriesForUser(address: string): Promise<MemoryMetadata[]> {
    try {
      const indexerClient = new algosdk.Indexer(
        '',
        'https://testnet-idx.algonode.cloud',
        443
      )

      // Search for transactions from this address to itself (our memory storage method)
      const txns = await indexerClient
        .searchForTransactions()
        .address(address)
        .addressRole('sender')
        .do()

      const memories: MemoryMetadata[] = []

      for (const txn of txns.transactions) {
        // Only process transactions with notes and sent to self
        if (txn.note && txn.sender === txn.paymentTransaction?.receiver) {
          try {
            let noteText: string
            if (typeof txn.note === 'string') {
              // note is base64-encoded string
              noteText = AlgorandService.base64ToString(txn.note)
            } else {
              // note is already a Uint8Array (decoded bytes)
              noteText = new TextDecoder().decode(txn.note as Uint8Array)
            }

            const metadata = JSON.parse(noteText)

            // Spread parsed metadata into the memory object
            memories.push({
              id: txn.id,
              owner: address,
              encrypted: true,
              ...metadata,
            })
          } catch (e) {
            // Skip invalid/parse-failing notes
            continue
          }
        }
      }

      // If metadata may not contain timestamp, handle gracefully
      return memories.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))
    } catch (error) {
      console.error('Error fetching memories:', error)
      return []
    }
  }
}

/**
 * Convenience wrapper used by server API route
 * (so route can import { getMemoriesForOwner } from '@/lib/algorand')
 */
export async function getMemoriesForOwner(ownerAddress: string): Promise<any[]> {
  try {
    return await AlgorandService.getMemoriesForUser(ownerAddress)
  } catch (e) {
    console.error('getMemoriesForOwner error:', e)
    return []
  }
}
