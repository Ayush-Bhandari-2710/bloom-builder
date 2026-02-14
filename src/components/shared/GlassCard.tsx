import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true }: GlassCardProps) => (
  <div
    className={cn(
      "glass rounded-2xl shadow-soft-lg",
      hover && "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-soft-xl",
      className
    )}
  >
    {children}
  </div>
);

export default GlassCard;
