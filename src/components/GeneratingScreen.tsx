import React from "react";
import { motion } from "framer-motion";

const loadingMessages = [
  "Painting flowers with AI brushstrokes...",
  "Mixing the perfect color palette...",
  "Adding a touch of magic...",
  "Crafting something beautiful...",
  "Almost there...",
];

const GeneratingScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Animated flower */}
      <motion.div
        className="relative mb-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-24 h-24 rounded-full border-4 border-primary/30 border-t-primary" />
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Creating Your Card
        </h2>

        <motion.p
          key={msgIndex}
          className="text-muted-foreground font-body text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {loadingMessages[msgIndex]}
        </motion.p>
      </motion.div>

      {/* Floating decorative petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-rose/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

export default GeneratingScreen;
