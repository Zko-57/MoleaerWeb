/**
 * URL base para metadata absoluta (OG, canonical).
 * Vercel define VERCEL_URL; en producción puedes fijar NEXT_PUBLIC_SITE_URL.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    try {
      return new URL(explicit);
    } catch {
      /* continuar con fallbacks */
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL('https://www.moleaer.com');
}
