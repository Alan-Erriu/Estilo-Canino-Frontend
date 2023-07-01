import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getUserData } from "../../../redux/userSlice";
import { getGroomerData } from "../../../redux/usersTypeGroomerSlice";
import {
  getCurrentAppointment,
  setAvailableSlots,
  setGroomer,
} from "../../../redux/appointmentSlice";
import apiClient from "../../../utils/client";

const FilterByUser = () => {
  const userData = useAppSelector(getUserData);
  const newAppointment = useAppSelector(getCurrentAppointment);
  const allGroomersData = useAppSelector(getGroomerData);
  const dispatch = useAppDispatch();
  const tokenLocalStorage = localStorage.getItem("token");
  const [selectedGroomerId, setSelectedGroomerId] = useState(
    userData.role === "peluquero" ? userData.userId : ""
  );

  const handleGroomerChange = (selectedGroomerId) => {
    setSelectedGroomerId(selectedGroomerId);
    dispatch(setGroomer(selectedGroomerId));
  };

  const handleChange = async (event) => {
    const selectedGroomerId = event.target.value;
    if (selectedGroomerId) {
      try {
        handleGroomerChange(selectedGroomerId);
        const responseAppointmentAvailable = await apiClient.post(
          "turn",
          {
            date: newAppointment.date,
            month: newAppointment.month,
            year: newAppointment.year,
            day: newAppointment.day,
            groomerId: selectedGroomerId,
          },
          { headers: { Authorization: tokenLocalStorage } }
        );
        dispatch(
          setAvailableSlots(responseAppointmentAvailable.data.availableSlots)
        );
      } catch (error) {
        console.log("Error fetching appointment data:", error);
      }
    }
  };

  const getGroomerName = (groomerId) => {
    const groomer = allGroomersData.groomers.find(
      (groomer) => groomer._id === groomerId
    );
    return groomer ? groomer.name : "";
  };

  const fetchDefaultAppointmentData = async () => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      const responseAppointmentAvailable = await apiClient.post(
        "turn",
        {
          date: day,
          month,
          year,
          day,
          groomerId: selectedGroomerId,
        },
        { headers: { Authorization: tokenLocalStorage } }
      );

      dispatch(
        setAvailableSlots(responseAppointmentAvailable.data.availableSlots)
      );
    } catch (error) {
      console.log("Error fetching default appointment data:", error);
    }
  };
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        if (
          newAppointment.date &&
          newAppointment.month &&
          newAppointment.year &&
          newAppointment.day &&
          newAppointment.groomer
        ) {
          await apiClient.post(
            "turn",
            {
              date: newAppointment.date,
              month: newAppointment.month,
              year: newAppointment.year,
              day: newAppointment.day,
              groomerId: newAppointment.groomer,
            },
            { headers: { Authorization: tokenLocalStorage } }
          );
        }
        if (userData.role === "peluquero") {
          //si el rol es peluquero no va a poder ver el filtro de peluqueros, entonces no se va a disparar handleChange
          //entonces llamo a la funcion que carga sus datos, con su propio id de usuario logeado y la fecha de hoy por defecto
          dispatch(setGroomer(userData.userId));
          fetchDefaultAppointmentData();
        }
      } catch (error) {
        console.log("Error fetching appointment data:", error);
      }
    };

    fetchAppointmentData();
  }, [newAppointment]);
  if (userData.role !== "administrador" && userData.role !== "cliente") {
    return null; // Si el rol no es "administrador" ni cliente, no renderizar nada
  }
  return (
    <Select
      sx={{ width: "250px", backgroundColor: "white" }}
      variant="outlined"
      displayEmpty
      value={selectedGroomerId}
      onChange={handleChange}
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
  );
};

export default FilterByUser;
