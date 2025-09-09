import { useState } from "react";

export const SearchBar = ({
  onSearch,
  searchType = "users", // "users", "pets", "services", "bookings"
  placeholder = "Buscar...",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [state, setState] = useState("");

  const getPlaceholder = () => {
    switch (searchType) {
      case "users":
        return "Buscar por nombre o email...";
      case "pets":
        return "Buscar por nombre de mascota o tipo...";
      case "services":
        return "Buscar por tipo de servicio...";
      case "bookings":
        return "Buscar por ID de reserva...";
      default:
        return placeholder;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchTerm, role, state);
      }}
      className={`flex gap-2 ${className}`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={getPlaceholder()}
        className="w-80 input input-bordered flex-1"
      />

      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="input input-bordered"
      >
        <option value="">Todos</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="input input-bordered"
      >
        <option value="">Todos</option>
        <option value="OWNER">OWNER</option>
        <option value="SITTER">SITTER</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
};
