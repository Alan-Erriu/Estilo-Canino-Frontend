import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, Select, MenuItem } from "@mui/material";
import { useAppSelector } from "../redux/hook";
import { getUserData } from "../redux/userSlice";
import { getGroomerData } from "../redux/usersTypeGroomerSlice";
import apiClient from "../utils/client";
import CardAppointment from "../components/TurnItems/CardAppointment";

const Admin = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const [selectedGroomerId, setSelectedGroomerId] = useState("");
  const [appointments, setAppointments] = useState([]);

  const allGroomersData = useAppSelector(getGroomerData);
  const userData = useAppSelector(getUserData);

  const handleGroomerChange = (event) => {
    setSelectedGroomerId(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getGroomerName = (groomerId) => {
    const groomer = allGroomersData.groomers.find(
      (groomer) => groomer._id === groomerId
    );
    return groomer ? groomer.name : "";
  };

  const handleFilterClick = async () => {
    const dateData = {
      date: selectedDate.date().toString(),
      month: (selectedDate.month() + 1).toString().padStart(2, "0"),
      year: selectedDate.year().toString(),
      day: selectedDate.day().toString(),
    };

    const selectedGroomer = allGroomersData.groomers.find(
      (groomer) => groomer._id === selectedGroomerId
    );

    const groomerId = selectedGroomer ? selectedGroomer._id : "";

    const data = {
      date: dateData.date,
      month: dateData.month,
      year: dateData.year,
      day: dateData.day,
      groomerId,
    };

    try {
      const responseAppointment = await apiClient.post("/turn/alls", data);
      setAppointments(responseAppointment.data);
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

  return (
    <div>
      role: {userData.role}
      <DatePicker value={selectedDate} onChange={handleDateChange} />
      <Select
        variant="outlined"
        displayEmpty
        value={selectedGroomerId}
        onChange={handleGroomerChange}
        renderValue={(value) =>
          value ? getGroomerName(value) : "Seleccione un peluquero"
        }
      >
        <MenuItem value="" disabled>
          Seleccione un peluquero
        </MenuItem>
        {allGroomersData.groomers.map((groomer) => (
          <MenuItem key={groomer._id} value={groomer._id}>
            {groomer.name}
          </MenuItem>
        ))}
      </Select>
      <Button variant="contained" onClick={handleFilterClick}>
        filtrar
      </Button>
      <Button onClick={() => console.log(selectedDate.month().toString())}>
        test
      </Button>
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

export default Admin;
