import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { GreetingFormData } from "@/lib/greeting-data";
import WelcomeScreen from "@/components/WelcomeScreen";
import GreetingWizard from "@/components/GreetingWizard";
import GeneratingScreen from "@/components/GeneratingScreen";
import ResultScreen from "@/components/ResultScreen";

type AppState = "welcome" | "wizard" | "generating" | "result" | "error";

const Index = () => {
  const [state, setState] = useState<AppState>("welcome");
  const [formData, setFormData] = useState<GreetingFormData | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = async (data: GreetingFormData) => {
    setFormData(data);
    setState("generating");

    try {
      const { data: result, error } = await supabase.functions.invoke("generate-greeting", {
        body: data,
      });

      if (error) throw error;
      if (result?.error) throw new Error(result.error);
      if (!result?.imageUrl) throw new Error("No image was generated. Please try again.");

      setImageUrl(result.imageUrl);
      setState("result");
    } catch (err: any) {
      console.error("Generation error:", err);
      toast({
        title: "Generation failed",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setState("wizard");
    }
  };

  const handleRetry = () => {
    if (formData) handleGenerate(formData);
  };

  const handleReset = () => {
    setFormData(null);
    setImageUrl("");
    setState("welcome");
  };

  return (
    <>
      {state === "welcome" && <WelcomeScreen onStart={() => setState("wizard")} />}
      {state === "wizard" && (
        <GreetingWizard onSubmit={handleGenerate} onBack={() => setState("welcome")} />
      )}
      {state === "generating" && <GeneratingScreen />}
      {state === "result" && formData && (
        <ResultScreen
          imageUrl={imageUrl}
          name={formData.name}
          message={formData.message}
          onReset={handleReset}
        />
      )}
    </>
  );
};

export default Index;
