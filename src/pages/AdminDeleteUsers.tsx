import { Button } from "@mui/material";
import { useAppSelector } from "../redux/hook";
import { getGroomerData } from "../redux/usersTypeGroomerSlice";
import { getClientData } from "../redux/usersTypeClientSlice";

const AdminDeleteUsers = () => {
  // const dispatch = useDispatch();
  //traigo todos los peluqueros guardados en redux guardados en redux
  const allGroomersData = useAppSelector(getGroomerData);
  //traigo todos los cliente guardados en redux
  const allClientsData = useAppSelector(getClientData);
  // borrar el turno seleccionado y actualizar el array con los turnos

  return (
    <div>
      <Button variant="contained">Mostrar Clientes</Button>
      <Button variant="contained">Mostrar Peluquero</Button>
      {allClientsData.client.map((user, i) => (
        <p key={i}>{user.name}</p>
      ))}
    </div>
  );
};

export default AdminDeleteUsers;
