import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";

import "./scss/app.scss";

// Если в контексте измениться хотя бы один value, то все кто слушают этот контекст будут перерисовываться
// Даже если не используют именно тот value, что изменился

// Все что ниже мы можем отрендерить в компоненте MainLayout через Outlet
// Outlet нужен если у нас много вложенных роутов
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
