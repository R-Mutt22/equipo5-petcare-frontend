export const SearchBar = ({   
  onSearch,   
  searchType = "users", // "users", "pets", "services", "bookings"  
  placeholder = "Buscar...",  
  className = ""   
}) => {  
  const [searchTerm, setSearchTerm] = useState("");  
  
  const getPlaceholder = () => {  
    switch(searchType) {  
      case "users": return "Buscar por nombre, email o teléfono...";  
      case "pets": return "Buscar por nombre de mascota o tipo...";  
      case "services": return "Buscar por tipo de servicio...";  
      case "bookings": return "Buscar por ID de reserva...";  
      default: return placeholder;  
    }  
  };  
  
  return (  
    <form onSubmit={(e) => { e.preventDefault(); onSearch(searchTerm); }} className={`flex gap-2 ${className}`}>  
      <input  
        type="text"  
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)}  
        placeholder={getPlaceholder()}  
        className="input input-bordered flex-1"  
      />  
      <button type="submit" className="btn btn-primary">  
        Buscar  
      </button>  
    </form>  
  );  
};