import { MenuItem, Select } from "@mui/material";
import { useAppSelector } from "../../../redux/hook";
import { getUserData } from "../../../redux/userSlice";
const FilterByUser = () => {
  //   const userData = useAppSelector(getUserData);
  return (
    <Select
      variant="outlined"
      displayEmpty
      defaultValue=""
      renderValue={(value) => (value ? value : "Seleccione un peluquero")}
    >
      <MenuItem value="" disabled>
        {/* {userData.role == "cliente"
          ? "Selecione un peluquero"
          
          : "Selecione un cliente"} */}
        Selecione un cliente
      </MenuItem>
      <MenuItem value="Sucursal 1">Peluquero 1</MenuItem>
      <MenuItem value="Sucursal 2">Peluquero 2</MenuItem>
      <MenuItem value="Sucursal 3">Peluquero 3</MenuItem>
    </Select>
  );
};

export default FilterByUser;
