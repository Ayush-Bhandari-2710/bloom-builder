import { generateEditToken, generateUrls } from "./token";

const FUNCTIONS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const AUTH_HEADER = `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`;

interface CanvasItem {
  flowerType: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
  opacity: number;
  stemLength?: number;
  message?: { text: string; isHidden: boolean };
}

async function callFunction(path: string, options: RequestInit = {}) {
  const response = await fetch(`${FUNCTIONS_URL}/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH_HEADER,
      ...(options.headers || {}),
    },
  });
  return response.json();
}

// ── Create Bouquet ──────────────────────────────────────────
export async function createBouquet(data: {
  title?: string;
  viewMode?: "topDown" | "sideView";
  potStyle?: string;
}) {
  const editToken = generateEditToken();
  const result = await callFunction("create-bouquet", {
    method: "POST",
    body: JSON.stringify({ ...data, editToken }),
  });

  if (!result.success) throw new Error(result.error);

  return {
    bouquetId: result.bouquetId,
    editToken,
    ...generateUrls(result.bouquetId, editToken),
  };
}

// ── Update Bouquet ──────────────────────────────────────────
export async function updateBouquet(data: {
  bouquetId: string;
  editToken: string;
  title?: string;
  viewMode?: "topDown" | "sideView";
  potStyle?: string;
  items?: CanvasItem[];
}) {
  const result = await callFunction("update-bouquet", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!result.success) throw new Error(result.error);
  return result;
}

// ── Get Bouquet ─────────────────────────────────────────────
export async function getBouquet(bouquetId: string) {
  const result = await callFunction(`get-bouquet?id=${bouquetId}`, {
    method: "GET",
  });
  if (!result.success) throw new Error(result.error);
  return result;
}

// ── Publish Bouquet ─────────────────────────────────────────
export async function publishBouquet(data: {
  bouquetId: string;
  editToken: string;
  unlockTime?: string | null;
}) {
  const result = await callFunction("publish-bouquet", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!result.success) throw new Error(result.error);
  return { ...result, ...generateUrls(data.bouquetId, data.editToken) };
}

// ── Validate Token ──────────────────────────────────────────
export async function validateToken(bouquetId: string, editToken: string) {
  const result = await callFunction("validate-token", {
    method: "POST",
    body: JSON.stringify({ bouquetId, editToken }),
  });
  return result.valid;
}

// ── Atelier Votes ───────────────────────────────────────────
export async function voteForAtelier() {
  const result = await callFunction("atelier-vote", { method: "POST" });
  if (!result.success) throw new Error(result.error);
  return result.totalVotes;
}

export async function unvoteForAtelier() {
  const result = await callFunction("atelier-vote", { method: "DELETE" });
  return result.totalVotes;
}

export async function getAtelierVotes() {
  const result = await callFunction("atelier-vote", { method: "GET" });
  return result.totalVotes;
}
