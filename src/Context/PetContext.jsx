import { createContext, useContext, useState } from "react";
import {
  createPet,
  getPetsByOwner,
  getPetById,
  updatePet,
  deletePet,
} from "../api/pets.api";
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

  const fetchGetPetsByOwner = async (ownerId) => {
    try {
      const res = await getPetsByOwner(ownerId);
      setPets(res.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      throw error;
    }
  };

  const fetchGetPetById = async (id) => {
    try {
      const res = await getPetById(id);
      
      setPets(res.pets);
      return res.data;
    } catch (error) {
      console.error("Error fetching pets:", error);
      throw error;
    }
  };

  const addPet = async (pet) => {
    console.log(pet);
    try {
      const res = await createPet(pet);
      setPets([...pets, res.data]);
      return res.data;
    } catch (error) {
      console.error("Error creating pet:", error);
      throw error;
    }
  };

  const editPet = async (id, pet) => {
    try {
      // console.log("Soy editPet con información!!");
      const res = await updatePet(id, pet);
      if (Array.isArray(pets)) {
        const updatedPets = pets.map((pet) => (pet.id === id ? res.data : pet));
        setPets(updatedPets);  // Actualizas el estado con la lista de mascotas actualizada
        console.log("Este es pets actualizado directamente: ", updatedPets);
      } else {
        console.error("El estado de pets no es un array", pets);
      }
      return res.data;
    } catch (error) {
      console.error("Error updating pet:", error);
      throw error;
    }
  };

  const removePet = async (id) => {
    try {
      await deletePet(id);
      setPets(pets.filter((pet) => pet.id !== id));
    } catch (error) {
      console.error("Error deleting pet:", error);
      throw error;
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        fetchGetPetsByOwner,
        fetchGetPetById,
        addPet,
        editPet,
        removePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
