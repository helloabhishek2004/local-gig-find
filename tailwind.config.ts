
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: 'hsl(var(--warning))',
				info: 'hsl(var(--info))',
				hover: 'hsl(var(--hover))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'ios': '12px',
				'ios-lg': '16px',
				'ios-xl': '20px'
			},
			fontFamily: {
				sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
			},
			fontSize: {
				'ios-caption': ['11px', { lineHeight: '16px', fontWeight: '400' }],
				'ios-caption2': ['12px', { lineHeight: '16px', fontWeight: '400' }],
				'ios-footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
				'ios-subhead': ['15px', { lineHeight: '20px', fontWeight: '400' }],
				'ios-callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
				'ios-body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
				'ios-headline': ['17px', { lineHeight: '22px', fontWeight: '600' }],
				'ios-title3': ['20px', { lineHeight: '25px', fontWeight: '400' }],
				'ios-title2': ['22px', { lineHeight: '28px', fontWeight: '700' }],
				'ios-title1': ['28px', { lineHeight: '34px', fontWeight: '700' }],
				'ios-large-title': ['34px', { lineHeight: '41px', fontWeight: '700' }],
			},
			spacing: {
				'ios-xs': '4px',
				'ios-sm': '8px',
				'ios-md': '16px',
				'ios-lg': '20px',
				'ios-xl': '24px',
				'ios-2xl': '32px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(8px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.96)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translate(0px, 0px) rotate(0deg)'
					},
					'33%': {
						transform: 'translate(30px, -30px) rotate(120deg)'
					},
					'66%': {
						transform: 'translate(-20px, 20px) rotate(240deg)'
					}
				},
				'floating': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-6px)'
					}
				},
				'slideInUp': {
					'from': {
						transform: 'translateY(100%)',
						opacity: '0'
					},
					'to': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'gradient-shift': {
					'0%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					},
					'100%': {
						'background-position': '0% 50%'
					}
				},
				'ios-bounce': {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(-4px)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
				'float': 'float 20s ease-in-out infinite',
				'floating': 'floating 6s ease-in-out infinite',
				'slideInUp': 'slideInUp 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
				'gradient-shift': 'gradient-shift 25s ease infinite',
				'ios-bounce': 'ios-bounce 1s infinite'
			},
			boxShadow: {
				'ios': '0 1px 6px rgba(0, 0, 0, 0.04)',
				'ios-md': '0 2px 16px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.02)',
				'ios-lg': '0 4px 24px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04)',
				'ios-button': '0 2px 12px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.06)',
			},
			backdropBlur: {
				'ios': '20px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
