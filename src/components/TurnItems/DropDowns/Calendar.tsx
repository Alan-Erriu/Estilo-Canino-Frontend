import { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import SelectHours from "./SelectHours";
import SelecDog from "./SelecDog";
import { useAppDispatch } from "../../../redux/hook";
import { setDateData } from "../../../redux/appointmentSlice";
import FilterByUser from "./FilterByUser";
import SelectClient from "./SelectClient";

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const dispatch = useAppDispatch();

  const handleDateChange = (date) => {
    // Obtener el día, mes, año y día de la semana de la fecha seleccionada
    const currentDate = date.date().toString();
    const month = (date.month() + 1).toString().padStart(2, "0"); // Los meses en dayjs comienzan desde 0
    const year = date.year().toString();
    const day = date.day().toString();

    // Actualizar los valores en el estado
    setSelectedDate(date);

    // Llamar a la acción setDateData con los 4 campos
    dispatch(setDateData({ date: currentDate, month, year, day }));
  };

  return (
    <div>
      <Card sx={{ backgroundColor: "rgba(0, 51, 153, 1)" }}>
        <Typography
          fontSize={{
            xs: "10px",
            sm: "20px",
            md: "20px",
            lg: "30px",
            xl: "30px",
          }}
          textAlign="center"
          variant="h3"
          color="white"
        >
          Todos los campos deben estar completos, recuerde primero seleccionar
          el peluquero
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SelectClient />
          <FilterByUser />
          <DatePicker
            sx={{ width: "250px", backgroundColor: "white" }}
            value={selectedDate}
            onChange={handleDateChange}
          />
          <SelectHours />
          <SelecDog />
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
