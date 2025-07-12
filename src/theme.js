import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
	globalCss: {
		html: { background: 'var(--chakra-colors-gray-900)' },
	},
});
