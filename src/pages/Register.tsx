import React from "react";
import RegisterForm from "../components/RegisterItems/RegisterForm";
import { Box } from "@mui/material";
import FormData from "form-data";
import apiClient from "../utils/client";

const Register: React.FC = () => {
  const data = new FormData();
  const handleSubmit = async (formData: any) => {
    console.log(formData);
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      await apiClient.post("signup", data).then((res) => {
        console.log(res.data);
        // dispatch(setUserData(res.data));
        // router.push('/');
        // NotificationSuccess('Usuario registrado');
        alert("usuario registrado");
      });
    } catch (error) {
      //   NotificationFailure('revise los campos');
      alert("revise los campos");
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
