import { flowers, pots } from "@/lib/constants";
import type { ViewMode } from "@/types";

interface FlowerPickerProps {
  viewMode: ViewMode;
}

const FlowerPicker = ({ viewMode }: FlowerPickerProps) => (
  <aside className="hidden md:flex w-[280px] flex-shrink-0 flex-col border-r border-border/30 bg-mist overflow-y-auto custom-scrollbar p-6">
    <div className="mb-5">
      <h2 className="font-display text-xl font-semibold text-foreground">Flowers</h2>
      <p className="text-sm text-muted-foreground mt-1">Drag to add</p>
    </div>

    {viewMode === "sideView" && (
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Pot Style</h3>
        <div className="grid grid-cols-3 gap-2">
          {pots.map((pot) => (
            <button
              key={pot.id}
              className="glass rounded-lg aspect-square flex items-center justify-center text-2xl hover:-translate-y-0.5 hover:shadow-soft transition-all cursor-pointer"
              title={pot.name}
            >
              {pot.emoji}
            </button>
          ))}
        </div>
      </div>
    )}

    <div className="grid grid-cols-2 gap-3">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="glass rounded-xl overflow-hidden cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:shadow-soft-lg active:scale-110 active:shadow-soft-2xl transition-all"
        >
          <div className="aspect-square flex items-center justify-center p-4">
            <span className="text-4xl">{flower.emoji}</span>
          </div>
          <div className="text-center text-sm font-medium pb-3 text-foreground">
            {flower.name}
          </div>
        </div>
      ))}
    </div>
  </aside>
);

export default FlowerPicker;
