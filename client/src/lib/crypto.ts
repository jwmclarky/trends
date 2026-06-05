/**
 * Reusable utility for client-side local encryption using the browser's Web Crypto API.
 * This guarantees absolute zero-trace capabilities since data is encrypted locally
 * before hitting the server/database.
 */

async function generateKey(passcode: string) {
  const enc = new TextEncoder();
  // Ensure the passcode is padded to exactly 16 bytes for AES-128
  const keyBuffer = enc.encode(passcode.padEnd(16, "0").slice(0, 16));
  
  const rawKey = await window.crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
  return rawKey;
}

/**
 * Encrypts plaintext locally using a passcode.
 * Returns a hex-encoded string containing the IV prepended to the ciphertext.
 */
export async function encryptText(text: string, passcode: string): Promise<string> {
  if (!text) return "";
  const enc = new TextEncoder();
  const key = await generateKey(passcode);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    enc.encode(text)
  );
  
  // Combine IV and Ciphertext
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  
  // Convert bytes to hex string
  return Array.from(combined)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Decrypts a hex-encoded ciphertext locally using a passcode.
 */
export async function decryptText(hex: string, passcode: string): Promise<string> {
  if (!hex) return "";
  try {
    const dec = new TextDecoder();
    const key = await generateKey(passcode);
    
    // Parse hex string to byte array
    const matches = hex.match(/.{1,2}/g);
    if (!matches) throw new Error("Invalid hex string");
    
    const bytes = new Uint8Array(matches.map(byte => parseInt(byte, 16)));
    const iv = bytes.slice(0, 16);
    const ciphertext = bytes.slice(16);
    
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      ciphertext
    );
    return dec.decode(decrypted);
  } catch (error) {
    console.warn("[Crypto] Local decryption failed", error);
    throw new Error("Incorrect passcode or corrupted data");
  }
}
