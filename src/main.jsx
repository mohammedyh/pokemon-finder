import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';

import AppRouter from './router';
import { system } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider value={system}>
			<AppRouter />
		</ChakraProvider>
	</React.StrictMode>
);
