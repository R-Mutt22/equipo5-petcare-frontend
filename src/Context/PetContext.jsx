import { createContext, useContext, useState } from "react";  
import {   
  getPetsByOwnerRequest,   
  createPetRequest,   
  updatePetRequest,   
  deletePetRequest,  
  getPetRequest   
} from "../api/pets.auth";  
  
const PetContext = createContext();  
  
export const usePets = () => {  
  const context = useContext(PetContext);  
  if (!context) {  
    throw new Error("usePets must be used within a PetProvider");  
  }  
  return context;  
};  
  
export const PetProvider = ({ children }) => {  
  const [pets, setPets] = useState([]);  
  
  const getPetsByOwner = async (ownerId) => {  
    try {  
      const res = await getPetsByOwnerRequest(ownerId);  
      setPets(res.data);  
    } catch (error) {  
      console.error("Error fetching pets:", error);  
    }  
  };  
  
  const createPet = async (pet) => {  
    try {  
      const res = await createPetRequest(pet);  
      setPets([...pets, res.data]);  
    } catch (error) {  
      console.error("Error creating pet:", error);  
    }  
  };  
  
  const updatePet = async (id, pet) => {  
    try {  
      const res = await updatePetRequest(id, pet);  
      if (res.status === 200) {  
        setPets(prevPets =>   
          prevPets.map(prevPet =>   
            prevPet._id === id ? pet : prevPet  
          )  
        );  
      }  
    } catch (error) {  
      console.error("Error updating pet:", error);  
    }  
  };  
  
  const deletePet = async (id) => {  
    try {  
      const res = await deletePetRequest(id);  
      if (res.status === 200) {  
        setPets(pets.filter(pet => pet._id !== id));  
      }  
    } catch (error) {  
      console.error("Error deleting pet:", error);  
    }  
  };  
  
  return (  
    <PetContext.Provider value={{  
      pets,  
      getPetsByOwner,  
      createPet,  
      updatePet,  
      deletePet  
    }}>  
      {children}  
    </PetContext.Provider>  
  );  
};