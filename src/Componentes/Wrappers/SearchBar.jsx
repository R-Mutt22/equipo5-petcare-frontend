import { useState } from "react";

export const SearchBar = ({
  onSearch,
  searchType = "users", // "users", "pets", "services", "bookings"
  placeholder = "Buscar...",
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, status);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={getPlaceholder()}
        className="w-80 input input-bordered flex-1"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="input input-bordered"
      >
        <option value="">Todos los estados</option>
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <button type="submit" className="btn btn-primary">
        Buscar
      </button>
    </form>
  );
};
