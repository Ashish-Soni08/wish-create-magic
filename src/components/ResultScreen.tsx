import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RotateCcw, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ResultScreenProps {
  imageUrl: string;
  name: string;
  message: string;
  onReset: () => void;
  onRetry: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ imageUrl, name, message, onReset, onRetry }) => {
  const [showGalleryPrompt, setShowGalleryPrompt] = useState(false);
  const [savedToGallery, setSavedToGallery] = useState(false);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `womens-day-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show gallery prompt after download if not already saved
    if (!savedToGallery) {
      setShowGalleryPrompt(true);
    }
  }, [imageUrl, name, savedToGallery]);

  const handleSaveToGallery = async () => {
    try {
      const { error } = await supabase.from("gallery_cards").insert({
        image_url: imageUrl,
        name,
      });
      if (error) throw error;
      setSavedToGallery(true);
      setShowGalleryPrompt(false);
      toast({
        title: "Added to gallery! 🎉",
        description: "Your card will now inspire others on the home page.",
      });
    } catch (err: any) {
      console.error("Gallery save error:", err);
      toast({
        title: "Couldn't save to gallery",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-2xl text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          A card for {name} 💐
        </h2>
        {message && (
          <p className="text-muted-foreground font-body mb-6 italic">"{message}"</p>
        )}

        {/* Generated Image */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 border border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src={imageUrl}
            alt={`Women's Day greeting card for ${name}`}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Gallery permission prompt */}
        <AnimatePresence>
          {showGalleryPrompt && (
            <motion.div
              className="mb-6 p-4 rounded-xl bg-muted border border-border"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm text-foreground mb-3">
                🌟 Would you like to add this card to our public gallery to inspire others?
              </p>
              <div className="flex gap-3 justify-center">
                <Button size="sm" onClick={handleSaveToGallery} className="rounded-full">
                  Yes, share it!
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowGalleryPrompt(false)} className="rounded-full">
                  No thanks
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={handleDownload} size="lg" className="px-8 py-5 rounded-full">
            <Download className="mr-2 h-5 w-5" />
            Download Card
          </Button>
          {savedToGallery && (
            <Button variant="secondary" size="lg" className="px-8 py-5 rounded-full pointer-events-none opacity-70">
              <Check className="mr-2 h-5 w-5" />
              In Gallery
            </Button>
          )}
          <Button onClick={onRetry} variant="secondary" size="lg" className="px-8 py-5 rounded-full">
            <RefreshCw className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          <Button onClick={onReset} variant="outline" size="lg" className="px-8 py-5 rounded-full">
            <RotateCcw className="mr-2 h-5 w-5" />
            Create Another
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultScreen;
