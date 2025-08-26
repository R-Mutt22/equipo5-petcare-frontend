import { useState, useEffect } from "react";  
import axios from "axios";  
  
export const AdminTable = () => {  
  const [activeTab, setActiveTab] = useState("Owners");  
  const [owners, setOwners] = useState([]);  
  const [sitters, setSitters] = useState([]);  
  const [bookings, setBookings] = useState([]);  
  
  const handleTabClick = (tabName) => {  
    setActiveTab(tabName);  
  };  
  
  const getTableData = () => {  
    switch (activeTab) {  
      case "Owners":  
        return owners;  
      case "Sitters":  
        return sitters;  
      case "Bookings":  
        return bookings;  
      default:  
        return [];  
    }  
  };  
  
  return (  
    <div className="container mx-auto p-4">  
      <div className="tabs tabs-boxed mb-4">  
        <button   
          className={`tab ${activeTab === "Owners" ? "tab-active" : ""}`}  
          onClick={() => handleTabClick("Owners")}  
        >  
          Dueños (Owners)  
        </button>  
        <button   
          className={`tab ${activeTab === "Sitters" ? "tab-active" : ""}`}  
          onClick={() => handleTabClick("Sitters")}  
        >  
          Cuidadores (Sitters)  
        </button>  
        <button   
          className={`tab ${activeTab === "Bookings" ? "tab-active" : ""}`}  
          onClick={() => handleTabClick("Bookings")}  
        >  
          Reservas  
        </button>  
      </div>  
  
      <div className="overflow-x-auto">  
        <table className="table table-zebra w-full">  
          <thead>  
            <tr>  
              <th>ID</th>  
              <th>Nombre</th>  
              <th>Email</th>  
              <th>Rol</th>  
              <th>Acciones</th>  
            </tr>  
          </thead>  
          <tbody>  
            {getTableData().map((item) => (  
              <tr key={item.id}>  
                <td>{item.id}</td>  
                <td>{item.name}</td>  
                <td>{item.email}</td>  
                <td>  
                  <span className={`badge ${  
                    activeTab === "Owners" ? "badge-primary" :   
                    activeTab === "Sitters" ? "badge-secondary" :   
                    "badge-accent"  
                  }`}>  
                    {activeTab === "Owners" ? "Owner" :   
                     activeTab === "Sitters" ? "Sitter" :   
                     "Booking"}  
                  </span>  
                </td>  
                <td>  
                  <button className="btn btn-sm btn-error">Eliminar</button>  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    </div>  
  );  
};