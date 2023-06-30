import { useState } from "react";
import { Card, CardContent, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import SelectHours from "./SelectHours";
import SelecDog from "./SelecDog";
import { useAppDispatch } from "../../../redux/hook";
import { setDateData } from "../../../redux/appointmentSlice";

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
      <Card elevation={1}>
        <CardContent>
          <div className="text-start">
            <h1>Date Picker</h1>
          </div>

          <Grid direction="row" container spacing={2} my={2.5}>
            <Grid item xs={12} sm={12} xl={12} lg={12}>
              <DatePicker value={selectedDate} onChange={handleDateChange} />
              <SelectHours />
              <SelecDog />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
