import { Link } from "react-router-dom";
import { useOwner } from "../../Context/OwnerContext";

export const PetCard = ({ pet, onEdit, onDelete }) => {
  const petId = pet.id_pet || pet.id;
  const { owner } = useOwner();
  return (
    <div className="bg-white p-4 rounded-lg my-2 shadow-md w-80">
      <header className="flex justify-between">
        <div>
          <p className="font-medium text-gray-800 text-lg">
            Nombre: {pet.name}
          </p>
          <p className="font-medium text-gray-600">TIPO: {pet.species}</p>
          <p className="font-medium text-gray-600">RAZA: {pet.breed}</p>
          <p className="font-medium text-gray-600">EDAD: {pet.age} años</p>
          <p className="font-medium text-gray-600">DUEÑO : {owner.name}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(pet)} className="btn btn-sm btn-info">
            Editar
          </button>
          <button
            onClick={() => onDelete(petId)}
            className="btn btn-sm btn-error"
          >
            Eliminar
          </button>
        </div>
      </header>
      {pet.special_notes && (
        <p className="font-medium text-gray-600 mt-2">
          NOTAS: {pet.special_notes}
        </p>
      )}
    </div>
  );
};
