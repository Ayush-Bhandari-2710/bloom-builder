interface FloatingFlowerProps {
  emoji: string;
  className?: string;
  size?: string;
}

const FloatingFlower = ({ emoji, className = "", size = "text-4xl" }: FloatingFlowerProps) => (
  <span
    className={`absolute select-none opacity-40 pointer-events-none ${size} ${className}`}
    aria-hidden="true"
  >
    {emoji}
  </span>
);

export default FloatingFlower;
