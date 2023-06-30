import { Box, Button, CardMedia, Typography, Grid } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 0, sm: 10, md: 2, lg: 0, xl: 0 }}
      >
        <Grid
          sx={{ justifyContent: "center" }}
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
        >
          <Box
            sx={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              xs: "colunm",
            }}
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
              Estilo Canino, es una app de peluquería canina, reserva un turno
              con unos de nuestros peluqueros
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <CardMedia
            component="img"
            sx={{
              height: {
                xs: "400px",
                sm: "500px",
                md: "500px",
                lg: "800px",
                xl: "600px",
              },
              width: {
                xs: "300px",
                sm: "600px",
                md: "500px",
                lg: "800px",
                xl: "600px",
              },
              marginTop: "6rem",
              ml: { xl: "20rem", xs: "5rem" },
            }}
            image="https://www.pedigree.com.ar/cdn-cgi/image/format%3Dauto%2Cq%3D90/sites/g/files/fnmzdf1506/files/2022-07/hero-default-dog_0.png"
            alt="Dog"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
