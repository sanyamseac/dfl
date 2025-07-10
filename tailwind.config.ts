import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import animate from 'tailwind-animate'
import type { Config } from 'tailwindcss'

export default {
	content: ['./src//*.{html,js,svelte,ts}'],
	darkMode: 'class',
	plugins: [forms, typography, animate],
} as Config
