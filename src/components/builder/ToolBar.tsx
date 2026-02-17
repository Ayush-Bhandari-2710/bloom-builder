import { Undo2, Redo2, ZoomIn, ZoomOut, Trash2, Flower2, MessageCircle, Send, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BouquetItem } from "@/types";

interface ToolBarProps {
  items: BouquetItem[];
  onPublish?: () => void;
  isPublishing?: boolean;
}

const ToolBar = ({ items, onPublish, isPublishing }: ToolBarProps) => {
  const messagesCount = items.filter((i) => i.message).length;

  return (
    <div className="h-[72px] flex-shrink-0 glass border-t border-border/30 flex items-center justify-between px-4 md:px-8 z-30">
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Undo">
          <Undo2 size={18} />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Redo">
          <Redo2 size={18} />
        </button>
        <div className="w-px h-6 bg-border mx-2" />
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Zoom In">
          <ZoomIn size={18} />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Zoom Out">
          <ZoomOut size={18} />
        </button>
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Delete">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Flower2 size={14} /> {items.length} flowers
        </span>
        <span className="flex items-center gap-2">
          <MessageCircle size={14} /> {messagesCount} messages
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="hidden sm:flex border-border text-muted-foreground hover:text-foreground gap-2">
          <Eye size={16} /> Preview
        </Button>
        <Button
          size="sm"
          className="gradient-button border-0 text-primary-foreground shadow-pink hover:scale-[1.02] active:scale-[0.98] transition-transform gap-2"
          onClick={onPublish}
          disabled={isPublishing}
        >
          {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {isPublishing ? "Publishing…" : "Publish"}
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;
