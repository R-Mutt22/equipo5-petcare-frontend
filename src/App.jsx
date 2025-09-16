import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "./Providers/AppProviders";

import { ProtectedRouteAdmin } from "./Routes/ProtectedRouteAdmin";
import { ProtectedRouteOwner } from "./Routes/ProtectedRouteOwner";
import { ProtectedRouteSitter } from "./Routes/ProtectedRouteSitter";
import { Homepage } from "./Views/Homepage";
import { RegisterPage } from "./Views/RegisterPage";
import { LoginPage } from "./Views/LoginPage";

import { ServicesListPage } from "./Views/ServicesListPage";
import { ServiceFormPage } from "./Views/ServiceFormPage";
import { Navbar } from "./Componentes/Wrappers/Navbar";
import { Footer } from "./Componentes/Wrappers/Footer";

import { AdminLoginPage } from "./Views/AdminLoginPage";
import { PetsListPage } from "./Views/PetsListPage";
import { PetRegisterPage } from "./Views/PetRegisterPage";
import { PetEditPage } from "./Views/PetEditPage";

import { AdminPanel } from "./Views/AdminPanel";
import { UserManagement } from "./Views/UserManagement";
import { ServiceManagement } from "./Views/ServiceManagement";
import { BookingManagement } from "./Views/BookingManagement";

import { SearchServicesPage } from "./Views/SearchServicesPage";
import { AboutUs } from "./Views/AboutUs";
import { ServicePage } from "./Views/ServicePage";
import { ContactPage } from "./Views/ContactPage";
import { CreateBookingPage } from "./Views/CreateBookingPage";
import { BookingsListPage } from "./Views/BookingsListPage";
import { PaymentPage } from "./Views/PaymentPage";
import { PaymentSuccessPage } from "./Views/PaymentSuccessPage";
import { PaymentFailurePage } from "./Views/PaymentFailurePage";
import { ChatToggle } from "./Componentes/chat/ChatToggle";  
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
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/create-booking" element={<CreateBookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-failure" element={<PaymentFailurePage />} />

          <Route element={<ProtectedRouteSitter />}>
            <Route path="/services-list" element={<ServicesListPage />} />
            <Route path="/services-form" element={<ServiceFormPage />} />
          </Route>

          <Route element={<ProtectedRouteOwner />}>
          </Route>

            <Route path="/pets-list" element={<PetsListPage />} />
            <Route
              path="/pets-list/pet-register"
              element={<PetRegisterPage />}
            />
            <Route
              path="/pets-list/pet-edit/:id"
              element={<PetEditPage />}
            />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRouteAdmin />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/services" element={<ServiceManagement />} />
            <Route path="/admin/bookings" element={<BookingManagement />} />
          </Route>

          {/* Rutas privadas */}
          {/* Rutas protegidas para dueños */}
          {/* <Route element={<ProtectedRouteOwner />}>  
            <Route path="/my-pets" element={<PetManagement />} />  
            <Route path="/my-bookings" element={<BookingsListPage />} />

            <Route path="/service" element={<SearchServicesPage />} />

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
        <ChatToggle />  
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
