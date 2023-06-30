import { useAppDispatch } from "../redux/hook";
import { setClientData } from "../redux/usersTypeClientSlice";
import { setGroomerData } from "../redux/usersTypeGroomerSlice";
import apiClient from "../utils/client";
import { useEffect, useState } from "react";
import { setUserData } from "../redux/userSlice";
import TableUsers from "../components/AdminItems/Dropdowns/TableUsers";

const AdminDeleteUsers = () => {
  const dispatch = useAppDispatch();
  const tokenLocalStorage = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: tokenLocalStorage,
        };
        //informacion del usuario con el id guardado en el token
        const responseUser = await apiClient.get("user", { headers });

        //todos los usarios
        const responseRoles = await apiClient.get("user/all", { headers });

        const { name, age, email, role, _id } = responseUser.data;
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
        //filtramos por rol para ver si es cliente o peluquero
        const clients = responseRoles.data.filter(
          (user) => user.role[0]?.name === "cliente"
        );
        //filtramos por rol para ver si es cliente o peluquero
        const groomers = responseRoles.data.filter(
          (user) => user.role[0]?.name === "peluquero"
        );

        //seteamos todos los clientes de la base de datos a redux
        dispatch(setClientData(clients));
        //seteamos todos los peluquero al estado de redux
        dispatch(setGroomerData(groomers));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <TableUsers />
    </div>
  );
};

export default AdminDeleteUsers;
