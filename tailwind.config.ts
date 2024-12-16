import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		boxShadow: {
			'custom': '0px 9px 40px 0px #0000001B',
			'custom-two': '0px 8.06px 35.83px 0px #0000001B',
			'custom-light': '0px 4.24px 21.2px 0px #EEEEEE80',
			'button-custom': '0px 40px 72px -12px #10192824',
			'custom-sm': '0px 4px 6px -2px #10192808',
			'custom-lg': '0px 16px 24px -4px #10192814',
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
