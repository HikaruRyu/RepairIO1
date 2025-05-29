/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gatsby: {
          gold: {
            50: '#f7f3e9',
            100: '#efe7d3',
            200: '#e6d5b0',
            300: '#d4bc89',
            400: '#c3a362',
            500: '#b28b4b', // Main gold color - more antique
            600: '#8e7039',
            700: '#6a552b',
            800: '#47391c',
            900: '#231c0e',
          },
          iron: {
            50: '#f7f8f8',
            100: '#e8eaec',
            200: '#cfd3d7',
            300: '#a8aeb6',
            400: '#8b939e',
            500: '#6e7684', // Main iron color
            600: '#515761',
            700: '#393d44',
            800: '#242629',
            900: '#121315',
          },
          green: {
            50: '#e6f5f0',
            100: '#ccebe1',
            200: '#99d7c3',
            300: '#66c3a5',
            400: '#33af87',
            500: '#009b69', // Gatsby's green light
            600: '#007c54',
            700: '#005d3f',
            800: '#003e2a',
            900: '#001f15',
          },
          artdeco: {
            50: '#f5f4f0',
            100: '#e8e5dd',
            200: '#d1ccbb',
            300: '#bab399',
            400: '#a39a77',
            500: '#8c8155', // More muted brown to complement gold
            600: '#706745',
            700: '#544d34',
            800: '#383322',
            900: '#1c1a11',
          },
          champagne: {
            50: '#fdfbf7',
            100: '#f9f5ed',
            200: '#f2e9d7',
            300: '#ebddc1',
            400: '#e4d1ab',
            500: '#ddc595', // Warmer champagne
            600: '#b19e77',
            700: '#857659',
            800: '#594f3c',
            900: '#2c271e',
          },
          pearl: {
            50: '#fefefe',
            100: '#faf9f7',
            200: '#f2f0eb',
            300: '#e9e6df',
            400: '#e1dcd3',
            500: '#d8d2c7', // Warmer pearl white
            600: '#ada89f',
            700: '#827e77',
            800: '#57544f',
            900: '#2b2a28',
          },
          night: {
            50: '#e9e9ea',
            100: '#d3d3d5',
            200: '#a6a7ab',
            300: '#7a7b81',
            400: '#4d4f57',
            500: '#21232d', // Rich dark blue-black from poster
            600: '#1a1c24',
            700: '#14151b',
            800: '#0d0e12',
            900: '#070709',
          }
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        gatsby: ['Gatsby', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(45deg, #b28b4b 0%, #d4bc89 25%, #b28b4b 50%, #8e7039 75%, #b28b4b 100%)',
      },
    },
  },
  plugins: [],
} 