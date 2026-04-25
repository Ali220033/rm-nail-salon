/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        aqua: "#64E0DA",
        plum: "#32292E",
        gold: "#B09013",
        cream: "#F1ED9B",
        mist: "#709FA1",
        ink: "#171215"
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(100, 224, 218, 0.24)",
        gold: "0 18px 70px rgba(176, 144, 19, 0.16)"
      },
      backgroundImage: {
        "salon-radial":
          "radial-gradient(circle at 20% 20%, rgba(100,224,218,.23), transparent 30%), radial-gradient(circle at 78% 0%, rgba(176,144,19,.2), transparent 28%), linear-gradient(145deg, #171215 0%, #32292E 58%, #1f191d 100%)"
      }
    }
  },
  plugins: []
};
