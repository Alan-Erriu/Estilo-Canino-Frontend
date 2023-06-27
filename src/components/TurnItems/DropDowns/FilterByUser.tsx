import { MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import { getUserData } from "../../../redux/userSlice";
import { getGroomerData } from "../../../redux/usersTypeGroomerSlice";

const FilterByUser = () => {
  //recupero datos del usuario logeado/
  const userData = useAppSelector(getUserData);
  //recupero todos los usuarios tipo peluqueros
  const allGroomersData = useAppSelector(getGroomerData);
  return (
    <Select
      variant="outlined"
      displayEmpty
      defaultValue=""
      renderValue={(value) => (value ? value : "Seleccione un peluquero")}
    >
      <MenuItem value="" disabled>
        {userData.role == "cliente"
          ? "Selecione un peluquero"
          : "Selecione un cliente"}
      </MenuItem>
      {allGroomersData.groomers.map((groomer, i) => (
        <MenuItem key={i} value={groomer.name}>
          {groomer.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FilterByUser;
