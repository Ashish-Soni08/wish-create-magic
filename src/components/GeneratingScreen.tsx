import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const loadingMessages = [
  { text: "Gathering your flowers... 🌸", emoji: "🌸" },
  { text: "Mixing the perfect colors... 🎨", emoji: "🎨" },
  { text: "Arranging the bouquet... 💐", emoji: "💐" },
  { text: "Adding watercolor magic... ✨", emoji: "✨" },
  { text: "Writing your message... ✍️", emoji: "✍️" },
  { text: "Sprinkling some love... 💕", emoji: "💕" },
  { text: "Putting the finishing touches... 🎀", emoji: "🎀" },
  { text: "Almost ready... 🌷", emoji: "🌷" },
];

const GeneratingScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(msgInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 8 + 2, 92));
    }, 800);
    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Animated spinner */}
      <motion.div
        className="relative mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary border-r-primary/50" />
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {loadingMessages[msgIndex].emoji}
        </motion.span>
      </motion.div>

      <motion.div
        className="text-center w-full max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          Creating Your Card
        </h2>

        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            className="text-muted-foreground font-body text-lg mb-6 h-7"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {loadingMessages[msgIndex].text}
          </motion.p>
        </AnimatePresence>

        <Progress value={progress} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">This usually takes 15–30 seconds</p>
      </motion.div>

      {/* Floating petals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full bg-rose/15"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 4,
            delay: i * 0.4,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default GeneratingScreen;
