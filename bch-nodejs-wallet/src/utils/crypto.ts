import * as crypto from 'crypto';

export function encryptValue(value: string): string {
    // Generate a random initialization vector (IV) and key
    const iv = crypto.randomBytes(16);
    const key = crypto.randomBytes(32);

    // Create a new Cipher object
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the value
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Write the encrypted text, IV, and key to a file
    return `${encrypted}\n${iv.toString('hex')}\n${key.toString('hex')}`;
}

export function decryptValue(encrypted: string): string {
    // Split the encrypted text, IV, and key
    const [encryptedText, iv, key] = encrypted.split('\n');
  
    // Convert the IV and key to Buffer objects
    const ivBuffer = Buffer.from(iv, 'hex');
    const keyBuffer = Buffer.from(key, 'hex');
  
    // Create a new Decipher object
    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
  
    // Decrypt the encrypted text
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  
    return decrypted;
}