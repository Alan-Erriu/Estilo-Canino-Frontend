import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getDogs, getUserData } from "../../../redux/userSlice";
import { setDog } from "../../../redux/appointmentSlice";
import SelectDogAdminRole from "./SelectDogAdminRole";

const SelecDog = () => {
  const dispatch = useAppDispatch();
  //pregunto quien es el usuario y cargo los perros correspodientes a estado userslice--role-cliente
  const userData = useAppSelector(getUserData);

  //traigo los perros del usuario logeado -- pensando para el rol cliente
  const allDogUser = useAppSelector(getDogs);
  //control de los inputs
  const [selectedDogId, setSelectedDogId] = useState("");

  const handleDogChange = (selectedDogId) => {
    setSelectedDogId(selectedDogId);
    dispatch(setDog(selectedDogId));
  };

  const handleChange = (event) => {
    const selectedDogId = event.target.value;
    handleDogChange(selectedDogId);
  };

  const getDogName = (dogId) => {
    const dog = allDogUser.find((dog) => dog._id === dogId);
    return dog ? dog.name : "";
  };

  if (userData.role !== "administrador" && userData.role !== "peluquero") {
    return (
      <Select
        sx={{ width: "250px", backgroundColor: "white" }}
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
  } else {
    return <SelectDogAdminRole />;
  }
};

export default SelecDog;
