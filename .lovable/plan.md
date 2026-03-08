

## Women's Day Image Generator 🌸

A beautiful, artistic app that creates personalized Women's Day greeting images using AI image generation.

### Flow

**1. Welcome Screen**
- Festive Women's Day themed landing page with floral/artistic design
- "Create a Special Greeting" call-to-action button

**2. Personalization Form (Step-by-step wizard)**
Users answer 5-6 questions about the person they're wishing:
- **Name** — Who are you wishing?
- **Relationship** — Mother, sister, friend, colleague, partner, etc.
- **Personality** — Choose 2-3 traits: strong, kind, creative, adventurous, nurturing, inspiring, etc.
- **Favorite flower** — Rose, sunflower, lily, lavender, orchid, etc.
- **Color palette** — Warm tones, cool tones, pastels, vibrant, etc.
- **Personal message** — A short heartfelt note to include

Each step shown as an elegant card with smooth transitions.

**3. Image Generation**
- AI generates an artistic/illustrated Women's Day greeting card incorporating the personalization details
- Uses Lovable AI Gateway with Gemini image generation model
- Shows a beautiful loading animation while generating
- Edge function crafts a detailed prompt from user answers and calls the image generation API

**4. Result Screen**
- Display the generated image prominently
- Show the person's name and personal message
- "Download Image" button to save as PNG
- "Create Another" button to start over

### Design
- Elegant, warm color palette with purples, pinks, and golds
- Floral decorative elements throughout
- Smooth animations between steps
- Mobile-friendly responsive design

### Backend
- Lovable Cloud edge function to handle AI image generation securely
- Uses `google/gemini-2.5-flash-image` model via Lovable AI Gateway

