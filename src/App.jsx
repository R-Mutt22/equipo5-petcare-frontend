import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "./Providers/AppProviders";

import { ProtectedRouteAdmin } from "./Routes/ProtectedRouteAdmin";
import { ProtectedRouteOwner } from "./Routes/ProtectedRouteOwner";
import { ProtectedRouteSitter } from "./Routes/ProtectedRouteSitter";
import { Homepage } from "./Views/Homepage";
import { RegisterPage } from "./Views/RegisterPage";
import { LoginPage } from "./Views/LoginPage";
import { Navbar } from "./Componentes/Wrappers/Navbar"
import { Footer } from "./Componentes/Wrappers/Footer"
import { AdminLoginPage } from "./Views/AdminLoginPage";

export const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/*Rutas publicas*/}
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* Rutas privadas */}
            {/* Rutas protegidas para dueños */}  
          {/* <Route element={<ProtectedRouteOwner />}>  
            <Route path="/my-pets" element={<PetManagement />} />  
            <Route path="/my-bookings" element={<BookingManagement />} />  
            <Route path="/create-booking" element={<CreateBooking />} />  
          </Route>  */} 
            
          {/* Rutas protegidas para niñeras */}  
          {/* <Route element={<ProtectedRouteSitter />}>  
            <Route path="/my-services" element={<ServiceManagement />} />  
            <Route path="/sitter-bookings" element={<SitterBookings />} />  
          </Route>   */}
            
          {/* Rutas protegidas para administradores */}  
          {/* <Route element={<ProtectedRouteAdmin />}>  
            <Route path="/admin" element={<AdminPanel />} />  
            <Route path="/admin/users" element={<UserManagement />} />  
            <Route path="/admin/services" element={<ServiceManagement />} />  
            <Route path="/admin/bookings" element={<BookingManagement />} />  
          </Route>  */} 
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
