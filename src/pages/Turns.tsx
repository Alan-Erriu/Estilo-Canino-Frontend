import FilterByUser from "../components/TurnItems/DropDowns/FilterByUser";

function BranchOfficeSelector() {
  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <FilterByUser />
      </div>

      <div style={{ marginTop: "16px" }}>
        <h5>Turnos peluquero seleccionado</h5>
        {/* Aquí puedes agregar el componente de calendario */}
      </div>
    </>
  );
}

export default BranchOfficeSelector;
