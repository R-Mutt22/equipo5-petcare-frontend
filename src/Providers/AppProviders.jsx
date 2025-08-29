import { OwnerProvider } from "../Context/OwnerContext";  
import { SitterProvider } from "../Context/SitterContext";  
import { AdminProvider } from "../Context/AdminContext";  
import { PetProvider } from "../Context/PetContext";  
import { ServiceProvider } from "../Context/ServiceContext";  
import { BookingProvider } from "../Context/BookingContext";  
  
export const AppProviders = ({ children }) => {  
  return (  
    <OwnerProvider>  
      <SitterProvider>  
        <AdminProvider>  
          <PetProvider>  
            <ServiceProvider>  
              <BookingProvider>  
                {children}  
              </BookingProvider>  
            </ServiceProvider>  
          </PetProvider>  
        </AdminProvider>  
      </SitterProvider>  
    </OwnerProvider>  
  );  
};