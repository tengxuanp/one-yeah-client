import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        custom: ['VT323','GamepauseRegular','AmericanCaptain','sans-serif'],
      },
      // COLOR PALETTE
      colors:{
        'red-retro': '#881400',
        'red-retro-hover':'#A81000',
        'red-retro-active':'#420b01',
        'green-retro': '#005800',
        'green-retro-hover': '#006800',
        'green-retro-active': '#012601',
        'grey-retro': '#7C7C7C',
        'grey-retro-hover': '#BCBCBC',
        'grey-retro-active': '#454545',
      },
    },
  },
  plugins: [],
}
export default config
