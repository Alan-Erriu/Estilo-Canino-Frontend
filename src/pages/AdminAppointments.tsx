import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, Select, MenuItem, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getGroomerData, setGroomerData } from "../redux/usersTypeGroomerSlice";
import apiClient from "../utils/client";
import CardAppointment from "../components/TurnItems/CardAppointment";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { setUserData } from "../redux/userSlice";
import { setClientId, setDateData } from "../redux/appointmentSlice";
import { setClientData } from "../redux/usersTypeClientSlice";

const Admin = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const [selectedGroomerId, setSelectedGroomerId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const dispatch = useAppDispatch();
  const allGroomersData = useAppSelector(getGroomerData);
  const [isLoading, setIsLoading] = useState(true);

  const tokenLocalStorage = localStorage.getItem("token");
  const headers = {
    Authorization: tokenLocalStorage,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handleGroomerChange = (event) => {
    setSelectedGroomerId(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getGroomerName = (groomerId) => {
    const groomer = allGroomersData.groomers.find(
      (groomer) => groomer._id === groomerId
    );
    return groomer ? groomer.name : "";
  };

  const handleFilterClick = async () => {
    const dateData = {
      date: selectedDate.date().toString().padStart(2, "0"),
      month: (selectedDate.month() + 1).toString().padStart(2, "0"),
      year: selectedDate.year().toString(),
      day: selectedDate.day().toString(),
    };

    const selectedGroomer = allGroomersData.groomers.find(
      (groomer) => groomer._id === selectedGroomerId
    );

    const groomerId = selectedGroomer ? selectedGroomer._id : "";

    const data = {
      date: dateData.date,
      month: dateData.month,
      year: dateData.year,
      day: dateData.day,
      groomerId,
    };

    try {
      const responseAppointment = await apiClient.post("/turn/alls", data, {
        headers,
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
        { headers }
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
            Seleccione una fecha y un peluquero para ver sus turnos tomados
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
            <DatePicker
              sx={{ width: "250px", backgroundColor: "white" }}
              value={selectedDate}
              onChange={handleDateChange}
            />
            <Select
              sx={{ width: "250px", backgroundColor: "white", color: "black" }}
              variant="outlined"
              displayEmpty
              value={selectedGroomerId}
              onChange={handleGroomerChange}
              renderValue={(value) =>
                value ? getGroomerName(value) : "Seleccione un peluquero"
              }
            >
              <MenuItem value="" disabled>
                Seleccione un peluquero
              </MenuItem>
              {allGroomersData.groomers.map((groomer) => (
                <MenuItem key={groomer._id} value={groomer._id}>
                  {groomer.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              sx={{ width: "250px", backgroundColor: "white", color: "black" }}
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

export default Admin;
