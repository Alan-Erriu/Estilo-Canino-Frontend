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

  const [selectedGroomerId, setSelectedGroomerId] = useState("");

  const handleGroomerChange = (selectedGroomerId) => {
    setSelectedGroomerId(selectedGroomerId);
    dispatch(setGroomer(selectedGroomerId));
  };

  const handleChange = async (event) => {
    const selectedGroomerId = event.target.value;
    if (selectedGroomerId) {
      try {
        handleGroomerChange(selectedGroomerId);
        const responseAppointmentAvailable = await apiClient.post("turn", {
          date: newAppointment.date,
          month: newAppointment.month,
          year: newAppointment.year,
          day: newAppointment.day,
          groomerId: selectedGroomerId,
        });
        dispatch(
          setAvailableSlots(responseAppointmentAvailable.data.availableSlots)
        );
      } catch (error) {
        console.log("Error fetching appointment data:", error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const getGroomerName = (groomerId) => {
    const groomer = allGroomersData.groomers.find(
      (groomer) => groomer._id === groomerId
    );
    return groomer ? groomer.name : "";
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
          await apiClient.post("turn", {
            date: newAppointment.date,
            month: newAppointment.month,
            year: newAppointment.year,
            day: newAppointment.day,
            groomerId: newAppointment.groomer,
          });
        }
      } catch (error) {
        console.log("Error fetching appointment data:", error);
        // Handle error (e.g., show error message to user)
      }
    };

    fetchAppointmentData();
  }, [newAppointment]);

  return (
    <Select
      variant="outlined"
      displayEmpty
      value={selectedGroomerId}
      onChange={handleChange}
      renderValue={(value) =>
        value ? getGroomerName(value) : "Seleccione un peluquero"
      }
    >
      <MenuItem value="" disabled>
        {userData.role === "cliente"
          ? "Seleccione un peluquero"
          : "Seleccione un cliente"}
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
