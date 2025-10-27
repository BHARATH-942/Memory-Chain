import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'
import algosdk from 'algosdk'

export class EncryptionService {
  /**
   * Generate a random AES-256 key (using NaCl secretbox key - 32 bytes)
   */
  static generateAESKey(): Uint8Array {
    return nacl.randomBytes(32) // 256-bit key
  }

  /**
   * Generate random nonce (24 bytes for NaCl)
   */
  static generateNonce(): Uint8Array {
    return nacl.randomBytes(24)
  }

  /**
   * Encrypt file data with symmetric key (NaCl secretbox)
   * @param fileData - File as ArrayBuffer
   * @param aesKey - 32-byte symmetric key
   * @returns { encrypted: Uint8Array, nonce: Uint8Array }
   */
  static async encryptFile(
    fileData: ArrayBuffer,
    aesKey: Uint8Array
  ): Promise<{ encrypted: Uint8Array; nonce: Uint8Array }> {
    const nonce = this.generateNonce()
    const fileBytes = new Uint8Array(fileData)
    
    // Encrypt with NaCl secretbox
    const encrypted = nacl.secretbox(fileBytes, nonce, aesKey)
    
    return { encrypted, nonce }
  }

  static async decryptFile(
    encryptedData: Uint8Array,
    aesKey: Uint8Array,
    nonce: Uint8Array
  ): Promise<Uint8Array> {  // Return Uint8Array, not ArrayBuffer
    const decrypted = nacl.secretbox.open(encryptedData, nonce, aesKey)
    
    if (!decrypted) {
      throw new Error('Decryption failed - invalid key or corrupted data')
    }
    
    return decrypted
  }

  /**
   * Encrypt AES key with recipient's public key (NaCl box)
   * @param aesKey - The symmetric key to encrypt
   * @param recipientPublicKey - Recipient's Ed25519 public key (32 bytes)
   * @param senderSecretKey - Sender's Ed25519 secret key (64 bytes)
   * @returns Encrypted key + nonce as base64
   */
  static encryptAESKeyForRecipient(
    aesKey: Uint8Array,
    recipientPublicKey: Uint8Array,
    senderSecretKey: Uint8Array
  ): string {
    const nonce = this.generateNonce()
    
    // Encrypt the AES key with public key encryption
    const encrypted = nacl.box(
      aesKey,
      nonce,
      recipientPublicKey,
      senderSecretKey
    )
    
    // Combine nonce + encrypted data
    const combined = new Uint8Array(nonce.length + encrypted.length)
    combined.set(nonce)
    combined.set(encrypted, nonce.length)
    
    return naclUtil.encodeBase64(combined)
  }

  /**
   * Decrypt AES key with recipient's private key
   * @param encryptedAESKey - Base64 encoded encrypted key
   * @param senderPublicKey - Sender's public key
   * @param recipientSecretKey - Recipient's secret key
   * @returns Decrypted AES key
   */
  static decryptAESKeyFromSender(
    encryptedAESKey: string,
    senderPublicKey: Uint8Array,
    recipientSecretKey: Uint8Array
  ): Uint8Array | null {
    const combined = naclUtil.decodeBase64(encryptedAESKey)
    
    // Extract nonce and encrypted data
    const nonce = combined.slice(0, 24)
    const encrypted = combined.slice(24)
    
    // Decrypt the AES key
    const decrypted = nacl.box.open(
      encrypted,
      nonce,
      senderPublicKey,
      recipientSecretKey
    )
    
    return decrypted
  }

  /**
   * Get public key from Algorand address
   */
  static getPublicKeyFromAddress(address: string): Uint8Array {
    return algosdk.decodeAddress(address).publicKey
  }

  /**
   * Convert bytes to base64
   */
  static bytesToBase64(bytes: Uint8Array): string {
    return naclUtil.encodeBase64(bytes)
  }

  /**
   * Convert base64 to bytes
   */
  static base64ToBytes(base64: string): Uint8Array {
    return naclUtil.decodeBase64(base64)
  }
}
