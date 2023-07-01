import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import PetsIcon from "@mui/icons-material/Pets";
import { getUserData, setLogoutData } from "../redux/userSlice";
import { setLogoutAppointment } from "../redux/appointmentSlice";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // consultar rol para mostrar o no ruta admin y camiar avatar
  const userData = useAppSelector(getUserData);

  //*funciones para cerra sesión------------------
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    //limpiamos el local storage y los estados de redux
    localStorage.removeItem("token");
    dispatch(setLogoutData());
    dispatch(setLogoutAppointment());
    navigate("/login");
  };

  return (
    <AppBar
      sx={{
        /* backgroundColor: "#3D0E03"*/ backgroundColor: "rgba(0, 51, 153, 1)",
      }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ----------------------------start logo desk---------------------- */}
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* ----------------------------start logo desk---------------------- */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* ----------------------start settings menu mobile---------------------------------------- */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/miperfil"}
                >
                  <Typography textAlign="center">Mi perfil</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/nuevo turno"}
                >
                  <Typography textAlign="center">Nuevo turno</Typography>
                </Link>
              </MenuItem>

              {userData.role !== "administrador"
                ? [
                    <MenuItem key={111111} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/misturnos"}
                      >
                        Ver mis turnos
                      </Link>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key={11122111} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/admin/turnos"
                      >
                        <Typography textAlign="center">Admin Turnos</Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key={1112222111} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/admin/crearusuario"
                      >
                        <Typography textAlign="center">
                          Admin Crear Peluqueros
                        </Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key={111222299111} onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/admin/usuarios"
                      >
                        <Typography textAlign="center">
                          Admin Borrar Usuarios
                        </Typography>
                      </Link>
                    </MenuItem>,
                  ]}
            </Menu>
            {/* ----------------------end settings menu mobile---------------------------------------- */}
          </Box>
          {/*-------------------------- start logo mobile----------------------- */}
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />{" "}
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Inicio
            </Link>
          </Typography>
          {/*-------------------------- end logo mobile----------------------- */}
          {/* ---------------------------------start menu desk---------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/miperfil"}
              >
                Mi perfil
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/nuevoturno"}
              >
                Nuevo turno
              </Link>
            </Button>

            {userData.role !== "administrador"
              ? [
                  <Button
                    key={22222}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={"/misturnos"}
                    >
                      Ver mis turnos
                    </Link>
                  </Button>,
                ]
              : [
                  <Button
                    key={2332222}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/admin/turnos"
                    >
                      Admin Turnos
                    </Link>
                  </Button>,
                  <Button
                    key={222322}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/admin/crearusuario"
                    >
                      Admin Crear Peluqueros
                    </Link>
                  </Button>,
                  <Button
                    key={2222222}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to="/admin/usuarios"
                    >
                      Admin Borrar Usuarios
                    </Link>
                  </Button>,
                ]}
            {/* ---------------------------------end menu desk---------------- */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir Opciones">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {userData.role!! ? (
                  <Avatar
                    alt="avatar"
                    src="https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=2000"
                  />
                ) : (
                  <Avatar
                    alt="avatar"
                    src="https://png.pngtree.com/png-vector/20220628/ourlarge/pngtree-user-profile-avatar-vector-admin-png-image_5289693.png"
                  />
                )}
              </IconButton>
            </Tooltip>
            {/* --------------start settings menu---------------------- */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userData.role === ""
                ? [
                    <MenuItem key={3333} onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/register"
                      >
                        <Typography textAlign="center">Registrarme</Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key={22} onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/login"
                      >
                        <Typography textAlign="center">
                          Iniciar sesión
                        </Typography>
                      </Link>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key={4444444} onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/miperfil"
                      >
                        <Typography textAlign="center">Mi perfil</Typography>
                      </Link>
                    </MenuItem>,

                    <MenuItem key="logout" onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleLogout}>
                        Cerrar sesión
                      </Typography>
                    </MenuItem>,
                  ]}
            </Menu>

            {/* --------------end settings menu---------------------- */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
