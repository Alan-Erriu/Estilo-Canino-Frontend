import FilterByUser from "../components/TurnItems/DropDowns/FilterByUser";
import apiClient from "../utils/client";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
// import { useAppSelector } from "../redux/hook";
import { useEffect, useState } from "react";
import { setGroomerData } from "../redux/usersTypeGroomerSlice";
import { setClientData } from "../redux/usersTypeClientSlice";
import Calendar from "../components/TurnItems/DropDowns/Calendar";
import SelectHours from "../components/TurnItems/DropDowns/SelectHours";

function Turns() {
  const dispatch = useDispatch();
  //   const dataUser = useAppSelector(getUserData);
  const [isLoading, setIsLoading] = useState(true);
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
        const responseRoles = await apiClient.get("user/all", { headers });
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

        const clients = responseRoles.data.filter(
          (user) => user.role[0]?.name === "cliente"
        );
        const groomers = responseRoles.data.filter(
          (user) => user.role[0]?.name === "peluquero"
        );

        dispatch(setClientData(clients));
        dispatch(setGroomerData(groomers));
        setIsLoading(false);
      } catch (error) {
        console.warn("El usuario debe iniciar sesión:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <FilterByUser />
      </div>

      <div style={{ marginTop: "16px" }}>
        <h5>Turnos peluquero seleccionado</h5>

        <SelectHours />
        <Calendar />
      </div>
      <div>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    </>
  );
}

export default Turns;
