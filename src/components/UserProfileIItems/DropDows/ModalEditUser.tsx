import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function ModalEditUser({
  open,
  handleClose,
  handleSubmit,
  formValues,
  handleInputChange,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar perfil</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <TextField
          label="Edad"
          name="age"
          value={formValues.age}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalEditUser;
