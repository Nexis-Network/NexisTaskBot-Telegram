import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import GameRouter from "./GameRouer";
import Error404 from "../pages/error/Error404";

function MainRouter() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Navigate to="/game" replace />} />
        {GameRouter}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
