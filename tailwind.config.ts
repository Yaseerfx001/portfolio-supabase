import type { Config } from "tailwindcss";

// Design tokens for the site. Keeping these in one place means the whole
// site's look can be re-themed by changing colors here instead of hunting
// through every component.
const config: Config = {
  darkMode: "class", // we toggle a "dark" class on <html>, see context/ThemeContext.tsx
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paper-like neutral background instead of a generic white/black
        paper: {
          light: "#F7F6F2",
          dark: "#13151A",
        },
        ink: {
          light: "#1C1D1F",
          dark: "#EDEEF0",
        },
        // Single accent color used sparingly (buttons, links, active states)
        accent: {
          DEFAULT: "#1F6F63", // deep teal - nods to data/graph plotting lines
          light: "#2E8C7E",
          dark: "#154F46",
        },
        // Secondary muted tone for tags / secondary text
        slateline: {
          DEFAULT: "#445282",
        },
      },
      fontFamily: {
        // Bold geometric display font for headlines gives them presence;
        // sans stays plain and legible for body copy and data labels.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
