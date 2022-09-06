import { ChakraProvider, DarkMode, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRouter from './AppRouter';

const theme = extendTheme({
	initialColorMode: 'dark',
	styles: {
		global: () => ({
			body: { bg: 'var(--chakra-colors-gray-900)' },
		}),
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<DarkMode>
				<AppRouter />
			</DarkMode>
		</ChakraProvider>
	</React.StrictMode>
);
