import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { getUserData, setUserData } from "../../redux/userSlice";
import DropDown from "./DropDows/ModalCreateDog";
import { Button } from "@mui/material";
import ModalEditUser from "./DropDows/ModalEditUser";
import apiClient from "../../utils/client";

function Profile() {
  const userData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    try {
      const updatedUserData = {
        ...userData,
        name: formValues.name !== "" ? formValues.name : userData.name,
        email: formValues.email !== "" ? formValues.email : userData.email,
        age: formValues.age !== "" ? formValues.age : userData.age,
        password: formValues.password,
      };

      const headers = {
        Authorization: userData.authToken,
      };

      await apiClient.put("user", updatedUserData, { headers }).then(() => {
        dispatch(setUserData(updatedUserData));
      });

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
        alt="Avatar"
      />
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5">
          {userData.name
            ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
            : "Sin iniciar"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Tipo de cuenta: <br />
          {userData.role ? userData.role : "Sin iniciar"}
        </Typography>
        <Button onClick={handleOpenModal}>Editar mi perfil</Button>
        {userData.role === "cliente" ? <DropDown /> : null}
      </CardContent>
      <ModalEditUser
        open={openModal}
        handleClose={handleCloseModal}
        handleSubmit={updateUser}
        formValues={formValues}
        handleInputChange={handleInputChange}
      />
    </Card>
  );
}

export default Profile;
