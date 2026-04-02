import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* ── AIfocus Dark Palette ── */
        base: '#0F1115',
        surface: '#171A21',
        'surface-alt': '#1E2230',
        'surface-hover': '#252A3A',
        primary: '#0AADCF',
        'primary-hover': '#00CFFF',
        'primary-muted': 'rgba(10, 173, 207, 0.15)',
        accent: '#FFB347',
        'accent-hover': '#FFC46B',
        'accent-muted': 'rgba(255, 179, 71, 0.15)',
        text: '#F3F4F6',
        muted: '#A7AFBF',
        'muted-dim': '#6B7280',
        error: '#EF4444',
        success: '#22C55E',
        /* ── Semantic aliases (backward-compat) ── */
        background: '#0F1115',
        'on-surface': '#F3F4F6',
        'on-surface-variant': '#A7AFBF',
        secondary: '#0AADCF',
        tertiary: '#FFB347',
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-tertiary': '#0F1115',
        outline: '#2E3344',
        'outline-variant': '#3A4055',
        'surface-container-low': '#171A21',
        'surface-container': '#1E2230',
        'surface-container-high': '#252A3A',
        'surface-container-highest': '#2E3344',
        'on-tertiary-container': '#FFB347',
        'surface-dim': '#0F1115',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        label: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '9999px',
        pill: '0.75rem',
      },
      maxWidth: {
        content: '65ch',
        wide: '72rem',
      },
    },
  },
  plugins: [typography],
};
