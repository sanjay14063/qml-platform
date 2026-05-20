import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f7f3ea',
        card: '#fffdf8',
        ink: '#111111',
        'ink-soft': '#2a2a2a',
        muted: '#666158',
        line: '#ded8cb',
        'line-strong': '#c8beaa',
        accent: '#2f6f68',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(17, 17, 17, 0.06)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '75ch',
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
