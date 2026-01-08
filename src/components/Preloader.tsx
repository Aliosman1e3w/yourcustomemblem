import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import logoEmblem from "@/assets/logo-emblem.png";

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
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 3;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      {/* Logo image with animation */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Outer glow */}
        <motion.div
          className="absolute inset-[-30px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Logo image */}
        <motion.img
          src={logoEmblem}
          alt="Your Custom Emblem"
          className="relative z-10 w-72 md:w-96 h-auto drop-shadow-2xl"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Rotating decorative ring */}
        <motion.div
          className="absolute inset-[-20px] border border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
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
        transition={{ delay: 0.5 }}
      >
        Crafting Excellence
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
