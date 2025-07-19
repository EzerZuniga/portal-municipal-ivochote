/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/*.html",
    "./js/*.js",
    "./src/**/*.{html,js}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores institucionales del gobierno peruano
        peru: {
          red: '#d52b1e',
          white: '#ffffff',
          flag: {
            red: '#d91023',
            white: '#ffffff'
          }
        },
        // Colores municipales personalizados
        municipal: {
          primary: '#1e40af',
          secondary: '#059669',
          accent: '#dc2626',
          dark: '#1f2937',
          light: '#f8fafc'
        },
        // Paleta extendida de azules institucionales
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        // Colores para transparencia y gobierno
        transparency: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'outline': '0 0 0 3px rgba(59, 130, 246, 0.5)',
        'none': 'none',
        // Sombras personalizadas para elementos municipales
        'municipal': '0 4px 20px rgba(30, 64, 175, 0.15)',
        'municipal-lg': '0 10px 40px rgba(30, 64, 175, 0.2)',
        'peru': '0 4px 20px rgba(213, 43, 30, 0.15)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-municipal': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        'gradient-peru': 'linear-gradient(135deg, #d52b1e 0%, #b91c1c 100%)',
        'pattern-dots': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1' fill-rule='nonzero'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'pattern-grid': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E\")"
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        '3xl': '40px'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem'
        }
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.75',
            a: {
              color: '#1e40af',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#1e3a8a',
                textDecoration: 'underline'
              }
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
              fontSize: '2.25rem',
              marginTop: '0',
              marginBottom: '2rem',
              lineHeight: '1.2'
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
              fontSize: '1.875rem',
              marginTop: '2rem',
              marginBottom: '1.5rem',
              lineHeight: '1.3'
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '1.75rem',
              marginBottom: '1rem',
              lineHeight: '1.4'
            },
            'h4, h5, h6': {
              color: '#111827',
              fontWeight: '600'
            },
            strong: {
              color: '#111827',
              fontWeight: '600'
            },
            blockquote: {
              borderLeftColor: '#1e40af',
              borderLeftWidth: '4px',
              fontStyle: 'italic',
              color: '#6b7280',
              paddingLeft: '1rem',
              marginLeft: '0',
              marginRight: '0'
            },
            code: {
              color: '#dc2626',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.375rem',
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }
          }
        },
        dark: {
          css: {
            color: '#d1d5db',
            a: {
              color: '#60a5fa',
              '&:hover': {
                color: '#93c5fd'
              }
            },
            'h1, h2, h3, h4, h5, h6': {
              color: '#f9fafb'
            },
            strong: {
              color: '#f9fafb'
            },
            blockquote: {
              borderLeftColor: '#60a5fa',
              color: '#9ca3af'
            },
            code: {
              color: '#fbbf24',
              backgroundColor: '#374151'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Plugin personalizado para utilidades municipales
    function({ addUtilities, addComponents, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)'
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)'
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 35px rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.07)'
        },
        '.text-shadow-none': {
          textShadow: 'none'
        },
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        },
        '.glass-dark': {
          backgroundColor: 'rgba(31, 41, 55, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(75, 85, 99, 0.18)'
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': 'rgba(156, 163, 175, 0.5) transparent',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(156, 163, 175, 0.5)',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(107, 114, 128, 0.7)'
          }
        }
      }

      const newComponents = {
        '.btn': {
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          lineHeight: theme('lineHeight.5'),
          textAlign: 'center',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          border: '1px solid transparent',
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: `0 0 0 2px ${theme('colors.blue.500')}`
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed'
          }
        },
        '.btn-primary': {
          backgroundColor: theme('colors.blue.600'),
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.sm'),
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.blue.700'),
            boxShadow: theme('boxShadow.md'),
            transform: 'translateY(-1px)'
          },
          '&:active': {
            transform: 'translateY(0)'
          }
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.gray.100'),
          color: theme('colors.gray.900'),
          border: `1px solid ${theme('colors.gray.300')}`,
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.gray.200'),
            borderColor: theme('colors.gray.400')
          }
        },
        '.btn-outline': {
          backgroundColor: 'transparent',
          color: theme('colors.blue.600'),
          border: `2px solid ${theme('colors.blue.600')}`,
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.blue.600'),
            color: theme('colors.white')
          }
        },
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          boxShadow: theme('boxShadow.md'),
          padding: theme('spacing.6'),
          border: `1px solid ${theme('colors.gray.200')}`,
          transition: 'all 0.3s ease'
        },
        '.card-hover': {
          '&:hover': {
            boxShadow: theme('boxShadow.lg'),
            transform: 'translateY(-4px)'
          }
        },
        '.municipal-header': {
          background: 'linear-gradient(135deg, #d52b1e 0%, #b91c1c 100%)',
          color: theme('colors.white'),
          padding: `${theme('spacing.2')} 0`,
          borderBottom: `3px solid ${theme('colors.yellow.400')}`
        },
        '.navbar-municipal': {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
          position: 'sticky',
          top: '0',
          zIndex: theme('zIndex.50'),
          transition: 'all 0.3s ease'
        },
        '.hero-municipal': {
          background: `linear-gradient(135deg, 
            rgba(30, 64, 175, 0.9) 0%, 
            rgba(29, 78, 216, 0.8) 50%, 
            rgba(37, 99, 235, 0.9) 100%
          )`,
          color: theme('colors.white'),
          padding: `${theme('spacing.16')} 0`,
          textAlign: 'center',
          position: 'relative',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      }

      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ]
}