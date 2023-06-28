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

function Appointment() {
  const dispatch = useDispatch();
  const tokenLocalStorage = localStorage.getItem("token");
  const dataNewAppointment = useAppSelector(getCurrentAppointment);
  //   const dataUser = useAppSelector(getUserData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: tokenLocalStorage,
        };

        const [responseUser, responseDog, responseRoles] = await Promise.all([
          apiClient.get("user", { headers }),
          apiClient.get("dog", { headers }),
          apiClient.get("user/all", { headers }),
          ,
        ]);

        const dataUserFromBack = responseUser.data;
        const { name, age, email, _id } = dataUserFromBack;

        const dataUser = {
          name,
          age,
          email,
          role:
            responseRoles.data.find((user) => user.role[0]?.name === "cliente")
              ?.name || "Usuario",
          userId: _id,
          authToken: tokenLocalStorage,
          dogs: responseDog.data.dogs,
        };

        const clients = responseRoles.data.filter(
          (user) => user.role[0]?.name === "cliente"
        );
        const groomers = responseRoles.data.filter(
          (user) => user.role[0]?.name === "peluquero"
        );

        const currentDate = dayjs().format("YYYY-MM-DD HH:mm");
        const [date, time] = currentDate.split(" ");
        const [year, month, day] = date.split("-");
        const dayOfWeek = dayjs().day().toString();

        dispatch(setUserData(dataUser));
        dispatch(
          setDateData({
            date: day,
            year,
            month,
            day: dayOfWeek,
          })
        );
        dispatch(setClientId(_id));
        dispatch(setClientData(clients));
        dispatch(setGroomerData(groomers));

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
      await apiClient.post("turn/create", {
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
      <div style={{ marginBottom: "16px" }}>
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
