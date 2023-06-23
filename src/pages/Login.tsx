import LoginForm from "../components/RegisterItems/LoginForm";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/client";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData: any) => {
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      await apiClient.post("auth/signin", data).then((res) => {
        console.log(res.data);
        // dispatch(setUserData(res.data));

        alert("iniciaste sesion");
        navigate("/miperfil");
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
