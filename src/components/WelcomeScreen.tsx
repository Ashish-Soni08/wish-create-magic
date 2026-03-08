import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import exampleCard5 from "@/assets/example-card-5.png";
import exampleCard7 from "@/assets/example-card-7.png";
import exampleCard8 from "@/assets/example-card-8.png";
import exampleCard9 from "@/assets/example-card-9.png";
import exampleCard10 from "@/assets/example-card-10.png";
import exampleCard11 from "@/assets/example-card-11.png";
import exampleCard12 from "@/assets/example-card-12.png";
import exampleCard13 from "@/assets/example-card-13.png";
import exampleCard14 from "@/assets/example-card-14.png";

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

const staticCards = [
  exampleCard12, exampleCard13, exampleCard14, exampleCard5,
  exampleCard7, exampleCard8, exampleCard9, exampleCard10, exampleCard11,
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [galleryCards, setGalleryCards] = useState<string[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const { data } = await supabase
        .from("gallery_cards")
        .select("image_url")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) {
        setGalleryCards(data.map((c) => c.image_url));
      }
    };
    fetchGallery();
  }, []);

  const allCards = [...staticCards, ...galleryCards];
  // Duplicate for seamless infinite scroll
  const scrollCards = [...allCards, ...allCards];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Floating petals */}
      <FloatingPetal delay={0} x="10%" size={12} />
      <FloatingPetal delay={1.5} x="25%" size={8} />
      <FloatingPetal delay={3} x="50%" size={14} />
      <FloatingPetal delay={0.8} x="70%" size={10} />
      <FloatingPetal delay={2.2} x="85%" size={16} />
      <FloatingPetal delay={4} x="40%" size={9} />

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

      {/* Auto-scrolling Gallery */}
      <motion.div
        className="relative z-10 w-full mt-16 pb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <p className="text-sm font-display text-muted-foreground mb-6 uppercase tracking-widest text-center">
          ✨ Examples of AI-generated cards
        </p>
        <div className="overflow-hidden w-full">
          <motion.div
            className="flex gap-5"
            animate={{ x: [0, -(allCards.length * 272)] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: allCards.length * 4,
                ease: "linear",
              },
            }}
          >
            {scrollCards.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-56 md:w-64 rounded-xl overflow-hidden shadow-lg border border-border"
              >
                <img
                  src={src}
                  alt={`Example Women's Day greeting card ${(i % allCards.length) + 1}`}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
