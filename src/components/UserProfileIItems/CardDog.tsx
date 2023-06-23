import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function CardDog() {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://img.freepik.com/vector-premium/caricatura-divertido-perrito-sentado_29190-6858.jpg?w=2000"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            Charly
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Raza:labrador
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            edad: labrador
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">Eliminar</IconButton>
          <IconButton aria-label="play/pause">cortar pelo</IconButton>
          <IconButton aria-label="next">Editar</IconButton>
        </Box>
      </Box>
    </Card>
  );
}
export default CardDog;
