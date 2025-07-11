import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
	globalCss: {
		body: { background: 'var(--chakra-colors-gray-900)' },
	},
});

// styles: {
//   global: () => ({
//     body: { bg: 'var(--chakra-colors-gray-900)' },
//   }),
// }
