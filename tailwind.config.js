/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060816',
        mist: '#c8d2ff',
        glow: '#7c3aed',
        cyan: '#22d3ee',
        peach: '#fb7185',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 24px 80px rgba(15, 23, 42, 0.32)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top, rgba(34, 211, 238, 0.18), transparent 30%), radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.16), transparent 24%), linear-gradient(135deg, rgba(6, 8, 22, 0.98), rgba(17, 24, 39, 0.92))',
      },
    },
  },
  plugins: [],
}
