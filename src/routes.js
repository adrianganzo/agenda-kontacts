import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";

function RotasProtegidas({ redirectTo }) {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function RotasPrincipais() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Route>

      <Route element={<RotasProtegidas redirectTo={"/login"} />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
} 