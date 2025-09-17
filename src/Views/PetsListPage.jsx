import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Componentes/UI/Button";
import { PetCard } from "../Componentes/Wrappers/PetCard";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { usePets } from "../Context/PetContext";
import { useOwner } from "../Context/OwnerContext";

export const PetsListPage = () => {
  const { pets, fetchGetPetsByOwner, removePet } = usePets();
  const {owner} = useOwner();
  const [loading, setLoading] = useState(true);
  const {navigate} = useNavigate();

  useEffect(() => {
    const loadPets = async () => {
      try {
        await fetchGetPetsByOwner(owner.id);
        console.log("Mascotas cargadas:", pets);
      } catch (error) {
        console.log("Error al cargar las mascotas");
      } finally {
        setLoading(false);
      }
    };
    loadPets();
  }, [fetchGetPetsByOwner]);

  const handleOnEdit = (pets) => {
    console.log("Editar mascota: ", pets);

    navigate(`/pets-list/pet-edit/${pets.id}`);
  };

  const handleOnDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta mascota?")) {
      await removePet(id);
      navigate("/pets-list");
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
                key={pet.id}
                pet={pet}
                onEdit={() => handleOnEdit(pet)}
                onDelete={() => handleOnDelete(pet.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
