import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Typography
          sx={{ mt: "8rem" }}
          textAlign={"center"}
          fontFamily={"fantasy"}
          variant="h1"
          color="white"
          fontSize={{
            xs: "30px",
            sm: "50px",
            md: "50px",
            lg: "60px",
            xl: "70px",
          }}
        >
          Sabemos lo importante que es para vos tu mascota, por eso te brindamos
          el mejor servicio a vos y a tu mejor amigo
        </Typography>
        <img
          style={{ height: "500px", width: "800px", marginTop: "6rem" }}
          src="https://www.pedigree.com.ar/cdn-cgi/image/format%3Dauto%2Cq%3D90/sites/g/files/fnmzdf1506/files/2022-07/hero-default-dog_0.png"
        ></img>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: "1rem", boxShadow: " 0 0 0 4px", color: "black" }}
        >
          Reservar un turno
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
