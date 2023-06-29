import { Box } from "@mui/material";
import apiClient from "../utils/client";
import RegisterNewGroomer from "../components/AdminItems/RegisterNewGroomer";

const AdminCreateNewGroomer = () => {
  const handleSubmit = async (formData: any) => {
    const { name, age, email, password } = formData;

    // Validar nombre
    if (name.length < 3) {
      alert("El nombre debe tener al menos 3 caracteres");
      return;
    }

    // Validar edad
    if (age <= 0) {
      alert("La edad debe ser mayor a 0");
      return;
    }

    // Validar contraseña
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const data = {
      name,
      age,
      email,
      password,
      role: ["peluquero"],
    };

    try {
      await apiClient.post("auth/signup", data).then((res) => {
        console.log(res.data);

        alert(`El peluquero ${name} fue creado`);
      });
    } catch (error) {
      const errorMessage = error.response.data.message;

      if (errorMessage === "user already exists") {
        alert("El usuario ya existe");
      } else {
        alert("Error en la solicitud");
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <RegisterNewGroomer onSubmit={handleSubmit} />
    </Box>
  );
};

export default AdminCreateNewGroomer;
