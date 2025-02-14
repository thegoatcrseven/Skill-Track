/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'neon-blue': '#4DEEEA',
        'neon-pink': '#FF00FF',
        'neon-purple': '#9D00FF',
        'neon-yellow': '#FFE700',
        'neon-glow': 'rgba(57, 255, 20, 0.8)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          'from': {
            'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #39FF14, 0 0 40px #39FF14',
          },
          'to': {
            'text-shadow': '0 0 20px #fff, 0 0 30px #4DEEEA, 0 0 40px #4DEEEA, 0 0 50px #4DEEEA',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      boxShadow: {
        'neon-green': '0 0 5px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14',
        'neon-blue': '0 0 5px #4DEEEA, 0 0 20px #4DEEEA, 0 0 30px #4DEEEA',
        'neon-pink': '0 0 5px #FF00FF, 0 0 20px #FF00FF, 0 0 30px #FF00FF',
      },
    },
  },
  plugins: [],
}
