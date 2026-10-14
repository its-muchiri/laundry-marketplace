/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        midnight: 'rgb(var(--midnight) / <alpha-value>)',
        ivory: 'rgb(var(--ivoy) / <alpha-value>)',
        bone: 'rgb(var(--bone) / <alpha-value>)',
        champagne: 'rgb(var(--champagne) / <alpha-value>)',
        'champagne-soft': 'rgb(var(--champagne-soft) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        'on-dark': 'rgb(var(--on-dark) / <alpha-value>)',
        'on-dark-muted': 'rgb(var(--on-dark-muted) / <alpha-value>)',
        'on-light': 'rgb(var(--on-light) / <alpha-value>)',
        'on-light-muted': 'rgb(var(--on-light-muted) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',

        background: 'rgb(var(--ink) / <alpha-value>)',
        'background-light': 'rgb(var(--ivory) / <alpha-value>)',
        foreground: 'rgb(var(--on-dark) / <alpha-value>)',
        'foreground-light': 'rgb(var(--on-light) / <alpha-value>)',
        muted: 'rgb(var(--midnight) / <alpha-value>)',
        'muted-light': 'rgb(var(--bone) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--on-dark-muted) / <alpha-value>)',
        'muted-foreground-light': 'rgb(var(--on-light-muted) / <alpha-value>)',

        surface: 'rgb(var(--bone) / <alpha-value>)',
        'surface-raised': 'rgb(var(--ivory) / <alpha-value>)',

        primary: 'rgb(var(--champagne) / <alpha-value>)',
        'primary-strong': 'rgb(var(--champagne-soft) / <alpha-value>)',
        'primary-soft': 'rgba(var(--champagne) / 0.15)',
        'primary-foreground': 'rgb(var(--ink) / <alpha-value>)',
        'primary-foreground-light': 'rgb(var(--ink) / <alpha-value>)',

        secondary: 'rgb(var(--sage) / <alpha-value>)',
        'secondary-strong': 'rgba(var(--sage) / 0.9)',
        'secondary-soft': 'rgba(var(--sage) / 0.15)',
        'secondary-foreground': 'rgb(var(--ink) / <alpha-value>)',

        destructive: 'rgb(var(--error) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--ivory) / <alpha-value>)',

        card: 'rgb(var(--midnight) / <alpha-value>)',
        'card-light': 'rgb(var(--ivory) / <alpha-value>)',
        'card-foreground': 'rgb(var(--on-dark) / <alpha-value>)',
        'card-foreground-light': 'rgb(var(--on-light) / <alpha-value>)',

        border: 'var(--hairline-dark)',
        'border-light': 'var(--hairline-light)',
        input: 'var(--hairline-dark)',
        'input-light': 'var(--hairline-light)',
        ring: 'rgb(var(--champagne) / <alpha-value>)',
      },
      borderRadius: {
        editorial: 'var(--radius-editorial)',
        glass: 'var(--radius-glass)',
      },
      boxShadow: {
        soft: '0 30px 80px -30px rgba(0,0,0,.55)',
        lifted: '0 30px 80px -30px rgba(0,0,0,.55)',
        glass: '0 30px 80px -30px rgba(0,0,0,.55)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'orb-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-3%, 4%, 0) scale(0.96)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(240%) skewX(-12deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'sheet-in-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'sheet-out-top': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'sheet-in-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'sheet-out-bottom': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'sheet-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'sheet-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'orb-drift': 'orb-drift var(--orb-duration, 45s) ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        shimmer: 'shimmer 3.5s var(--ease-editorial, cubic-bezier(0.22,1,0.36,1)) infinite',
        'fade-in': 'fade-in 200ms var(--ease-editorial)',
        'fade-out': 'fade-out 200ms var(--ease-editorial)',
        'accordion-down': 'accordion-down 300ms var(--ease-editorial)',
        'accordion-up': 'accordion-up 300ms var(--ease-editorial)',
        'sheet-in-top': 'sheet-in-top 400ms var(--ease-editorial)',
        'sheet-out-top': 'sheet-out-top 400ms var(--ease-editorial)',
        'sheet-in-bottom': 'sheet-in-bottom 400ms var(--ease-editorial)',
        'sheet-out-bottom': 'sheet-out-bottom 400ms var(--ease-editorial)',
        'sheet-in-right': 'sheet-in-right 400ms var(--ease-editorial)',
        'sheet-out-right': 'sheet-out-right 400ms var(--ease-editorial)',
      },
    },
  },
  plugins: [],
};