import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { store } from "./redux/store";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Turns from "./pages/Turns";
import UserProfile from "./pages/UserProfile";
import Admin from "./pages/Admin";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { AdminRoute } from "./utils/AdminRoute";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Solo los usuarios registrados podrán acceder a estas rutas; se valida con el jwt */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/miperfil" element={<UserProfile />} />
            <Route path="/peluqueros" element={<Turns />} />
          </Route>
          {/* ------------------------------------------------- */}
          {/* Solo el usuario con el rol "administrador" podrá acceder a la ruta admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
