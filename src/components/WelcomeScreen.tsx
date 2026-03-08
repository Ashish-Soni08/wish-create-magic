import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import exampleCard1 from "@/assets/example-card-1.png";
import exampleCard2 from "@/assets/example-card-2.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

const FloatingPetal = ({ delay, x, size }: { delay: number; x: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-rose/20"
    style={{ width: size, height: size, left: x }}
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{ y: "100vh", opacity: [0, 0.6, 0], rotate: 360 }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "linear" }}
  />
);

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Floating petals */}
      <FloatingPetal delay={0} x="10%" size={12} />
      <FloatingPetal delay={1.5} x="25%" size={8} />
      <FloatingPetal delay={3} x="50%" size={14} />
      <FloatingPetal delay={0.8} x="70%" size={10} />
      <FloatingPetal delay={2.2} x="85%" size={16} />
      <FloatingPetal delay={4} x="40%" size={9} />

      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-lavender/10 blur-2xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-rose/10 blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-gold/10 blur-xl" />

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="inline-block mb-6"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-6xl">🌸</span>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4 leading-tight">
          Happy Women's Day
        </h1>

        <p className="font-body text-lg md:text-xl text-muted-foreground mb-2 max-w-lg mx-auto">
          Create a unique, AI-generated greeting card for the special woman in your life
        </p>

        <p className="text-sm text-muted-foreground/70 mb-10">
          Personalized • Artistic • One-of-a-kind
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="text-lg px-10 py-6 rounded-full font-display shadow-lg hover:shadow-xl transition-shadow"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Create a Special Greeting
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
