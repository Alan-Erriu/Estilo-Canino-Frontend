import { Box, CardMedia, Typography, Grid } from "@mui/material";
import apiClient from "../utils/client";
import { useAppDispatch } from "../redux/hook";
import { useEffect } from "react";
import { setUserData } from "../redux/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token del local storage
        const tokenLocalStorage = localStorage.getItem("token");

        const headers = {
          Authorization: tokenLocalStorage,
        };

        // Solicitud de datos del usuario logueado
        const responseUser = await apiClient.get("user", { headers });
        const responseDog = await apiClient.get("dog", { headers });
        const dataUserFromBack = responseUser.data;

        const { name, age, email, role, _id } = dataUserFromBack;

        const dataUser = {
          name,
          age,
          email,
          role: role[0]?.name || "Usuario",
          userId: _id,
          authToken: tokenLocalStorage,
          dogs: responseDog.data.dogs,
        };

        dispatch(setUserData(dataUser));
      } catch (error) {
        console.warn("El usuario debe iniciar sesión:", error.message);
      }
    };

    fetchData();
  }, []);

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
                xs: "25px",
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
                xs: "300px",
                sm: "500px",
                md: "500px",
                lg: "800px",
                xl: "600px",
              },
              width: {
                xs: "250px",
                sm: "600px",
                md: "500px",
                lg: "800px",
                xl: "600px",
              },
              marginTop: "6rem",
              ml: { xs: "100px", xl: "20rem" },
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
