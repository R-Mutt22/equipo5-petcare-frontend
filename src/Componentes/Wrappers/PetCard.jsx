export const PetCard = ({ pet, onEdit, onDelete }) => {  
  return (  
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">  
      <header className="flex justify-between">  
        <div>  
          <p className="font-medium text-gray-800 text-lg">  
            {pet.name}  
          </p>  
          <p className="font-medium text-gray-600">ESPECIE: {pet.species}</p>  
          <p className="font-medium text-gray-600">RAZA: {pet.breed}</p>  
          <p className="font-medium text-gray-600">EDAD: {pet.age} años</p>  
          <p className="font-medium text-gray-600">DUEÑO (OWNER): {pet.ownerName}</p>  
        </div>  
        <div className="flex gap-2">  
          <button   
            onClick={() => onEdit(pet)}  
            className="btn btn-sm btn-info"  
          >  
            Editar  
          </button>  
          <button   
            onClick={() => onDelete(pet.id)}  
            className="btn btn-sm btn-error"  
          >  
            Eliminar  
          </button>  
        </div>  
      </header>  
      {pet.description && (  
        <p className="font-medium text-gray-600 mt-2">DESCRIPCIÓN: {pet.description}</p>  
      )}  
    </div>  
  );  
};