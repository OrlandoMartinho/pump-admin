module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-1": "bounceUpDown 0.8s ease-in-out infinite",
        "bounce-2": "bounceUpDown 1s ease-in-out infinite",
        "bounce-3": "bounceUpDown 1.2s ease-in-out infinite",
        "bounce-4": "bounceUpDown 1.4s ease-in-out infinite",
        "bounce-5": "bounceUpDown 1.6s ease-in-out infinite",
        "bounce-6": "bounceUpDown 1.8s ease-in-out infinite",
       "slide-up": "slideUp 0.8s ease-out", // Entrada de baixo para cima
        "slide-down": "slideDown 0.8s ease-out", // Entrada de cima para baixo
        "slide-left": "slideLeft 0.8s ease-out", // Entrada da esquerda
        "slide-right": "slideRight 0.8s ease-out", // Entrada da direita
      },
      keyframes: {
        bounceUpDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
