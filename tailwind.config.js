/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        supreme: ['var(--font-supreme)'],
        cabinet: ['var(--font-cabinet)'],
        product: ['var(--font-product)'],
        copernicus: ['var(--font-copernicus)']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      },
      typography: {
        colorful: {
          css: {
            p: {
              color: '#854C28'
            },
            strong: {
              color: '#59321A'
            },
            'h1,h2,h3,h4,h5,h6': {
              color: '#6F6621'
            }
          }
        }
      }
    },
    keyframes: {
      'background-shine': {
        from: {
          backgroundPosition: '0 0'
        },
        to: {
          backgroundPosition: '-200% 0'
        }
      },
      'border-beam': {
        '100%': {
          'offset-distance': '100%'
        }
      },
      'logo-cloud': {
        from: { transform: 'translateX(0)' },
        to: { transform: 'translateX(calc(-100% - 4rem))' }
      },

      orbit: {
        '0%': {
          transform:
            'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
        },
        '100%': {
          transform:
            'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
        }
      },
      gradient: {
        to: {
          backgroundPosition: 'var(--bg-size) 0'
        }
      },
      shimmer: {
        '0%, 90%, 100%': {
          'background-position': 'calc(-100% - var(--shimmer-width)) 0'
        },
        '30%, 60%': {
          'background-position': 'calc(100% + var(--shimmer-width)) 0'
        }
      },
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' }
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' }
      },
      buttonheartbeat: {
        '0%': {
          'box-shadow': '0 0 0 0 theme("colors.blue.500")',
          transform: 'scale(1)'
        },
        '50%': {
          'box-shadow': '0 0 0 7px theme("colors.blue.500/0")',
          transform: 'scale(1.05)'
        },
        '100%': {
          'box-shadow': '0 0 0 0 theme("colors.blue.500/0")',
          transform: 'scale(1)'
        }
      }
    },
    animation: {
      'logo-cloud': 'logo-cloud 30s linear infinite', // Adjust duration and timing as needed for your design.
      orbit: 'orbit calc(var(--duration)*1s) linear infinite',
      gradient: 'gradient 8s linear infinite',
      shimmer: 'shimmer 8s infinite',
      buttonheartbeat: 'buttonheartbeat 2s infinite ease-in-out',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      'background-shine': 'background-shine 2s linear infinite'
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')]
}
