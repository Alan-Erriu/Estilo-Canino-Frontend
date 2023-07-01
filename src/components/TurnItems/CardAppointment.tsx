import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
const CardAppointment = ({ appointment, deleteAppointment }) => {
  return (
    <Card sx={{ minWidth: 275, width: "400px", mt: "10rem" }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: "1rem" }}>
          Turno tomado
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Fecha:{appointment.date}/{appointment.month}/{appointment.year}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Hora: {appointment?.time}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Peluquero:{appointment.groomer?.name}
        </Typography>
        <Typography sx={{ mb: 1 }} variant="body2">
          Cliente: {appointment.client?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => deleteAppointment(appointment)}
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "rgba(0, 51, 153, 1)" }}
          fullWidth
        >
          Eliminar Turnos
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardAppointment;
