import { Box } from "@mui/material";
import apiClient from "../utils/client";
import RegisterNewGroomer from "../components/AdminItems/RegisterNewGroomer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { setUserData } from "../redux/userSlice";

const AdminCreateNewGroomer = () => {
  const tokenLocalStorage = localStorage.getItem("token");
  const headers = {
    Authorization: tokenLocalStorage,
  };
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        //informacion del usuario con el id guardado en el token
        const responseUser = await apiClient.get("user", { headers });

        const dataUserFromBack = responseUser.data;
        const { name, age, email, role, _id } = dataUserFromBack;
        //creamos el objeto user para luego mandarlo a redux, con su rol y perros si es que tiene
        const dataUser = {
          name,
          age,
          email,
          role: role[0]?.name || "Usuario",
          userId: _id,
          authToken: tokenLocalStorage,
        };

        //seteamos la informacion del usuario en redux con la combinacion de fetchs
        dispatch(setUserData(dataUser));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
      await apiClient.post("auth/signup", data).then(() => {
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
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <Box>
      <RegisterNewGroomer onSubmit={handleSubmit} />
    </Box>
  );
};

export default AdminCreateNewGroomer;
