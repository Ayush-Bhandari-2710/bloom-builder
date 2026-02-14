import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Lock, Copy, QrCode, Share2, Flower2, Calendar, MessageCircle } from "lucide-react";
import { fadeUpVariants } from "@/lib/animations";

const ViewBouquet = () => {
  const { id } = useParams();
  const [isLocked] = useState(true);

  // Fake countdown
  const [countdown, setCountdown] = useState({ days: 3, hours: 14, minutes: 27, seconds: 42 });
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return prev;
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="h-20 glass shadow-soft flex items-center justify-between px-6 md:px-12">
        <Logo />
        <h1 className="font-display text-xl md:text-2xl font-semibold text-foreground hidden sm:block">
          A Digital Bouquet
        </h1>
        <Link to="/builder">
          <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground">
            Create Your Own
          </Button>
        </Link>
      </header>

      {/* Main content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        {isLocked ? (
          <motion.div
            className="glass rounded-2xl shadow-soft-2xl max-w-xl w-full p-12 md:p-16 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-8 rounded-full gradient-button flex items-center justify-center shadow-pink">
              <Lock size={28} className="text-primary-foreground" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              This bouquet is still growing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              It will bloom and reveal its secrets on
            </p>
            <p className="mt-2 font-display text-xl text-primary font-semibold">
              February 14, 2026
            </p>

            <div className="flex justify-center gap-4 md:gap-6 mt-10">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-4 md:gap-6">
                  <div className="text-center">
                    <span className="font-display text-4xl md:text-5xl font-semibold text-foreground block tabular-nums">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1 block">
                      {unit.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <span className="font-display text-3xl text-foreground/20 hidden md:block">:</span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-10 text-sm text-muted-foreground/60">
              💐 The wait will be worth it
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="bg-card rounded-2xl shadow-soft-2xl max-w-4xl w-full p-8 md:p-12"
            variants={fadeUpVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square max-w-[700px] mx-auto flex flex-col items-center justify-center">
              <span className="text-8xl opacity-50">🌺🌸🌼</span>
              <p className="mt-6 text-lg text-muted-foreground">
                Interactive bouquet will render here
              </p>
              <p className="mt-2 text-sm text-muted-foreground/60">
                Click flowers to reveal messages ✨
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Flower2 size={16} className="text-primary" /> 12 flowers
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" /> Created Feb 10, 2026
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle size={16} className="text-primary" /> 3 hidden messages
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Share controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="glass rounded-full shadow-soft-xl flex items-center gap-2 p-3 px-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
            <Copy size={16} /> Copy Link
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
            <QrCode size={16} /> QR Code
          </Button>
          <Button variant="ghost" size="sm" className="rounded-full gap-2 text-muted-foreground hover:text-foreground">
            <Share2 size={16} /> Share
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ViewBouquet;
