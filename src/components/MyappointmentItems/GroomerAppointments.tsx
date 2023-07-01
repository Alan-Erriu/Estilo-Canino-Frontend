import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Button, Select } from "@mui/material";
import apiClient from "../../utils/client";
import { getUserData } from "../../redux/userSlice";
import { useAppSelector } from "../../redux/hook";
import CardAppointment from "../TurnItems/CardAppointment";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const GroomerAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const [selectedGroomerId, setSelectedGroomerId] = useState("");
  const [appointments, setAppointments] = useState([]);

  const userData = useAppSelector(getUserData);

  const handleGroomerChange = (event) => {
    setSelectedGroomerId(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterClick = async () => {
    const dateData = {
      date: selectedDate.date().toString().padStart(2, "0"),
      month: (selectedDate.month() + 1).toString().padStart(2, "0"),
      year: selectedDate.year().toString(),
      day: selectedDate.day().toString(),
    };

    const data = {
      date: dateData.date,
      month: dateData.month,
      year: dateData.year,
      day: dateData.day,
      groomerId: userData.userId,
    };

    try {
      const responseAppointment = await apiClient.post("/turn/alls", data, {
        headers: { Authorization: userData.authToken },
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
        {
          headers: { Authorization: userData.authToken },
        }
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
            Seleccione una fecha para ver sus turnos tomados
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
      {appointments.map((appointment) => (
        <CardAppointment
          key={appointment._id}
          appointment={appointment}
          deleteAppointment={deleteAppointment}
        />
      ))}
    </Box>
  );
};

export default GroomerAppointments;
