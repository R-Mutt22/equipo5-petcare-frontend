export const AdminTable = () => {  
  const [activeTab, setActiveTab] = useState("Owners");  
  const [owners, setOwners] = useState([]);  
  const [sitters, setSitters] = useState([]);  
  const [bookings, setBookings] = useState([]);  
  
  return (  
    <div className="container mx-auto p-4">  
      {/* Tabs actualizadas */}  
      <div className="tabs tabs-boxed mb-4">  
        <button className={`tab ${activeTab === "Owners" ? "tab-active" : ""}`}>  
          Dueños (Owners)  
        </button>  
        <button className={`tab ${activeTab === "Sitters" ? "tab-active" : ""}`}>  
          Cuidadores (Sitters)  
        </button>  
        <button className={`tab ${activeTab === "Bookings" ? "tab-active" : ""}`}>  
          Reservas  
        </button>  
      </div>  
  
      <table className="table table-zebra w-full">  
        <thead>  
          <tr>  
            <th>ID</th>  
            <th>Nombre</th>  
            <th>Email</th>  
            <th>Rol</th>  
            <th>Teléfono</th>  
            <th>Activo</th>  
            <th>Acciones</th>  
          </tr>  
        </thead>  
        <tbody>  
          {getTableData().map((item) => (  
            <tr key={item.id_user}>  
              <td>{item.id_user}</td>  
              <td>{item.name_user}</td>  
              <td>{item.email_user}</td>  
              <td>{item.role_user}</td>  
              <td>{item.phone_user}</td>  
              <td>{item.active_user ? "Activo" : "Inactivo"}</td>  
              <td>  
                <button className="btn btn-sm btn-error">Eliminar</button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </div>  
  );  
};