/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#F59E0B",
        "brand-secondary": "#FBBF24",
        "brand-cta": "#8B5CF6",
        "brand-bg": "#0F172A",
        "glass-surface": "rgba(255,255,255,0.04)",
        success: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        orbitron: ["Orbitron_400Regular"],
        "orbitron-medium": ["Orbitron_500Medium"],
        "orbitron-semibold": ["Orbitron_600SemiBold"],
        "orbitron-bold": ["Orbitron_700Bold"],
        exo2: ["Exo2_400Regular"],
        "exo2-medium": ["Exo2_500Medium"],
        "exo2-semibold": ["Exo2_600SemiBold"],
        "exo2-bold": ["Exo2_700Bold"],
      },
    },
  },
  plugins: [],
};
