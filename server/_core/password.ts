import crypto from "crypto";

/**
 * Hashes a plaintext password using PBKDF2/scrypt and a random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored hash.
 */
export function verifyPassword(password: string, hash: string): boolean {
  if (!hash) return false;
  const parts = hash.split(":");
  if (parts.length !== 2) return false;
  const [salt, key] = parts;
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(key, "hex"), derivedKey);
}
