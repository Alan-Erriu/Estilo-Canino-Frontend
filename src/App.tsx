import Home from "./pages/Home";
import Nav from "./components/Nav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/miperfil" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
