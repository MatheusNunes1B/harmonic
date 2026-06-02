module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        harmonic: {
          bg: '#07070b',
          panel: '#11111a',
          card: '#181824',
          neon: '#8b5cf6',
          lime: '#7cff6b',
          text: '#f8fafc',
          muted: '#a1a1aa'
        }
      },
      boxShadow: {
        glow: '0 0 40px rgba(139,92,246,.35)'
      },
      backgroundImage: {
        aura: 'radial-gradient(circle at top left, rgba(124,255,107,.25), transparent 28%), radial-gradient(circle at top right, rgba(139,92,246,.35), transparent 32%)'
      }
    }
  },
  plugins: []
};
