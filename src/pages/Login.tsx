import LoginForm from "../components/LoginItems/LoginForm";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/client";
import { useDispatch } from "react-redux";
import { setLoginData } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (formData: any) => {
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      await apiClient.post("auth/signin", data).then((res) => {
        let user = {
          userId: res.data.userId,
          authToken: res.data.token,
          role: res.data.role[0].name,
        };
        localStorage.setItem("token", user.authToken);
        localStorage.setItem("role", user.role);

        dispatch(setLoginData(user));

        alert("iniciaste sesion");
        navigate("/miperfil");
      });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;

        if (errorMessage === "incorrect password") {
          alert("Contraseña incorrecta");
        } else if (errorMessage === "no user found") {
          alert("El usuario no existe");
        } else {
          alert("Algo salió mal");
        }

        console.error(error);
      } else {
        alert("Error en la solicitud");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
