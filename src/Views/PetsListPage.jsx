import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Componentes/UI/Button";
import { PetCard } from "../Componentes/Wrappers/PetCard";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { usePets } from "../Context/PetContext";
import { useOwner } from "../Context/OwnerContext";

// const mockPets = [
//   {
//     id_pet: 1,
//     name: "Maximo",
//     species: "Perro",
//     breed: "Chihuahua",
//     age: 1,
//     id_user: 1,
//     special_notes: "Muy amistoso",
//   },
//   {
//     id_pet: 2,
//     name: "Firulais",
//     species: "Perro",
//     breed: "Golden Retreiver",
//     age: 2,
//     id_user: 1,
//     special_notes: "Muy adorable",
//   },
//   {
//     id_pet: 3,
//     name: "Zeus",
//     species: "Perro",
//     breed: "Doberman",
//     age: 2,
//     id_user: 3,
//     special_notes: "Muy molestoso",
//   },
// ];

export const PetsListPage = () => {
  const { owner } = useOwner();
  const { pets, fetchGetPetsByOwner, removePet } = usePets();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(owner);
  useEffect(() => {
    const loadPets = async () => {
      try {
        mascota = await fetchGetPetsByOwner(owner.id);
        console.log(mascota);
      } catch (error) {
        console.log("Error: ", error);
                
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, []);

  const handleOnEdit = (pet) => {
    console.log("Editar mascota: ", pet);

    navigate(`/pets-list/pet-edit/${pet.id_pet || pet.id}`);
  };

  const handleOnDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      await removePet(id);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-green-700 mb-6">
        Lista de mascotas
      </h1>
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : pets.length === 0 ? (
        <>
          <Button variant="success" className="mb-10">
            <Link to="/pets-list/pet-register">Agregar</Link>
          </Button>
          <EmptyState
            title="No hay mascotas"
            description="Aún no hay mascotas registradas"
            icon="⚠️"
          />
        </>
      ) : (
        <>
          <Button variant="success" className="mb-10">
            <Link to="/pets-list/pet-register">Agregar</Link>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {pets.map((pet) => (
              <PetCard
                key={pet._id || pet.id_pet}
                pet={pet}
                onEdit={handleOnEdit}
                onDelete={() => handleOnDelete(pet.id_pet || pet.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
