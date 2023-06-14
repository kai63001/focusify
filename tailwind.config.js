/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: "#171717",
        primaryDark: "#1F1F1F",
        primaryDark2: "#121212",
        primaryLight: "#434343",
        secondary: "#F2F2F2",
        secondaryDark: "#808080",
        blueBg: "#2563EB"
      }
    },
  },
  layers: {
    'no-tailwindcss': {
      // Add any styles you want to disable here
      '.no-tailwindcss': {
        all: 'unset',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
