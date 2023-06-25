import Home from "./pages/Home";
import Nav from "./components/Nav";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Turns from "./pages/Turns";
import UserProfile from "./pages/UserProfile";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const App = () => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/miperfil" element={<UserProfile />} />
            <Route path="/peluqueros" element={<Turns />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
