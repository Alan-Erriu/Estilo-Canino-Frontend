import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { Button } from "@mui/material";

const CardAppointment = ({ appointment, deleteAppointment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        width: { xs: "100%", sm: "100%", md: "90%" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#0f203b",
          width: { xs: "90%", sm: "70%", md: "400px" },
          mt: "2rem",
          ml: { md: "4rem" },
          justifyContent: "center",
          textAlign: "start",
        }}
      >
        <Typography fontSize={"30px"} variant="h3" color="white">
          Peluquero: {appointment.groomer.name}
        </Typography>

        <Typography
          sx={{ mt: "1rem" }}
          variant="h4"
          color="white"
          fontSize="20px"
        >
          Cliente: {appointment.client.name}
        </Typography>
        <Typography
          sx={{ mt: "1rem", color: "green" }}
          variant="h4"
          color="white"
          fontSize="20px"
        >
          Perro: {appointment.dog.name}
        </Typography>
        <Typography
          sx={{ mt: "1rem" }}
          variant="h4"
          color="white"
          fontSize="20px"
        >
          fecha: {appointment.date}/{appointment.month}/{appointment.year}
        </Typography>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "start",
            gap: "30px",
            mt: "1rem",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ boxShadow: " 0 0 0 4px", color: "black" }}
            onClick={() => deleteAppointment(appointment)}
          >
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
                fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                color="white"
              >
                <LanguageIcon />
                Eliminar Turno
              </Typography>
            </Box>
          </Button>

          <Button
            variant="contained"
            color="success"
            sx={{ boxShadow: " 0 0 0 4px", color: "black" }}
            onClick={() => console.log(appointment._id)}
          >
            <Box>
              <Typography
                sx={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
                fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
                color="white"
              >
                <GitHubIcon />
                {appointment.time}
              </Typography>
            </Box>
          </Button>
        </CardActions>
      </Box>
    </Box>
  );
};

export default CardAppointment;
