import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import apiClient from "../../utils/client";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { getUserData, setUserData } from "../../redux/userSlice";
import swal from "sweetalert2";
import ModalEditDog from "./DropDows/ModalEditDog";
import { CardDogProps } from "../../types/dog";

function CardDog({ dog }: CardDogProps) {
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const deleteDog = async () => {
    try {
      const headers = {
        Authorization: userData.authToken,
      };
      await apiClient.delete(`dog/${dog._id}`, { headers }).then((res) => {
        const updatedDogs = userData.dogs.filter((d) => d._id !== dog._id);
        const updatedUserData = {
          ...userData,
          dogs: updatedDogs,
        };
        console.log(res);
        dispatch(setUserData(updatedUserData));
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModalHandler = () => {
    setOpenEditModal(true);
  };

  const closeEditModalHandler = () => {
    setOpenEditModal(false);
  };

  const modal = () => {
    swal
      .fire({
        title: "¿Está seguro?",
        text: "¡Esta acción es irremediable!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, borrar",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire("Borrado", "El perro fue borrado.", "success");
          setTimeout(deleteDog, 1000);
        }
      });
  };

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://img.freepik.com/vector-premium/caricatura-divertido-perrito-sentado_29190-6858.jpg?w=2000"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {dog.name}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {dog.breed}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {dog.age}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous" onClick={modal}>
            Eliminar
          </IconButton>
          <IconButton
            aria-label="play/pause"
            onClick={() => console.log("sacar un turno")}
          >
            Cortar pelo
          </IconButton>
          <IconButton aria-label="play/pause" onClick={openEditModalHandler}>
            Editar perro
          </IconButton>
        </Box>
      </Box>

      <ModalEditDog
        dog={dog}
        open={openEditModal}
        onClose={closeEditModalHandler}
      />
    </Card>
  );
}

export default CardDog;
