import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Animated emblem/shield */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Shield shape */}
        <motion.svg
          width="120"
          height="140"
          viewBox="0 0 120 140"
          className="relative z-10"
        >
          {/* Shield outline with gradient stroke */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#F4E4BC" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="goldFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.2)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.05)" />
            </linearGradient>
          </defs>
          
          {/* Shield path */}
          <motion.path
            d="M60 5 L110 25 L110 70 Q110 110 60 135 Q10 110 10 70 L10 25 Z"
            fill="url(#goldFill)"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Inner decorative lines */}
          <motion.path
            d="M60 20 L95 35 L95 68 Q95 100 60 120 Q25 100 25 68 L25 35 Z"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />
          
          {/* Crown/emblem in center */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <path
              d="M40 70 L50 55 L60 65 L70 55 L80 70 L75 85 L45 85 Z"
              fill="url(#goldGradient)"
              opacity="0.8"
            />
            <circle cx="60" cy="50" r="5" fill="#D4AF37" />
          </motion.g>
        </motion.svg>

        {/* Rotating decorative ring */}
        <motion.div
          className="absolute inset-[-20px] border border-primary/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-[-35px] border border-primary/20 rounded-full"
          style={{ borderStyle: "dashed" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Logo text */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h1 className="font-heading text-2xl md:text-3xl tracking-[0.3em] uppercase">
          <span className="text-gradient-gold">Your Custom Emblem</span>
        </h1>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-[#F4E4BC] to-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="mt-4 text-sm text-white/50 tracking-[0.2em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Crafting Excellence
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
