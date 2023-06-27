import FilterByUser from "../components/TurnItems/DropDowns/FilterByUser";
import apiClient from "../utils/client";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
// import { useAppSelector } from "../redux/hook";
import { useEffect } from "react";
import { setGroomerData } from "../redux/usersTypeGroomerSlice";
import { setClientData } from "../redux/usersTypeClientSlice";
import Calendar from "../components/TurnItems/DropDowns/Calendar";

function BranchOfficeSelector() {
  const dispatch = useDispatch();
  //   const dataUser = useAppSelector(getUserData);

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
      } catch (error) {
        console.warn("El usuario debe iniciar sesión:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <FilterByUser />
      </div>

      <div style={{ marginTop: "16px" }}>
        <h5>Turnos peluquero seleccionado</h5>
        {/* Aquí puedes agregar el componente de calendario */}
        <Calendar />
      </div>
    </>
  );
}

export default BranchOfficeSelector;
