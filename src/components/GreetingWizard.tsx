import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  GreetingFormData,
  RELATIONSHIPS,
  TRAITS,
  FLOWERS,
  COLOR_PALETTES,
} from "@/lib/greeting-data";

interface GreetingWizardProps {
  onSubmit: (data: GreetingFormData) => void;
  onBack: () => void;
}

const steps = ["Name", "Relationship", "Personality", "Flower", "Colors", "Message"];

const GreetingWizard: React.FC<GreetingWizardProps> = ({ onSubmit, onBack }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<GreetingFormData>({
    name: "",
    relationship: "",
    traits: [],
    flower: "",
    colorPalette: "",
    message: "",
  });

  const canProceed = () => {
    switch (step) {
      case 0: return formData.name.trim().length > 0;
      case 1: return formData.relationship.length > 0;
      case 2: return formData.traits.length >= 1 && formData.traits.length <= 3;
      case 3: return formData.flower.length > 0;
      case 4: return formData.colorPalette.length > 0;
      case 5: return true; // message is optional
      default: return false;
    }
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onSubmit(formData);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
    else onBack();
  };

  const toggleTrait = (trait: string) => {
    setFormData((d) => {
      const has = d.traits.includes(trait);
      if (has) return { ...d, traits: d.traits.filter((t) => t !== trait) };
      if (d.traits.length >= 3) return d;
      return { ...d, traits: [...d.traits, trait] };
    });
  };

  const slideVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Who are you celebrating?
            </h2>
            <p className="text-muted-foreground">Enter the name of the special woman</p>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Her name..."
              className="text-lg py-6 font-body"
              maxLength={50}
              autoFocus
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              What is she to you?
            </h2>
            <p className="text-muted-foreground">Select your relationship</p>
            <div className="flex flex-wrap gap-3">
              {RELATIONSHIPS.map((r) => (
                <Badge
                  key={r}
                  variant={formData.relationship === r ? "default" : "outline"}
                  className={`cursor-pointer text-base px-5 py-2.5 transition-all ${
                    formData.relationship === r
                      ? "shadow-md"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setFormData({ ...formData, relationship: r })}
                >
                  {r}
                </Badge>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              What makes her special?
            </h2>
            <p className="text-muted-foreground">
              Pick 1–3 personality traits ({formData.traits.length}/3)
            </p>
            <div className="flex flex-wrap gap-3">
              {TRAITS.map((t) => (
                <Badge
                  key={t}
                  variant={formData.traits.includes(t) ? "default" : "outline"}
                  className={`cursor-pointer text-base px-5 py-2.5 transition-all ${
                    formData.traits.includes(t)
                      ? "shadow-md"
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => toggleTrait(t)}
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Her favorite flower?
            </h2>
            <p className="text-muted-foreground">Choose a flower for the card</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {FLOWERS.map((f) => {
                const emojis: Record<string, string> = {
                  Rose: "🌹", Sunflower: "🌻", Lily: "🌷", Lavender: "💜",
                  Orchid: "🌺", Tulip: "🌷", Peony: "🌸", Dahlia: "🏵️",
                };
                return (
                  <div
                    key={f}
                    onClick={() => setFormData({ ...formData, flower: f })}
                    className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                      formData.flower === f
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="text-3xl block mb-1">{emojis[f]}</span>
                    <span className="font-body text-sm text-foreground">{f}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Pick a color palette
            </h2>
            <p className="text-muted-foreground">Set the mood for the card</p>
            <div className="grid gap-3">
              {COLOR_PALETTES.map((c) => (
                <div
                  key={c.label}
                  onClick={() => setFormData({ ...formData, colorPalette: c.value })}
                  className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                    formData.colorPalette === c.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-display text-lg font-semibold text-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Add a personal touch
            </h2>
            <p className="text-muted-foreground">
              Write a short message or wish (optional)
            </p>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="You inspire everyone around you..."
              className="text-base font-body min-h-[120px]"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.message.length}/200
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Progress */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 mt-10 w-full max-w-lg">
        <Button variant="outline" onClick={prev} className="flex-1 py-5">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={next}
          disabled={!canProceed()}
          className="flex-1 py-5"
        >
          {step === steps.length - 1 ? (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Card
            </>
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GreetingWizard;
