import { useState } from "react";
import { Button, Select, MenuItem } from "@mui/material";
import { useAppSelector } from "../redux/hook";
import { getDogs, getUserData } from "../redux/userSlice";
import apiClient from "../utils/client";
import CardAppointment from "../components/TurnItems/CardAppointment";
import GroomerAppointments from "../components/MyappointmentItems/GroomerAppointments";

const MyAppointments = () => {
  const [selectedDogId, setSelecteselectedDogId] = useState("");
  const [appointments, setAppointments] = useState([]);

  const userData = useAppSelector(getUserData);
  const allDogsUser = useAppSelector(getDogs);

  const handleDogChange = (event) => {
    setSelecteselectedDogId(event.target.value);
  };

  const getDogName = (dogId) => {
    const dog = allDogsUser.find((dog) => dog._id === dogId);
    return dog ? dog.name : "";
  };

  const handleFilterClick = async () => {
    const selectedDog = allDogsUser.find((dog) => dog._id === selectedDogId);

    const dogId = selectedDog ? selectedDog._id : "";

    const data = {
      dogId,
    };

    try {
      const responseAppointment = await apiClient.post("/turn/alldog", data);
      setAppointments(responseAppointment.data);
      console.log(responseAppointment);
    } catch (error) {
      console.log(error);
    }
  };
  // borrar el turno seleccionado y actualizar el array con los turnos
  const deleteAppointment = async (appointment) => {
    try {
      const responseAppointment = await apiClient.delete(
        `turn/${appointment._id}`
      );
      if (responseAppointment.data.message === "Turn deleted successfully") {
        alert("Turno borrado exitosamente");

        const updatedAppointments = appointments.filter(
          (apt) => apt._id !== appointment._id
        );
        setAppointments(updatedAppointments);
      } else {
        alert("Algo salió mal");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //si el usuario es distinto de cliente se muestra este comoponente
  if (userData.role !== "cliente") {
    return <GroomerAppointments />;
  }
  //si el usario es cliente se muestra este componente
  return (
    <div>
      role: {userData.role}
      <Select
        variant="outlined"
        displayEmpty
        value={selectedDogId}
        onChange={handleDogChange}
        renderValue={(value) =>
          value ? getDogName(value) : "Seleccione un perro"
        }
      >
        <MenuItem value="" disabled>
          Seleccione un perro
        </MenuItem>
        {allDogsUser.map((dog) => (
          <MenuItem key={dog._id} value={dog._id}>
            {dog.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleFilterClick}>
        filtrar
      </Button>
      <Button>test </Button>
      {appointments.map((appointment) => (
        <CardAppointment
          key={appointment._id}
          appointment={appointment}
          deleteAppointment={deleteAppointment}
        />
      ))}
    </div>
  );
};

export default MyAppointments;
