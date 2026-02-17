import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BuilderHeader from "@/components/builder/BuilderHeader";
import FlowerPicker from "@/components/builder/FlowerPicker";
import CanvasArea from "@/components/builder/CanvasArea";
import LayerPanel from "@/components/builder/LayerPanel";
import ToolBar from "@/components/builder/ToolBar";
import { toast } from "@/hooks/use-toast";
import { createBouquet } from "@/lib/api";
import type { ViewMode, BouquetItem } from "@/types";

const Builder = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("topDown");
  const [title, setTitle] = useState("My Bouquet");
  const [items] = useState<BouquetItem[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [bouquetId, setBouquetId] = useState<string | null>(null);
  const [editToken, setEditToken] = useState<string | null>(null);

  const handlePublish = useCallback(async () => {
    if (isPublishing) return;
    setIsPublishing(true);

    try {
      // Create bouquet if not yet persisted
      if (!bouquetId) {
        const result = await createBouquet({ title, viewMode });
        setBouquetId(result.bouquetId);
        setEditToken(result.editToken);

        toast({
          title: "Bouquet created!",
          description: `Your bouquet has been saved. Share it at ${result.publicUrl}`,
        });

        console.log("[Publish] Created bouquet", {
          bouquetId: result.bouquetId,
          publicUrl: result.publicUrl,
          editUrl: result.editUrl,
        });
      } else {
        toast({
          title: "Already saved",
          description: "This bouquet has already been created.",
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({ title: "Publish failed", description: message, variant: "destructive" });
      console.error("[Publish] Error:", err);
    } finally {
      setIsPublishing(false);
    }
  }, [isPublishing, bouquetId, title, viewMode]);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <BuilderHeader
        title={title}
        setTitle={setTitle}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />
      <div className="flex flex-1 overflow-hidden">
        <FlowerPicker viewMode={viewMode} />
        <CanvasArea viewMode={viewMode} items={items} />
        <LayerPanel items={items} />
      </div>
      <ToolBar items={items} onPublish={handlePublish} isPublishing={isPublishing} />
    </div>
  );
};

export default Builder;
