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
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";

import { pagesDesk, pagesMobile } from "./NavItems/navigateLinks";
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
    <AppBar sx={{ backgroundColor: "#3D0E03" }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* ----------------------------start logo desk---------------------- */}

          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
            {/* ----------------------start links menu mobile---------------------------------------- */}
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
              {pagesMobile.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={page.linkTo}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
            {/* ----------------------end links menu mobile---------------------------------------- */}
          </Box>
          {/*-------------------------- start logo mobile----------------------- */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
              LOGO
            </Link>
          </Typography>
          {/*-------------------------- end logo mobile----------------------- */}
          {/* ---------------------------------start menu desk---------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesDesk.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={page.linkTo}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
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
                    <MenuItem key="register" onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/register"
                      >
                        <Typography textAlign="center">Registrarme</Typography>
                      </Link>
                    </MenuItem>,
                    <MenuItem key="login" onClick={handleCloseUserMenu}>
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
                    <MenuItem key="profile" onClick={handleCloseUserMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/miperfil"
                      >
                        <Typography textAlign="center">Mi perfil</Typography>
                      </Link>
                    </MenuItem>,
                    userData.role === "administrador" && (
                      <MenuItem key="admin" onClick={handleCloseUserMenu}>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to="/admin"
                        >
                          <Typography textAlign="center">Admin</Typography>
                        </Link>
                      </MenuItem>
                    ),
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
