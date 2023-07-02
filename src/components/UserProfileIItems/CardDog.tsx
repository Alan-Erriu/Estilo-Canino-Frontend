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
      await apiClient.delete(`dog/${dog._id}`, { headers }).then(() => {
        const updatedDogs = userData.dogs.filter((d) => d._id !== dog._id);
        const updatedUserData = {
          ...userData,
          dogs: updatedDogs,
        };

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
    <Card
      sx={{
        display: "flex",
        width: { xs: "300px", md: "450px" },
        height: { xs: "300px", md: "300px" },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: 150, md: 200 },
          height: { xs: 250, md: 250 },
          mt: { xs: "1rem" },
        }}
        image="https://img.freepik.com/vector-premium/caricatura-divertido-perrito-sentado_29190-6858.jpg?w=2000"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Nombre: {dog.name.charAt(0).toUpperCase() + dog.name.slice(1)}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Raza:{dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1)}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Edad: {dog.age}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 1,
            pb: 1,
            flexDirection: { xs: "column", md: "row" },
            mb: 4,
            ml: { md: 5 },
          }}
        >
          <IconButton onClick={modal}>Borrar</IconButton>

          <IconButton onClick={openEditModalHandler}>Editar</IconButton>
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
