import { useEffect } from "react";
import CardDog from "../components/UserProfileIItems/CardDog";
import Profile from "../components/UserProfileIItems/Profile";
import Box from "@mui/material/Box";
import apiClient from "../utils/client";
import { useDispatch } from "react-redux";
import { setUserData, getUserData } from "../redux/userSlice";
import { useAppSelector } from "../redux/hook";
import { DogDataState } from "../types/dog";
const UserProfile = () => {
  const dispatch = useDispatch();
  const dataUser = useAppSelector(getUserData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token del local storage
        const tokenLocalStorage = localStorage.getItem("token");

        const headers = {
          Authorization: tokenLocalStorage,
        };

        // Solicitud de datos del usuario logueado
        const responseUser = await apiClient.get("user", { headers });
        const responseDog = await apiClient.get("dog", { headers });
        const dataUserFromBack = responseUser.data;

        const { name, age, email, role, _id } = dataUserFromBack;

        const dataUser = {
          name,
          age,
          email,
          role: role[0]?.name || "Usuario",
          userId: _id,
          authToken: tokenLocalStorage,
          dogs: responseDog.data.dogs,
        };

        dispatch(setUserData(dataUser));
        // dispatch(setDogs(responseDog.data.dogs));
      } catch (error) {
        console.warn("El usuario debe iniciar sesión:", error.message);
        // Manejar el error según tus necesidades, por ejemplo, mostrar un mensaje de error al usuario
      }
    };

    fetchData();
  }, [dataUser]);

  return (
    <Box>
      <Profile />
      <Box sx={{ display: "flex", gap: 2, mt: "8rem", mx: "4rem" }}>
        {dataUser.dogs.map((dog: DogDataState, i: Number) => (
          <CardDog key={i.toString()} dog={dog} />
        ))}
      </Box>
    </Box>
  );
};

export default UserProfile;
