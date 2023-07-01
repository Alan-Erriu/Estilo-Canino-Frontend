import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getUserData } from "../../../redux/userSlice";
import { setDog } from "../../../redux/appointmentSlice";
import apiClient from "../../../utils/client";
import { getDogsByOwnerId, getOwnerId, setDogs } from "../../../redux/dogSlice";

const SelectDogAdminRole = () => {
  const dispatch = useAppDispatch();
  //pregunto quien es el usuario y cargo los perros correspodientes a estado userslice--role-cliente
  const userData = useAppSelector(getUserData);

  //consulto el estado del turno que se va creando, para luego ser despachado

  //traigo los perros del usuario logea-- pensando para el rol cliente
  const allDogUser = useAppSelector(getDogsByOwnerId);
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

  //consulto el estado de redux donde se almacena el id del dueño del perro, para traer de la base de datos todos sus perros
  const ownerId = useAppSelector(getOwnerId);
  useEffect(() => {
    const fetchDogsByOwnerId = async () => {
      const token = userData.authToken;
      try {
        const response = await apiClient.post(
          "dog/alldog",
          {
            ownerId: ownerId,
          },
          { headers: { Authorization: token } }
        );
        const { dogs } = response.data;
        // Manejar los perros devueltos
        dispatch(setDogs(dogs));
      } catch (error) {
        // Manejar errores
        console.error(error);
      }
    };
    if (ownerId) {
      fetchDogsByOwnerId();
    }
  }, [ownerId]);

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
};

export default SelectDogAdminRole;
