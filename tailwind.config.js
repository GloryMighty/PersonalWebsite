/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundColor: {
        'glass': 'rgba(15, 23, 42, 0.7)',
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'matrix-fall': 'matrixFall 5s linear infinite',
        'slow-pulse': 'slowPulse 10s ease-in-out infinite'
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { textShadow: '0 0 4px rgba(255,255,255,0.1)' },
          '50%': { textShadow: '0 0 20px rgba(255,255,255,0.3)' },
        },
        matrixFall: {
          '0%': { 
            transform: 'translateY(-10vh)', 
            opacity: '0.1' 
          },
          '100%': { 
            transform: 'translateY(110vh)', 
            opacity: '0.8' 
          },
        },
        slowPulse: {
          '0%, 100%': { 
            opacity: '0.7',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.9',
            transform: 'scale(1.05)'
          }
        }
      },
      letterSpacing: {
        'techwide': '0.15em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    function({ addComponents }) {
      addComponents({
        '.content-glass': {
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '0.5rem',
        },
        '.tech-text': {
          fontFamily: 'var(--font-space-grotesk)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: '600',
        },
      })
    },
  ],
} 