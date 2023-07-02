import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getUserData, setUserData } from "../../../redux/userSlice";
import apiClient from "../../../utils/client";
import { EditDogModalProps } from "../../../types/dog";

function ModalEditDog({ dog, open, onClose }: EditDogModalProps) {
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [editedDogName, setEditedDogName] = React.useState(dog.name);
  const [editedDogAge, setEditedDogAge] = React.useState(dog.age);
  const [editedDogBreed, setEditedDogBreed] = React.useState(dog.breed);

  const saveEditedDog = async () => {
    try {
      const updatedDog = {
        ...dog,
        name: editedDogName,
        age: editedDogAge,
        breed: editedDogBreed,
      };

      const headers = {
        Authorization: userData.authToken,
      };

      await apiClient
        .put(`dog/${dog._id}`, updatedDog, { headers })
        .then(() => {
          const updatedDogs = userData.dogs.map((d) => {
            if (d._id === dog._id) {
              return updatedDog;
            }
            return d;
          });

          const updatedUserData = {
            ...userData,
            dogs: updatedDogs,
          };

          dispatch(setUserData(updatedUserData));
        });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar perro</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          value={editedDogName}
          onChange={(e) => setEditedDogName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Edad"
          value={editedDogAge}
          onChange={(e) => setEditedDogAge(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Raza"
          value={editedDogBreed}
          onChange={(e) => setEditedDogBreed(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={saveEditedDog}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEditDog;
