export interface Flower {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

export interface Pot {
  id: string;
  name: string;
  emoji: string;
}

export interface BouquetItem {
  id: string;
  flowerId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  message?: string;
}

export interface Bouquet {
  id: string;
  title: string;
  viewMode: "topDown" | "sideView";
  items: BouquetItem[];
  potId?: string;
  unlockTime?: Date;
  createdAt: Date;
}

export type ViewMode = "topDown" | "sideView";
