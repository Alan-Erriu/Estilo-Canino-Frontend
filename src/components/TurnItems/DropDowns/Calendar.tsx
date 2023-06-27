import { useState } from "react";
import { Card, CardContent, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (date) => {
    // Obtener el día, mes, año y día de la semana de la fecha seleccionada
    const day = date.date();
    const month = date.month() + 1; // Los meses en dayjs comienzan desde 0
    const year = date.year();
    const dayOfWeek = date.day();

    // Actualizar los valores en el estado
    setSelectedDate(date);

    // Hacer algo con los valores (por ejemplo, imprimirlos en la consola)
    console.log("Date:", day);
    console.log("Month:", month);
    console.log("Year:", year);
    console.log("Day:", dayOfWeek);
  };

  return (
    <div>
      <Card elevation={1}>
        <CardContent>
          <div className="text-start">
            <h1>Date Picker</h1>
          </div>

          <Grid direction="row" container spacing={2} my={2.5}>
            <Grid item xs={12} sm={12} xl={3} lg={3}>
              <TextField
                label="Fecha"
                value={selectedDate.format("YYYY-MM-DD")}
                InputProps={{
                  readOnly: true,
                }}
              />
              <DatePicker value={selectedDate} onChange={handleDateChange} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
