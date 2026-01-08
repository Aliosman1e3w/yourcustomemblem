import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import logoEmblem from "@/assets/logo-emblem.png";
import { Paintbrush } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 1000);
            return 100;
          }
          return prev + 0.8;
        });
      }, 45);

      return () => clearInterval(interval);
    }, 800);

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
        {[...Array(15)].map((_, i) => (
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
              delay: 1.5 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main logo container */}
      <div className="relative mb-8">
        {/* Chrome glow effect - only appears as logo is revealed */}
        <motion.div
          className="absolute inset-[-50px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(192,192,192,0.3) 0%, rgba(169,169,169,0.15) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: progress / 150,
            scale: 0.8 + (progress / 250),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Logo container with reveal */}
        <div className="relative w-80 md:w-[500px] h-24 md:h-36 overflow-hidden">
          {/* Logo ONLY visible where brush has passed */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                clipPath: `inset(0 ${100 - progress}% 0 0)`,
              }}
            >
              <img
                src={logoEmblem}
                alt="Your Custom Emblem"
                className="w-full h-full object-contain"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(192,192,192,0.6)) drop-shadow(0 0 30px rgba(169,169,169,0.4))",
                }}
              />
              {/* Chrome shine sweep effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["200% 0%", "-200% 0%"],
                }}
                transition={{
                  duration: 1.5,
                  delay: 6,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </motion.div>
          </div>

          {/* Animated paintbrush - positioned at the reveal edge */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 z-20"
            style={{
              left: `${progress}%`,
              transform: `translateX(-50%) translateY(-50%)`,
              display: progress >= 100 ? "none" : "block",
            }}
          >
            <motion.div
              className="relative"
              animate={{
                rotate: [-35, -25, -35],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Paintbrush icon */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                  x: [-1, 1, -1],
                }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                }}
              >
                <Paintbrush 
                  size={36} 
                  className="text-gray-200"
                  style={{
                    filter: "drop-shadow(0 0 12px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(192,192,192,0.8))",
                  }}
                />
              </motion.div>

              {/* Chrome paint drips */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-b from-white to-gray-400"
                  style={{
                    left: `${-5 + i * 4}px`,
                    top: "20px",
                    width: "3px",
                    height: "8px",
                  }}
                  animate={{
                    y: [0, 15, 30],
                    opacity: [0.8, 0.4, 0],
                    scale: [1, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Sparkles trailing behind the brush */}
          {progress > 5 && progress < 100 && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${progress - 3 - i * 5}%`,
                    top: `${35 + i * 10}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                    y: [0, -15, -30],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: i * 0.12,
                  }}
                >
                  <div 
                    className="w-2 h-2 bg-white rounded-full" 
                    style={{ boxShadow: "0 0 8px 3px rgba(255,255,255,0.9)" }} 
                  />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <motion.div
        className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ 
            width: `${progress}%`,
            background: "linear-gradient(90deg, #909090, #E8E8E8, #C0C0C0, #FFFFFF, #D0D0D0)",
            boxShadow: "0 0 12px rgba(255,255,255,0.6)",
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-sm tracking-[0.3em] uppercase font-light"
        style={{
          background: "linear-gradient(90deg, #A0A0A0, #E8E8E8, #A0A0A0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Crafting Your Vision
      </motion.p>
    </motion.div>
  );
};

export default Preloader;
