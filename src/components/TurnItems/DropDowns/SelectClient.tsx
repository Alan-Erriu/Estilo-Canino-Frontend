import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getUserData } from "../../../redux/userSlice";
import { getClientData } from "../../../redux/usersTypeClientSlice";
import { setClientId } from "../../../redux/appointmentSlice";
import { setOwnerID } from "../../../redux/dogSlice";

const SelectClient = () => {
  const userData = useAppSelector(getUserData);
  const Clients = useAppSelector(getClientData);
  const allUserTypeClients = Clients.client;
  const dispatch = useAppDispatch();

  const [selectedClientId, setSelectedClientId] = useState("");

  const handleClientChange = (selectedClientId) => {
    setSelectedClientId(selectedClientId);
    //setea el id del cliente para crear la cita
    dispatch(setClientId(selectedClientId));
    //setea el id del cliente para buscar los perros y agregarlos al filtro "selectDog" y el estado de redux pensado para peluqueros y admin
    dispatch(setOwnerID(selectedClientId));
  };

  const handleChange = (event) => {
    const selectedClientId = event.target.value;
    handleClientChange(selectedClientId);
  };

  const getClientName = (clientId) => {
    const client = allUserTypeClients.find((client) => client._id === clientId);
    return client ? client.name : "";
  };

  if (userData.role !== "administrador" && userData.role !== "peluquero") {
    return null; // Si el rol no es "administrador" o peluquero, no renderizar nada
  }

  return (
    <Select
      variant="outlined"
      displayEmpty
      value={selectedClientId}
      onChange={handleChange}
      renderValue={(value) =>
        value ? getClientName(value) : "Seleccione un cliente"
      }
    >
      <MenuItem value="" disabled>
        Seleccione un cliente
      </MenuItem>
      {allUserTypeClients.map((client) => (
        <MenuItem key={client._id} value={client._id}>
          {client.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectClient;
