import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <span className="text-2xl">🌸</span>
    <span className="font-display text-2xl font-semibold text-foreground">
      Everbloom
    </span>
  </Link>
);

export default Logo;
