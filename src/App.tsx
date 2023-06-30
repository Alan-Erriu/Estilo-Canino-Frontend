import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import store from "./redux/store";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Turns from "./pages/Appointment";
import UserProfile from "./pages/UserProfile";
import AdminAppointments from "./pages/AdminAppointments";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { AdminRoute } from "./utils/AdminRoute";
import { BrowserRouter } from "react-router-dom";
import AdminCreateNewGroomer from "./pages/AdminCreateNewGroomer";
import AdminDeleteUsers from "./pages/AdminDeleteUsers";
import MyAppointments from "./pages/MyAppointments";

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
            <Route path="/nuevoturno" element={<Turns />} />
            <Route path="/misturnos" element={<MyAppointments />} />
          </Route>
          {/* ------------------------------------------------- */}
          {/* Solo el usuario con el rol "administrador" podrá acceder a la ruta admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/turnos" element={<AdminAppointments />} />
            <Route
              path="/admin/crearusuario"
              element={<AdminCreateNewGroomer />}
            />
            <Route path="/admin/usuarios" element={<AdminDeleteUsers />} />
          </Route>
        </Routes>
      </Provider>
      {/* </LocalizationProvider> */}
    </BrowserRouter>
  );
};

export default App;
