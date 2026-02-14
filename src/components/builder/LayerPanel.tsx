import { Layers, Flower2 } from "lucide-react";
import type { BouquetItem } from "@/types";

interface LayerPanelProps {
  items: BouquetItem[];
}

const LayerPanel = ({ items }: LayerPanelProps) => (
  <aside className="hidden lg:flex w-[300px] flex-shrink-0 flex-col border-l border-border/30 bg-mist overflow-y-auto custom-scrollbar p-6">
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-display text-xl font-semibold text-foreground">Layers</h2>
      <span className="glass text-xs px-3 py-1 rounded-full font-medium text-muted-foreground">
        {items.length} flowers
      </span>
    </div>

    {items.length === 0 ? (
      <div className="flex flex-col items-center justify-center text-center py-16 opacity-50">
        <Layers size={32} className="text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">No flowers yet</p>
      </div>
    ) : (
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-soft transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-card flex items-center justify-center">
              <Flower2 size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.flowerId}</p>
              <p className="text-xs text-muted-foreground">
                {item.message ? "💌 Message attached" : "No message"}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </aside>
);

export default LayerPanel;
