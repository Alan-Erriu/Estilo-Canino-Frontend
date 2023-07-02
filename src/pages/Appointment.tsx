import apiClient from "../utils/client";
import { useDispatch } from "react-redux";
import { getDogs, getUserData, setUserData } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { getGroomerData, setGroomerData } from "../redux/usersTypeGroomerSlice";
import { getClientData, setClientData } from "../redux/usersTypeClientSlice";
import Box from "@mui/material/Box";
import {
  getCurrentAppointment,
  setClientId,
  setDateData,
} from "../redux/appointmentSlice";
import Calendar from "../components/TurnItems/DropDowns/Calendar";
import { useAppSelector } from "../redux/hook";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getDogsByOwnerId } from "../redux/dogSlice";

function Appointment() {
  const dispatch = useDispatch();
  //obtengo el token del local sotare. previamente se guardo en login
  const tokenLocalStorage = localStorage.getItem("token");
  const dataNewAppointment = useAppSelector(getCurrentAppointment);
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

  const createAppointment = async () => {
    try {
      await apiClient.post(
        "turn/create",
        {
          date: dataNewAppointment.date,
          month: dataNewAppointment.month,
          year: dataNewAppointment.year,
          day: dataNewAppointment.day,
          time: dataNewAppointment.time,
          groomer: dataNewAppointment.groomer,
          dog: dataNewAppointment.dog,
          client: dataNewAppointment.client,
        },
        { headers: { Authorization: tokenLocalStorage } }
      );
      alert("Turno creado con éxito");
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message === "Selected date and time is in the past"
      ) {
        alert("La fecha ingresada ya pasó, ingrese una fecha válida");
      } else if (
        error.response.data.message ===
        "Turn already exists for the given date and time"
      ) {
        alert("Ya existe un turno para ese perro y ese peluquero en esa fecha");
      }
    }
  };

  //busco los nombre por id para mostralos en la carta de crear turnos
  const allClients = useAppSelector(getClientData);
  const allGroomers = useAppSelector(getGroomerData);
  const allDogs = useAppSelector(getDogsByOwnerId);
  const dataUser = useAppSelector(getUserData);
  const dogsUser = useAppSelector(getDogs);

  const clientName = allClients.client.find(
    (client) => client._id === dataNewAppointment.client
  )?.name;
  const groomerName = allGroomers.groomers.find(
    (groomer) => groomer._id === dataNewAppointment.groomer
  )?.name;
  let dogName = "";
  if (dataUser.role !== "cliente") {
    dogName = allDogs.find((dog) => dog._id === dataNewAppointment.dog)?.name;
  } else {
    // Obtén el nombre del perro de dataUser.dogs
    dogName = dogsUser.find((dog) => dog._id === dataNewAppointment.dog)?.name;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div style={{ marginBottom: "16px", display: "flex" }}></div>

      <div style={{ marginTop: "16px" }}>
        <Calendar />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ minWidth: 275, width: "400px", mt: "10rem" }}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: "1rem" }}>
                Creando Nuevo Turno
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Fecha: {dataNewAppointment.date}/{dataNewAppointment.month}/
                {dataNewAppointment.year}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Hora: {dataNewAppointment.time}
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Peluquero: {groomerName}
              </Typography>
              <Typography sx={{ mb: 1 }} variant="body2">
                Cliente: {clientName}
              </Typography>
              <Typography variant="body2">Perro: {dogName}</Typography>
            </CardContent>
            <CardActions>
              <Button
                onClick={createAppointment}
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "rgba(0, 51, 153, 1)" }}
                fullWidth
              >
                Confirmar Turno
              </Button>
            </CardActions>
          </Card>
        </Box>
      </div>
    </>
  );
}

export default Appointment;
