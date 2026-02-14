import type { ViewMode, BouquetItem } from "@/types";

interface CanvasAreaProps {
  viewMode: ViewMode;
  items: BouquetItem[];
}

const CanvasArea = ({ viewMode, items }: CanvasAreaProps) => (
  <div className="flex-1 flex items-center justify-center bg-background relative p-4">
    <div className="w-full max-w-[800px] aspect-square bg-card rounded-2xl shadow-soft-2xl relative overflow-hidden">
      {/* View mode indicator */}
      {viewMode === "topDown" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[75%] aspect-square rounded-full border-2 border-dashed border-border/30" />
        </div>
      )}

      {viewMode === "sideView" && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-6xl opacity-30 pointer-events-none">
          🏺
        </div>
      )}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <span className="text-7xl opacity-20 mb-6">🌿</span>
          <h3 className="font-display text-2xl text-muted-foreground">
            Your canvas awaits
          </h3>
          <p className="mt-3 text-muted-foreground/70 max-w-sm">
            Drag flowers from the left to start building your beautiful bouquet.
          </p>
          <p className="mt-6 text-sm text-muted-foreground/50">
            💡 Tip: Switch to {viewMode === "topDown" ? "Pot View" : "Top View"} anytime
          </p>
        </div>
      )}

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground/40">
        Canvas will be interactive in Phase 2
      </p>
    </div>
  </div>
);

export default CanvasArea;
