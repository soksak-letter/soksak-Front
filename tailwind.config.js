export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: 'var(--color-primary-900)',
          850: 'var(--color-primary-850)',
          800: 'var(--color-primary-800)',
          700: 'var(--color-primary-700)',
          600: 'var(--color-primary-600)',
          500: 'var(--color-primary-500)',
          400: 'var(--color-primary-400)',
          300: 'var(--color-primary-300)',
          200: 'var(--color-primary-200)',
          100: 'var(--color-primary-100)',
        },
        secondary: {
          900: 'var(--color-secondary-900)',
          800: 'var(--color-secondary-800)',
          700: 'var(--color-secondary-700)',
          600: 'var(--color-secondary-600)',
          500: 'var(--color-secondary-500)',
          400: 'var(--color-secondary-400)',
          300: 'var(--color-secondary-300)',
        },
        status: {
          alert: 'var(--color-status-alert)',
          caution: 'var(--color-status-caution)',
          positive: 'var(--color-status-positive)',
        },
        text: {
          strong: 'var(--color-text-strong)',
          normal: 'var(--color-text-normal)',
          alternative: 'var(--color-text-alternative)',
          assistive: 'var(--color-text-assistive)',
          disable: 'var(--color-text-disable)',
        },
        grey: {
          900: 'var(--color-grey-900)',
          800: 'var(--color-grey-800)',
          700: 'var(--color-grey-700)',
          600: 'var(--color-grey-600)',
          500: 'var(--color-grey-500)',
          400: 'var(--color-grey-400)',
          300: 'var(--color-grey-300)',
          200: 'var(--color-grey-200)',
          100: 'var(--color-grey-100)',
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
        },
        line: {
          normal: 'var(--color-line-normal)',
          alternative: 'var(--color-line-alternative)',
        },
        white: 'var(--color-white)',
        black: 'var(--color-black)',
      },

      fontFamily: {
        // hallym: 'var(--font-hallym)',
        pretendard: 'var(--font-pretendard)',
      },

      fontSize: {
        // DS: size / line-height
        largeTitle: ['32px', { lineHeight: '1.2' }],

        title1: ['22px', { lineHeight: '1.2' }],
        title2: ['20px', { lineHeight: '1.2' }],

        title3: ['18px', { lineHeight: '1.6' }],
        body1: ['18px', { lineHeight: '1.6' }],

        body2: ['16px', { lineHeight: '1.6' }],
        body3: ['16px', { lineHeight: '1.6' }],

        body4: ['14px', { lineHeight: '1.7' }],
        body5: ['14px', { lineHeight: '1.7' }],

        detail: ['12px', { lineHeight: '1.7' }],
      },

      borderRadius: {
        xl: '16px', // rounded-xl
        '2xl': '24px', // rounded-2xl
      },

      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
        modal: '0 10px 30px rgba(0,0,0,0.18)',
      },
    },
  },
};
