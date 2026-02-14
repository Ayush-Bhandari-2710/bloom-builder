import { Flower, Pot } from "@/types";

export const flowers: Flower[] = [
  { id: "rose", name: "Rose", category: "romantic", emoji: "🌹" },
  { id: "tulip", name: "Tulip", category: "spring", emoji: "🌷" },
  { id: "daisy", name: "Daisy", category: "cheerful", emoji: "🌼" },
  { id: "lily", name: "Lily", category: "elegant", emoji: "🪷" },
  { id: "sunflower", name: "Sunflower", category: "vibrant", emoji: "🌻" },
  { id: "lavender", name: "Lavender", category: "calm", emoji: "💜" },
  { id: "carnation", name: "Carnation", category: "classic", emoji: "🌸" },
  { id: "peony", name: "Peony", category: "luxe", emoji: "🌺" },
];

export const pots: Pot[] = [
  { id: "ceramic-sage", name: "Ceramic Sage", emoji: "🏺" },
  { id: "glass-modern", name: "Glass Modern", emoji: "🫙" },
  { id: "terracotta-classic", name: "Terracotta", emoji: "🪴" },
];

export const showcaseBouquets = [
  { title: "Birthday Surprise", flowers: 12, detail: "Unlocks in 3 days", gradient: "from-petal-pink to-petal-lavender" },
  { title: "Anniversary Bouquet", flowers: 8, detail: "5 hidden messages", gradient: "from-petal-lavender to-leaf-sage" },
  { title: "Thank You", flowers: 15, detail: "Top-down view", gradient: "from-soft-peach to-petal-pink" },
];
