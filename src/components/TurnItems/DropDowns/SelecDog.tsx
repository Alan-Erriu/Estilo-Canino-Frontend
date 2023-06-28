import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getDogs, getUserData } from "../../../redux/userSlice";
import { setDog } from "../../../redux/appointmentSlice";

const SelecDog = () => {
  const userData = useAppSelector(getUserData);
  const allDogUser = useAppSelector(getDogs);
  const dispatch = useAppDispatch();

  const [selectedDogId, setSelectedDogId] = useState("");

  const handleDogChange = (selectedDogId) => {
    setSelectedDogId(selectedDogId);
    dispatch(setDog(selectedDogId));
    console.log(selectedDogId);
  };

  const handleChange = (event) => {
    const selectedDogId = event.target.value;
    handleDogChange(selectedDogId);
  };

  const getDogName = (dogId) => {
    const dog = allDogUser.find((dog) => dog._id === dogId);
    return dog ? dog.name : "";
  };

  return (
    <Select
      variant="outlined"
      displayEmpty
      value={selectedDogId}
      onChange={handleChange}
      renderValue={(value) =>
        value ? getDogName(value) : "Seleccione un perro"
      }
    >
      <MenuItem value="" disabled>
        Seleccione un perro
      </MenuItem>
      {allDogUser.map((dog) => (
        <MenuItem key={dog._id} value={dog._id}>
          {dog.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelecDog;
