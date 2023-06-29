import FilterByUser from "../components/TurnItems/DropDowns/FilterByUser";
import apiClient from "../utils/client";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { setGroomerData } from "../redux/usersTypeGroomerSlice";
import { setClientData } from "../redux/usersTypeClientSlice";
import {
  getCurrentAppointment,
  setClientId,
  setDateData,
} from "../redux/appointmentSlice";
import Calendar from "../components/TurnItems/DropDowns/Calendar";
import { useAppSelector } from "../redux/hook";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import SelectClient from "../components/TurnItems/DropDowns/SelectClient";

function Appointment() {
  const dispatch = useDispatch();
  //obtengo el token del local sotare. previamente se guardo en login
  const tokenLocalStorage = localStorage.getItem("token");
  const dataNewAppointment = useAppSelector(getCurrentAppointment);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: tokenLocalStorage,
        };
        //informacion del usuario con el id guardado en el token
        const responseUser = await apiClient.get("user", { headers });
        //traemos los perros de la base de datos con el id guardado en el token
        const responseDog = await apiClient.get("dog", { headers });
        //todos los usarios
        const responseRoles = await apiClient.get("user/all", { headers });
        const dataUserFromBack = responseUser.data;
        const { name, age, email, role, _id } = dataUserFromBack;
        //creamos el objeto user para luego mandarlo a redux, con su rol y perros si es que tiene
        const dataUser = {
          name,
          age,
          email,
          role: role[0]?.name || "Usuario",
          userId: _id,
          authToken: tokenLocalStorage,
          dogs: responseDog.data.dogs,
        };
        //filtramos por rol para ver si es cliente o peluquero
        const clients = responseRoles.data.filter(
          (user) => user.role[0]?.name === "cliente"
        );
        //filtramos por rol para ver si es cliente o peluquero
        const groomers = responseRoles.data.filter(
          (user) => user.role[0]?.name === "peluquero"
        );
        //creamos un objeto con la fecha de hoy para que los filtros tengan la fecha por defecto actualizad a hoy
        const currentDate = dayjs().format("YYYY-MM-DD HH:mm");
        const [date, time] = currentDate.split(" ");
        const [year, month, day] = date.split("-");
        const dayOfWeek = dayjs().day().toString();
        //seteamos la informacion del usuario en redux con la combinacion de fetchs
        dispatch(setUserData(dataUser));
        //actualizamos el estado de redux en appointementCurrent (le cargamos por defecto la fecha de hoy para el nuevo turnos)
        dispatch(
          setDateData({
            date: day,
            year,
            month,
            day: dayOfWeek,
          })
        );
        //seteamos todos los clientes de la base de datos a redux
        dispatch(setClientData(clients));
        //seteamos todos los peluquero al estado de redux
        dispatch(setGroomerData(groomers));
        dataUser.role === "cliente" ? dispatch(setClientId(_id)) : null;
        setIsLoading(false);
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchData();
  }, []);

  const headers = {
    Authorization: tokenLocalStorage,
  };

  const createAppointment = async () => {
    try {
      const response = await apiClient.post("turn/create", {
        date: dataNewAppointment.date,
        month: dataNewAppointment.month,
        year: dataNewAppointment.year,
        day: dataNewAppointment.day,
        time: dataNewAppointment.time,
        groomer: dataNewAppointment.groomer,
        dog: dataNewAppointment.dog,
        client: dataNewAppointment.client,
      });
      alert("turno creado con exito");
    } catch (error) {
      console.log(error);
      if (error.request.response === "date and time is in the past")
        alert("El turno tiene que ser para un horario proximo al actual");

      alert("Algo salió mal");
    }
  };

  const handleFetchError = (error) => {
    console.warn("El usuario debe iniciar sesión:", error.message);
    setIsLoading(false);
  };
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div style={{ marginBottom: "16px", display: "flex" }}>
        <SelectClient />
        <FilterByUser />
      </div>

      <div style={{ marginTop: "16px" }}>
        <h5>Turnos peluquero seleccionado</h5>
        <Calendar />
      </div>
      <div>
        <p>
          time <br />
          {dataNewAppointment.time}
        </p>
        <p>
          date
          <br />
          {dataNewAppointment.date}
        </p>
        <p>
          day
          <br />
          {dataNewAppointment.day}
        </p>
        <p>
          month
          <br />
          {dataNewAppointment.month}
        </p>
        <p>
          year
          <br />
          {dataNewAppointment.year}
        </p>
        <p>
          groomer
          <br />
          {dataNewAppointment.groomer}
        </p>
        <p>
          client
          <br />
          {dataNewAppointment.client}
        </p>
        <p>
          dog
          <br />
          {dataNewAppointment.dog}
        </p>
        <Button onClick={createAppointment} variant="contained" color="inherit">
          Confirmar Turno
        </Button>
      </div>
    </>
  );
}

export default Appointment;
