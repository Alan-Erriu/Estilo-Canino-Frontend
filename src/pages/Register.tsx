import React from "react";
import RegisterForm from "../components/RegisterItems/RegisterForm";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import apiClient from "../utils/client";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (formData: any) => {
    const data = {
      name: formData.name,
      age: formData.age,
      email: formData.email,
      password: formData.password,
    };

    try {
      await apiClient.post("auth/signup", data).then((res) => {
        console.log(res.data);
        // dispatch(setUserData(res.data));

        alert("usuario registrado");
        navigate("/login");
      });
    } catch (error) {
      alert("revise los campos");
      console.log(data);
      console.log(error);
    }
  };

  return (
    <Box>
      <RegisterForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default Register;
