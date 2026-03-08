import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultScreenProps {
  imageUrl: string;
  name: string;
  message: string;
  onReset: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ imageUrl, name, message, onReset }) => {
  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `womens-day-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, name]);

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

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={handleDownload} size="lg" className="px-8 py-5 rounded-full">
            <Download className="mr-2 h-5 w-5" />
            Download Card
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
