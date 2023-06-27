import { MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import { getUserData } from "../../../redux/userSlice";
import { getGroomerData } from "../../../redux/usersTypeGroomerSlice";

const SelectHours = () => {
  //recupero datos del usuario logeado/
  const userData = useAppSelector(getUserData);
  //recupero todos los usuarios tipo peluqueros
  // const allGroomersData = useAppSelector(getGroomerData);

  const availableSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
  ];

  return (
    <Select
      variant="outlined"
      displayEmpty
      defaultValue=""
      renderValue={(value) => (value ? value : "Horarios disponibles")}
    >
      <MenuItem value="" disabled>
        Horarios disponibles
      </MenuItem>
      {availableSlots.map((groomer, i) => (
        <MenuItem key={i} value={groomer}>
          {groomer}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectHours;
