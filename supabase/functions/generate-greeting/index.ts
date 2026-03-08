import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, relationship, traits, flower, colorPalette, message } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build a rich prompt from the user's answers
    const traitStr = (traits as string[]).join(", ");
    const prompt = `Create a beautiful artistic illustrated International Women's Day greeting card as a SQUARE image (1:1 aspect ratio).

CRITICAL REQUIREMENTS:
- The ENTIRE background must be fully covered — no white gaps, no blank corners, no empty edges.
- Use a soft watercolor wash across the FULL background in ${colorPalette} tones.
- Place large ${flower} flower arrangements in ALL FOUR corners, with petals and leaves extending to the very edges.
- Scatter small flower buds, petals, and delicate leaves across any remaining background space.

DESIGN:
- In the center, place a circular floral wreath made of ${flower} flowers.
- Inside the wreath, write "${name}" in elegant script at the top.
- Below the name, write "Happy Women's Day" in bold elegant serif typography.
- Below that, write "${relationship}" in smaller italic script.
- Below the wreath, write "${traitStr}" in flowing cursive script.
${message ? `- At the bottom of the card, write EXACTLY this text with no spelling changes: "${message}"` : ""}

STYLE: Elegant watercolor illustration, hand-painted feel, soft and dreamy. Every pixel of the canvas must have color — fill corners with flowers, fill gaps with watercolor wash. No photorealistic faces. No empty white space anywhere.`;

    console.log("Generating image with prompt:", prompt);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [{ role: "user", content: prompt }],
          modalities: ["image", "text"],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textContent = data.choices?.[0]?.message?.content;

    if (!imageUrl) {
      throw new Error("No image was generated");
    }

    return new Response(
      JSON.stringify({ imageUrl, text: textContent }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-greeting error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
