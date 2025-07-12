import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./app";
import NotFound from "./not-found";
import Pokemon from "./pokemon";

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
