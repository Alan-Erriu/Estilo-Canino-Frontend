import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import apiClient from "../../../utils/client";
import {
  getGroomerData,
  setGroomerData,
} from "../../../redux/usersTypeGroomerSlice";
import {
  getClientData,
  setClientData,
} from "../../../redux/usersTypeClientSlice";

const TableUsers = () => {
  const dispatch = useAppDispatch();
  const tokenLocalStorage = localStorage.getItem("token");

  const allGroomerData = useAppSelector(getGroomerData);
  const allClientData = useAppSelector(getClientData);
  const [usersFilters, setUsersFilters] = useState([]); // Corrección aquí
  const [userType, setUserType] = useState("");
  const deleteUserById = async (userId: string) => {
    try {
      const headers = {
        Authorization: tokenLocalStorage,
      };
      const response = await apiClient.delete("user", {
        data: { id: userId },
        headers,
      });
      if (response.data.message === "User deleted successfully") {
        alert("Usuario borrado exitosamente");
        console.log(response);
        if (userType === "groomer") {
          const updatedGroomers = allGroomerData.groomers.filter(
            (groomer) => groomer._id !== userId
          );
          dispatch(setGroomerData(updatedGroomers));
        } else {
          const updatedClients = allClientData.client.filter(
            (client) => client._id !== userId
          );
          dispatch(setClientData(updatedClients));
        }
      } else {
        alert("Algo salió mal");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTypeChange = (type: string) => {
    setUserType(type);
  };

  useEffect(() => {
    if (userType === "groomer") {
      setUsersFilters(allGroomerData.groomers); // Corrección aquí
    } else {
      setUsersFilters(allClientData.client); // Corrección aquí
    }
  }, [userType, allGroomerData.groomers, allClientData.client]);

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => handleUserTypeChange("groomer")}
      >
        Mostrar Peluquero
      </Button>
      <Button
        variant="contained"
        onClick={() => handleUserTypeChange("client")}
      >
        Mostrar Clientes
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre </TableCell>
              <TableCell align="right">Edad</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersFilters.map((user, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.age}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => deleteUserById(user._id)}
                  >
                    Borrar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableUsers;
