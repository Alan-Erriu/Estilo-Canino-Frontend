import React from "react";
import RegisterForm from "../components/RegisterItems/RegisterForm";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import apiClient from "../utils/client";

const Register: React.FC = () => {
  const navigate = useNavigate();
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
    };

    try {
      await apiClient.post("auth/signup", data).then(() => {
        alert("Usuario registrado");
        navigate("/login");
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
      <RegisterForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default Register;
