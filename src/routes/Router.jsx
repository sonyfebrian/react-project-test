import { Routes, Route } from "react-router-dom";
import { Home } from "src/pages/Home";
import { Register } from "src/pages/Register";
import Blog from "src/pages/Blog";
import FilteredDenom from "src/pages/FilteredDenom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/denom" element={<FilteredDenom />} />
    </Routes>
  );
}

export default Router;
