export interface GreetingFormData {
  name: string;
  relationship: string;
  traits: string[];
  flower: string;
  colorPalette: string;
  message: string;
}

export const RELATIONSHIPS = [
  "Mother", "Sister", "Friend", "Colleague", "Partner", "Daughter", "Grandmother", "Mentor", "Wife"
];

export const TRAITS = [
  "Strong", "Kind", "Creative", "Adventurous", "Nurturing", "Inspiring",
  "Resilient", "Compassionate", "Fearless", "Wise", "Joyful", "Graceful"
];

export const FLOWERS = [
  "Rose", "Sunflower", "Lily", "Lavender", "Orchid", "Tulip", "Peony", "Dahlia"
];

export const COLOR_PALETTES = [
  { label: "Warm Sunset", value: "warm sunset tones with oranges, pinks, and golds" },
  { label: "Cool Ocean", value: "cool ocean tones with blues, teals, and silvers" },
  { label: "Soft Pastels", value: "soft pastel tones with blush pink, mint, and cream" },
  { label: "Vibrant Garden", value: "vibrant garden tones with magenta, emerald, and violet" },
  { label: "Royal Elegance", value: "royal elegant tones with deep purple, gold, and burgundy" },
];
