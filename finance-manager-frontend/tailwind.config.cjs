module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb', // blue-600
          light: '#3b82f6',   // blue-500
          dark: '#1e40af',    // blue-800
        },
        accent: {
          DEFAULT: '#22d3ee', // cyan-400
          light: '#67e8f9',   // cyan-300
          dark: '#0e7490',    // cyan-800
        },
        glass: 'rgba(255,255,255,0.7)',
        glassDark: 'rgba(30,41,59,0.7)',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, #e0e7ff 0%, #f0fdf4 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      },
      fontFamily: {
        heading: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31,38,135,0.18)',
        neu: '0 2px 8px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      keyframes: {
        'fadeInUp': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) both',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
