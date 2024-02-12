import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'rooney-sans':['rooney-sans', 'sans-serif'],  
        
      },
      fontSize: {
        '3xl': '32px',
      },
    },
  },
  plugins: [],
} satisfies Config;
