# 🌸 Wish Weaver — AI Women's Day Greeting Card Generator

Create personalized, AI-generated International Women's Day greeting cards with a beautiful step-by-step wizard experience.

**🔗 Live App:** [wish-weaver.lovable.app](https://id-preview--4a51156f-2e10-49d9-8151-77630087fa73.lovable.app)

---

## ✨ Features

- **Step-by-step wizard** — Name → Relationship → Personality traits → Flower → Color palette → Personal message
- **AI-powered image generation** — Creates unique watercolor-style greeting cards using Google Gemini via Lovable AI Gateway
- **Auto-scrolling gallery** — Infinite carousel showcasing example cards on the welcome screen
- **Community gallery** — Users can optionally share their generated cards to inspire others
- **Dark mode** — Full light/dark theme toggle with localStorage persistence
- **Animated loading screen** — Rotating progress messages with floating petal animations
- **Download & share** — One-click download of the generated card as PNG

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion 11 |
| **Backend** | Lovable Cloud (Supabase) |
| **AI Model** | Google Gemini 2.5 Flash (image generation) |
| **Edge Functions** | Deno (Supabase Edge Functions) |
| **Database** | PostgreSQL (gallery_cards table) |
| **Routing** | React Router v6 |
| **State Management** | React useState + TanStack Query |

## 📁 Project Structure

```
src/
├── components/
│   ├── WelcomeScreen.tsx      # Landing page with auto-scrolling gallery
│   ├── GreetingWizard.tsx     # Multi-step form wizard
│   ├── GeneratingScreen.tsx   # Animated loading with progress messages
│   ├── ResultScreen.tsx       # Card display + download + gallery save
│   └── ThemeToggle.tsx        # Dark/light mode toggle
├── lib/
│   └── greeting-data.ts       # Form options (relationships, traits, flowers, palettes)
├── pages/
│   └── Index.tsx              # Main page orchestrating app state
└── assets/                    # Example card images for gallery

supabase/
└── functions/
    └── generate-greeting/
        └── index.ts           # Edge function: builds prompt → calls Gemini → returns image
```

## 🚀 Run Locally

### Prerequisites

- Node.js 18+ (or Bun)
- npm, yarn, or bun

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd wish-weaver

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

> **Note:** The AI image generation requires Lovable Cloud's backend (Supabase Edge Functions + Lovable AI Gateway). Running locally will work for the UI, but generating cards requires the cloud backend to be connected.

## 🗄️ Database Schema

```sql
-- Public gallery for user-submitted cards
CREATE TABLE public.gallery_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 🎨 How It Works

1. User fills out a 6-step wizard: name, relationship, personality traits, flower, color palette, and an optional message
2. The data is sent to an edge function that constructs a detailed image generation prompt
3. The prompt is sent to Google Gemini 2.5 Flash via the Lovable AI Gateway
4. Gemini generates a unique watercolor-style greeting card
5. The card is displayed with options to download or share to the community gallery

---

## 💡 One-Shot Build Prompt

> If you wanted to recreate this app from scratch in Lovable, here's a comprehensive prompt that captures everything we built through iteration:

```markdown
Build an AI-powered International Women's Day greeting card generator called "Wish Weaver" with the following:

**Welcome Screen:**
- Centered hero section with a bouncing 🌸 emoji, "Happy Women's Day" title in a display font,
  subtitle about creating AI-generated greeting cards, and a "Create a Special Greeting" CTA button
- Below the hero, an auto-scrolling infinite carousel of example card images (continuous loop
  using framer-motion)
- Floating petal animations in the background
- Load user-submitted cards from a "gallery_cards" database table and append them to the static
  examples in the carousel

**Multi-Step Wizard (6 steps with progress bar):**
1. Name — Text input for the recipient's name
2. Relationship — Grid of selectable cards: Mother, Sister, Friend, Colleague, Partner, Daughter,
   Grandmother, Mentor, Wife
3. Personality Traits — Multi-select grid (pick up to 3): Strong, Kind, Creative, Adventurous,
   Nurturing, Inspiring, Resilient, Compassionate, Fearless, Wise, Joyful, Graceful
4. Favorite Flower — Grid with emoji icons: Rose 🌹, Sunflower 🌻, Lily 💮, Lavender 💜,
   Orchid 🌺, Tulip 🌷, Peony 🌸, Dahlia 🏵️
5. Color Palette — Selectable options: Warm Sunset, Cool Ocean, Soft Pastels, Vibrant Garden,
   Royal Elegance (each with descriptive color values)
6. Personal Message — Optional textarea for a custom message

Each step has Back/Next buttons. The progress bar shows which step you're on with labeled segments.

**Loading Screen:**
- Animated rotating messages every 2.5 seconds with framer-motion AnimatePresence
- Progress bar that fills over ~20 seconds
- Floating petal animations

**Edge Function (generate-greeting):**
- Takes the wizard data and builds a detailed image generation prompt
- Uses Google Gemini 2.5 Flash via the Lovable AI Gateway (ai.gateway.lovable.dev)
- Prompt: square watercolor greeting card, full background coverage, flower arrangements in all
  four corners, circular floral wreath in center with name, "Happy Women's Day", relationship,
  traits in cursive, and optional personal message at the bottom
- Handle 429 rate limits and 402 credit exhaustion gracefully

**Result Screen:**
- Shows the generated card with the recipient's name as heading
- Download button (saves as PNG)
- After download, prompt asking to add card to public gallery with Yes/No
- If yes, save to gallery_cards table and show success toast
- "Try Again" and "Create Another" buttons

**Dark Mode:**
- Toggle button (sun/moon icon) in top-right corner
- Persists in localStorage, uses document.documentElement.classList

**Design:**
- shadcn/ui + Tailwind CSS, elegant feminine aesthetic
- Display font for headings, soft rounded buttons, rose/lavender/gold accents
- CSS custom properties (HSL) for dark mode support
- Framer Motion for all animations

**Database:**
- gallery_cards table: id (UUID), image_url (TEXT), name (TEXT), created_at (TIMESTAMPTZ)
- Public read + insert (no auth required)
```

---

## 📝 Development Journey

This app was built iteratively through conversation in Lovable:

1. **Initial build** — Core wizard flow + AI card generation with Gemini
2. **Gallery examples** — Added example card images to inspire users
3. **UX improvements** — Animated loading messages with progress bar, dark mode toggle
4. **Community gallery** — Save-to-gallery feature after download with user permission
5. **Auto-scroll carousel** — Replaced manual scroll with infinite auto-scrolling animation
6. **Polish** — Fixed emoji rendering issues, removed unused assets, refined the gallery

---

Built with ❤️ using [Lovable](https://lovable.dev)
