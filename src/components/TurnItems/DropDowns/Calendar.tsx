import { Box, Typography, TextField } from "@mui/material";
import DatePicker from "react-datepicker";

const Calendar = () => {
  return (
    <Box>
      <Typography variant="h4">Calendario</Typography>
      {/* <Box my={2}>
        <TextField
          type="date"
          label="Seleccionar fecha"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box> */}
      <Box display="flex" flexWrap="wrap">
        <DatePicker
          inline
          locale="es"
          calendarStartDay={0}
          minDate={new Date()}
          //   maxDate={addDays(new Date(), 21)}
          timeIntervals={15}
          //   selected={selectedDate}
          //   onChange={(date) => {
          //     date.setMinutes(Math.round(date.getMinutes() / 20) * 15)
          //     setSelectedDate(date)
          //     //if (date.getDate() == pickedDate.date)
          //     dispatch(appointmentPicker({date}))
          //     }}
          showTimeSelect
          timeCaption="horarios"
          // minTime={setHours(setMinutes(selectedDate, mmStart), hhStart)}
          // maxTime={setHours(setMinutes(selectedDate, mmEnd), hhEnd)}
          // dateFormat="MMMM d, yyyy h:mm aa"
          // timeClassName={handleColor}
          // filterDate={isWeekday}
          // excludeTimes={timesExcluded}
          // excludeDates={disabledDates}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
