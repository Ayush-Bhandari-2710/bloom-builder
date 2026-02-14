import { useState } from "react";
import BuilderHeader from "@/components/builder/BuilderHeader";
import FlowerPicker from "@/components/builder/FlowerPicker";
import CanvasArea from "@/components/builder/CanvasArea";
import LayerPanel from "@/components/builder/LayerPanel";
import ToolBar from "@/components/builder/ToolBar";
import type { ViewMode, BouquetItem } from "@/types";

const Builder = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("topDown");
  const [title, setTitle] = useState("My Bouquet");
  const [items] = useState<BouquetItem[]>([]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <BuilderHeader
        title={title}
        setTitle={setTitle}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="flex flex-1 overflow-hidden">
        <FlowerPicker viewMode={viewMode} />
        <CanvasArea viewMode={viewMode} items={items} />
        <LayerPanel items={items} />
      </div>
      <ToolBar items={items} />
    </div>
  );
};

export default Builder;
