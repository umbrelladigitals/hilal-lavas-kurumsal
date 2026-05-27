import { cookies } from 'next/headers';
import crypto from 'crypto';

// Secret key for session encryption. In production, use SESSION_SECRET from environment.
const SESSION_SECRET = process.env.SESSION_SECRET || 'hilal_lavas_super_secret_session_key_2026';
const COOKIE_NAME = 'hilal_admin_session';

// Hashing function for passwords (SHA-256 is simple, fast, and native for this minimal db)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate key from secret
const algorithm = 'aes-256-gcm';
const key = crypto.scryptSync(SESSION_SECRET, 'hilal-salt', 32);

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag().toString('hex');
  
  // Format: iv:authTag:encryptedContent
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

export function decrypt(token: string): string | null {
  try {
    const parts = token.split(':');
    if (parts.length !== 3) return null;
    
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];
    
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (err) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  
  if (!sessionCookie) return null;
  
  const decrypted = decrypt(sessionCookie.value);
  if (!decrypted) return null;
  
  try {
    const data = JSON.parse(decrypted);
    // Check if session has expired (e.g. 7 days lifetime)
    if (Date.now() > data.expires) {
      return null;
    }
    return data.user;
  } catch {
    return null;
  }
}

export async function setSession(user: { username: string }) {
  const expires = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const sessionValue = JSON.stringify({ user, expires });
  const encrypted = encrypt(sessionValue);
  
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
