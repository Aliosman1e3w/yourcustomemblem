import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logoEmblem from "@/assets/logo-emblem.png";
import { Paintbrush } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [brushComplete, setBrushComplete] = useState(false);

  useEffect(() => {
    // Start progress after brush animation begins
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBrushComplete(true), 300);
            setTimeout(onComplete, 1200);
            return 100;
          }
          return prev + 1.5;
        });
      }, 40);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Background chrome particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-gray-300 via-white to-gray-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              delay: 1 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main logo container */}
      <div className="relative mb-8">
        {/* Chrome glow effect behind logo */}
        <motion.div
          className="absolute inset-[-50px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(192,192,192,0.3) 0%, rgba(169,169,169,0.15) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: brushComplete ? 1 : progress / 100,
            scale: brushComplete ? 1.2 : 0.8 + (progress / 200),
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Logo with reveal mask */}
        <div className="relative w-80 md:w-[450px] h-24 md:h-32 overflow-hidden">
          {/* Grayscale version (background) */}
          <motion.img
            src={logoEmblem}
            alt="Your Custom Emblem"
            className="absolute inset-0 w-full h-full object-contain opacity-20 grayscale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Chrome revealed version */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              <img
                src={logoEmblem}
                alt="Your Custom Emblem"
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(192,192,192,0.5)) drop-shadow(0 0 20px rgba(169,169,169,0.3))",
                }}
              />
              {/* Chrome shine overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0%", "-200% 0%"],
                }}
                transition={{
                  duration: 2,
                  delay: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </motion.div>
          </div>

          {/* Animated paintbrush */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-20"
            initial={{ left: "-15%", rotate: -30 }}
            animate={{ 
              left: `${Math.min(progress, 100)}%`,
              rotate: [-30, -25, -35, -30],
            }}
            transition={{ 
              left: { duration: 0.1, ease: "linear" },
              rotate: { duration: 0.3, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ display: progress >= 100 ? "none" : "block" }}
          >
            {/* Brush with chrome paint dripping */}
            <div className="relative">
              {/* Paint splash effect */}
              <motion.div
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(192,192,192,0.8) 0%, rgba(169,169,169,0.4) 50%, transparent 70%)",
                  filter: "blur(4px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                }}
              />
              
              {/* Paintbrush icon */}
              <motion.div
                animate={{
                  y: [-2, 2, -2],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                }}
              >
                <Paintbrush 
                  size={32} 
                  className="text-gray-300 drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(192,192,192,0.8))",
                  }}
                />
              </motion.div>

              {/* Chrome paint trail */}
              <motion.div
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 rounded-full"
                style={{
                  width: "30px",
                  background: "linear-gradient(90deg, rgba(192,192,192,0.8), rgba(220,220,220,0.4), transparent)",
                }}
                animate={{
                  opacity: [0.8, 0.4, 0.8],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Sparkle effects when brush passes */}
        {progress > 20 && progress < 100 && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2"
                style={{
                  left: `${progress - 5 - i * 8}%`,
                  top: `${30 + i * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -10, -20],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                <div className="w-full h-full bg-white rounded-full" 
                  style={{ boxShadow: "0 0 6px 2px rgba(255,255,255,0.8)" }} 
                />
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Progress bar */}
      <motion.div
        className="w-56 h-[3px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ 
            width: `${progress}%`,
            background: "linear-gradient(90deg, #A0A0A0, #E8E8E8, #C0C0C0, #FFFFFF, #C0C0C0)",
            boxShadow: "0 0 10px rgba(192,192,192,0.5)",
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-sm tracking-[0.3em] uppercase"
        style={{
          background: "linear-gradient(90deg, #A0A0A0, #E0E0E0, #A0A0A0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Crafting Your Vision
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
