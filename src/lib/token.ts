/**
 * Generate a secure random edit token (64 hex characters)
 */
export function generateEditToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate URLs for a bouquet
 */
export function generateUrls(bouquetId: string, editToken: string) {
  const baseUrl = window.location.origin;

  return {
    publicUrl: `${baseUrl}/b/${bouquetId}`,
    editUrl: `${baseUrl}/edit/${bouquetId}?token=${editToken}`,
  };
}
