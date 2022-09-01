import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import NotFound from './NotFound';
import Pokemon from './Pokemon';

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path="/pokemon/:name" element={<Pokemon />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
