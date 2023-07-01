import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getUserData, setUserData } from "../../../redux/userSlice";
import apiClient from "../../../utils/client";

function DropDown() {
  const userData = useAppSelector(getUserData);
  const [openModal, setOpenModal] = useState(false);
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateDog = async () => {
    try {
      const dogAgeValue = parseInt(dogAge, 10); // Convertir la edad del perro a número

      if (dogAgeValue <= 0 || isNaN(dogAgeValue)) {
        alert("La edad del perro debe ser un número mayor a 0");
        return;
      }

      const data = {
        name: dogName,
        age: dogAge,
        breed: dogBreed,
      };

      const headers = {
        Authorization: userData.authToken,
      };

      // Realizar la solicitud para agregar el perro
      const response = await apiClient.post("dog", data, { headers });
      const newDog = response.data;

      // Actualizar el estado de Redux con el nuevo perro, conservando los anteriores
      const updatedUserData = {
        ...userData,
        dogs: [...userData.dogs, newDog.dog],
      };

      dispatch(setUserData(updatedUserData));

      // Limpiar los campos de entrada
      setDogName("");
      setDogAge("");
      setDogBreed("");

      // Cerrar el modal
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenModal}>Agregar perro</Button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregar un nuevo perro</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edad"
            value={dogAge}
            onChange={(e) => setDogAge(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Raza"
            value={dogBreed}
            onChange={(e) => setDogBreed(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleCreateDog}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DropDown;
