import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
        scrolled
          ? "glass shadow-soft"
          : "bg-transparent"
      }`}
    >
      <Logo />

      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Features
        </a>
        <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          How it works
        </a>
        <a href="#showcase" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Examples
        </a>
      </div>

      <div className="hidden md:block">
        <Link to="/builder">
          <Button variant="default" className="gradient-button border-0 text-primary-foreground shadow-pink hover:scale-[1.02] active:scale-[0.98] transition-transform">
            Create Bouquet
          </Button>
        </Link>
      </div>

      <button
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-20 left-0 right-0 glass shadow-soft-lg p-6 flex flex-col gap-4 md:hidden">
          <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">Features</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">How it works</a>
          <a href="#showcase" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">Examples</a>
          <Link to="/builder" onClick={() => setMobileOpen(false)}>
            <Button className="w-full gradient-button border-0 text-primary-foreground shadow-pink">
              Create Bouquet
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
