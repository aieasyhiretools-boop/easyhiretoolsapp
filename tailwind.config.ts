import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          400: '#0052cc',
          500: '#0052cc',
          600: '#003fa3',
          700: '#002d7a',
          900: '#001a47',
        },
        accent: {
          400: '#ff6b35',
          500: '#ff6b35',
          600: '#e55a24',
          700: '#cc4913',
        },
        dark: {
          900: '#0a0e27',
          800: '#1a1f3a',
          700: '#2a3050',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 82, 204, 0.3)',
        'glow-accent': '0 0 20px rgba(255, 107, 53, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
