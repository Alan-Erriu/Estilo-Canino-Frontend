import { useEffect, useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  CardContent,
  Typography,
  Card,
  Box,
  Grid,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getDogs, getUserData, setUserData } from "../redux/userSlice";
import apiClient from "../utils/client";
import CardAppointment from "../components/TurnItems/CardAppointment";
import GroomerAppointments from "../components/MyappointmentItems/GroomerAppointments";
import { setClientId, setDateData } from "../redux/appointmentSlice";
import { setGroomerData } from "../redux/usersTypeGroomerSlice";
import { setClientData } from "../redux/usersTypeClientSlice";
import dayjs from "dayjs";

const MyAppointments = () => {
  const [selectedDogId, setSelecteselectedDogId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const userData = useAppSelector(getUserData);
  const allDogsUser = useAppSelector(getDogs);

  const dispatch = useAppDispatch();
  //obtengo el token del local sotare. previamente se guardo en login
  const tokenLocalStorage = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: tokenLocalStorage,
        };
        //informacion del usuario con el id guardado en el token
        const responseUser = await apiClient.get("user", { headers });
        //traemos los perros de la base de datos con el id guardado en el token
        const responseDog = await apiClient.get("dog", { headers });
        //todos los usarios
        const responseRoles = await apiClient.get("user/all", { headers });
        const dataUserFromBack = responseUser.data;
        const { name, age, email, role, _id } = dataUserFromBack;
        //creamos el objeto user para luego mandarlo a redux, con su rol y perros si es que tiene
        const dataUser = {
          name,
          age,
          email,
          role: role[0]?.name || "Usuario",
          userId: _id,
          authToken: tokenLocalStorage,
          dogs: responseDog.data.dogs,
        };
        //filtramos por rol para ver si es cliente o peluquero
        const clients = responseRoles.data.filter(
          (user) => user.role[0]?.name === "cliente"
        );
        //filtramos por rol para ver si es cliente o peluquero
        const groomers = responseRoles.data.filter(
          (user) => user.role[0]?.name === "peluquero"
        );
        //creamos un objeto con la fecha de hoy para que los filtros tengan la fecha por defecto actualizad a hoy
        const currentDate = dayjs().format("YYYY-MM-DD HH:mm");
        const [date] = currentDate.split(" ");
        const [year, month, day] = date.split("-");
        const dayOfWeek = dayjs().day().toString();
        //seteamos la informacion del usuario en redux con la combinacion de fetchs
        dispatch(setUserData(dataUser));
        //actualizamos el estado de redux en appointementCurrent (le cargamos por defecto la fecha de hoy para el nuevo turnos)
        dispatch(
          setDateData({
            date: day,
            year,
            month,
            day: dayOfWeek,
          })
        );
        //seteamos todos los clientes de la base de datos a redux
        dispatch(setClientData(clients));
        //seteamos todos los peluquero al estado de redux
        dispatch(setGroomerData(groomers));
        dataUser.role === "cliente" ? dispatch(setClientId(_id)) : null;
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDogChange = (event) => {
    setSelecteselectedDogId(event.target.value);
  };

  const getDogName = (dogId) => {
    const dog = allDogsUser.find((dog) => dog._id === dogId);
    return dog ? dog.name : "";
  };

  const handleFilterClick = async () => {
    const selectedDog = allDogsUser.find((dog) => dog._id === selectedDogId);

    const dogId = selectedDog ? selectedDog._id : "";

    const data = {
      dogId,
    };

    try {
      const responseAppointment = await apiClient.post("/turn/alldog", data, {
        headers: { Authorization: tokenLocalStorage },
      });
      setAppointments(responseAppointment.data);
    } catch (error) {
      console.log(error);
    }
  };
  // borrar el turno seleccionado y actualizar el array con los turnos
  const deleteAppointment = async (appointment) => {
    try {
      const responseAppointment = await apiClient.delete(
        `turn/${appointment._id}`,
        { headers: { Authorization: tokenLocalStorage } }
      );

      if (responseAppointment.data.message === "Turn deleted successfully") {
        alert("Turno borrado exitosamente");

        const updatedAppointments = appointments.filter(
          (apt) => apt._id !== appointment._id
        );
        setAppointments(updatedAppointments);
      } else {
        alert("Algo salió mal");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  //si el usuario es distinto de cliente se muestra este comoponente
  if (userData.role !== "cliente") {
    return <GroomerAppointments />;
  }
  //si el usario es cliente se muestra este componente
  return (
    <Box>
      <Box sx={{ mt: { xs: "3rem" } }}>
        <Card sx={{ backgroundColor: "rgba(0, 51, 153, 1)" }}>
          <Typography
            fontSize={{
              xs: "15px",
              sm: "20px",
              md: "20px",
              lg: "30px",
              xl: "30px",
            }}
            textAlign="center"
            variant="h3"
            color="white"
            sx={{ mt: 2 }}
          >
            Seleccione un perro para ver sus turnos tomados
          </Typography>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              gap: { xs: 2, sm: 2, md: 2 },
            }}
          >
            <Select
              sx={{ width: "250px", backgroundColor: "white" }}
              variant="outlined"
              displayEmpty
              value={selectedDogId}
              onChange={handleDogChange}
              renderValue={(value) =>
                value ? getDogName(value) : "Seleccione un perro"
              }
            >
              <MenuItem
                value=""
                disabled
                sx={{ width: "250px", backgroundColor: "white" }}
              >
                Seleccione un perro
              </MenuItem>
              {allDogsUser.map((dog) => (
                <MenuItem key={dog._id} value={dog._id}>
                  {dog.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              sx={{ backgroundColor: "white", color: "black" }}
              variant="contained"
              onClick={handleFilterClick}
            >
              filtrar
            </Button>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mx: "2rem",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 0, sm: 10, md: 2, lg: 4, xl: 3 }}
        >
          {appointments.map((appointment, i) => (
            <Grid key={i} item xs={12} sm={6} md={6} lg={4} xl={3}>
              <CardAppointment
                key={appointment._id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MyAppointments;
