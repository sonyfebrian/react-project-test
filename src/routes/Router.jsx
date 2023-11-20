import { Routes, Route } from "react-router-dom";
import { Home } from "src/pages/Home";
import { FormRegister } from "src/components/FormRegister";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<FormRegister />} />
    </Routes>
  );
}

export default Router;
