// 32 unambiguous characters (no 0/O, 1/I) — 256 % 32 === 0, so no modulo bias.
const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

/**
 * Generates a demonstration-only, client-side reference such as AJDP-DEMO-7X42K9.
 * It is random and is not derived from anything the visitor entered.
 */
export function generateDemoReference(): string {
  const bytes = new Uint8Array(6)
  crypto.getRandomValues(bytes)
  const suffix = Array.from(bytes, (byte) => CHARSET[byte % CHARSET.length]).join('')
  return `AJDP-REG-${suffix}`
}
