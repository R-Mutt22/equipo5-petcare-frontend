import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRouteAdministrator } from "./Routes/ProtectedRouteAdministrator";
import { ProtectedRouteOwner } from "./Routes/ProtectedRouteOwner";
import { ProtectedRouteSitter } from "./Routes/ProtectedRouteSitter";
import { Homepage } from "./Views/Homepage";
import { RegisterPage } from "./Views/RegisterPage";
import { LoginPage } from "./Views/LoginPage";
import { Navbar } from "./Componentes/Wrappers/Navbar"
import { Footer } from "./Componentes/Wrappers/Footer"
import { Button } from "./Componentes/UI/Button"
import { Input } from "./Componentes/UI/Input"
import { Card } from "./Componentes/UI/Card"
import { ErrorMessage } from "./Componentes/UI/ErrorMessage"
import { LoadingSpinner } from "./Componentes/UI/LoadingSpinner"
import { EmptyState } from "./Componentes/UI/EmptyState"
export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
     
      <Routes>
        {/*Rutas publicas*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Rutas privadas */}
        {/* <Route element={<ProtectedRouteAdministrator />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/services" element={<ServiceManagement />} />
          <Route
            path="/admin/reservations"
            element={<ReservationManagement />}
          />
        </Route>
        <Route element={<ProtectedRouteOwner />}>
          <Route path="/owner/pets" element={<PetManagement />} />
          <Route path="/owner/reservations" element={<OwnerReservations />} />
          <Route
            path="/owner/create-reservation"
            element={<CreateReservation />}
          />
          <Route
            path="/owner/reservation-history"
            element={<ReservationHistory />}
          />
        </Route>
        <Route element={<ProtectedRouteSitter />}>
          <Route path="/sitter/service" element={<ServiceManagement />} />
          <Route path="/sitter/reservations" element={<sitterReservations />} />
          <Route path="/sitter/schedule" element={<ScheduleManagement />} />
        </Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
