import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import type { ViewMode } from "@/types";

interface BuilderHeaderProps {
  title: string;
  setTitle: (t: string) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  onPublish?: () => void;
  isPublishing?: boolean;
}

const BuilderHeader = ({ title, setTitle, viewMode, setViewMode, onPublish, isPublishing }: BuilderHeaderProps) => (
  <header className="h-20 flex-shrink-0 glass shadow-soft flex items-center justify-between px-4 md:px-8 z-30 border-b border-border/30">
    <div className="flex items-center gap-4">
      <Logo />
      <span className="hidden md:inline text-muted-foreground">/</span>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="hidden md:block bg-transparent font-display text-lg font-medium border-none outline-none text-foreground focus:underline decoration-primary/30 underline-offset-4 max-w-[200px]"
      />
    </div>

    <div className="flex items-center glass rounded-full p-1 border border-border/30">
      <button
        onClick={() => setViewMode("topDown")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          viewMode === "topDown"
            ? "gradient-button text-primary-foreground shadow-pink"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Eye size={16} />
        <span className="hidden sm:inline">Top View</span>
      </button>
      <button
        onClick={() => setViewMode("sideView")}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          viewMode === "sideView"
            ? "gradient-button text-primary-foreground shadow-pink"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <EyeOff size={16} />
        <span className="hidden sm:inline">Pot View</span>
      </button>
    </div>

    <div className="flex items-center gap-3">
      <span className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
        <span className="w-2 h-2 rounded-full bg-stem-green" />
        Saved
      </span>
      <Button variant="outline" size="sm" className="hidden md:flex border-border text-muted-foreground hover:text-foreground">
        Preview
      </Button>
      <Button
        size="sm"
        className="gradient-button border-0 text-primary-foreground shadow-pink hover:scale-[1.02] active:scale-[0.98] transition-transform"
        onClick={onPublish}
        disabled={isPublishing}
      >
        {isPublishing ? <Loader2 size={16} className="animate-spin" /> : null}
        {isPublishing ? "Publishing…" : "Publish"}
      </Button>
    </div>
  </header>
);

export default BuilderHeader;
