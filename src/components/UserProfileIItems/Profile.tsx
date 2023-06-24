import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../redux/hook";
import { getUserData } from "../../redux/userSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import apiClient from "../../utils/client";

function Profile() {
  const userData = useAppSelector(getUserData);
  const [openModal, setOpenModal] = useState(false);
  const [dogName, setDogName] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [dogBreed, setDogBreed] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateDog = async () => {
    try {
      const data = {
        name: dogName,
        age: dogAge,
        breed: dogBreed,
      };

      const headers = {
        Authorization: userData.authToken,
      };
      await apiClient.post("dog", data, { headers }).then((res) => {
        console.log(res.data);
      });

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
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=2000"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {userData.name ? userData.name : "Sin iniciar"}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Tipo de cuenta: <br />
            {userData.role ? userData.role : "Sin iniciar"}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button onClick={handleOpenModal}>Agregar perro</Button>
          <Button>Editar mi perfil</Button>
        </Box>
      </Box>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregar perro</DialogTitle>
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
    </Card>
  );
}

export default Profile;
