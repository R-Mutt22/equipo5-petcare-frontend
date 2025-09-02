import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Componentes/UI/Button";
import { PetCard } from "../Componentes/Wrappers/PetCard";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { EmptyState } from "../Componentes/UI/EmptyState";

const mockPets = [
  {
    id_pet: 1,
    name: "Maximo",
    species: "Perro",
    breed: "Chihuahua",
    age: 1,
    id_user: 1,
    special_notes: "Muy amistoso",
  },
  {
    id_pet: 2,
    name: "Firulais",
    species: "Perro",
    breed: "Golden Retreiver",
    age: 2,
    id_user: 1,
    special_notes: "Muy adorable",
  },
  {
    id_pet: 3,
    name: "Zeus",
    species: "Perro",
    breed: "Doberman",
    age: 2,
    id_user: 3,
    special_notes: "Muy molestoso",
  },
];

function ListAllPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPets(mockPets);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-green-700 mb-6">
        RegisterPet
      </h1>
      {loading ? (
        <LoadingSpinner size="lg" />
      ) : pets.length === 0 ? (
        <>
          <Button variant="success" className="mb-10">
            <Link to="/my-pets/add-pet">Agregar</Link>
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
            <Link to="/my-pets/add-pet">Agregar</Link>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {pets.map((pet) => (
              <PetCard key={pet.id_pet} pet={pet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ListAllPets;
