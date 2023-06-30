import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAvailableSlots, setTime } from "../../../redux/appointmentSlice";

const SelectHours = () => {
  //horas disponibles del peluuero en redux
  const hoursAvailable = useAppSelector(getAvailableSlots);
  const [selectedTime, setSelectedTime] = useState("");

  const dispatch = useAppDispatch();
  const handleTimeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
    dispatch(setTime(selectedValue));
  };

  return (
    <Select
      variant="outlined"
      displayEmpty
      value={selectedTime}
      onChange={handleTimeChange}
      renderValue={(value) => (value ? value : "Horarios disponibles")}
    >
      <MenuItem value="" disabled>
        Horarios disponibles
      </MenuItem>
      {hoursAvailable.map((groomer, i) => (
        <MenuItem key={i} value={groomer}>
          {groomer}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectHours;
