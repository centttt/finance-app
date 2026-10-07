/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        hover: 'var(--bg-hover)',
        borderSubtle: 'var(--border-subtle)',
        borderStrong: 'var(--border-strong)',
        primary: 'var(--primary)',
        primaryHover: 'var(--primary-hover)',
        primaryActive: 'var(--primary-active)',
        primarySubtle: 'var(--primary-subtle)',
        accent: 'var(--accent)',
        income: 'var(--income)',
        success: 'var(--success)',
        expense: 'var(--expense)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        info: 'var(--info)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textMuted: 'var(--text-muted)',
        textInverse: 'var(--text-inverse)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
      }
    },
  },
  plugins: [],
}
