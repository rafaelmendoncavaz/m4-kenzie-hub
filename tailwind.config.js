/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      },
      boxShadow: {
        shape: "0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)"
      },
      colors: {
        watermelon: "#ff577f",
        strawberry: "#ff427f",
        success: "#3fe864",
        negative: "#e83f5b",
        congobrown: "#59323f"
      },
      screens: {
        "mobile": {
          "max": "640px"
        }
      }
    },
  },
  plugins: [],
}