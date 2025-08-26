export const PetCard = ({ pet, onEdit, onDelete }) => {  
  return (  
    <div className="bg-white p-4 rounded-lg my-2 shadow-md">  
      <header className="flex justify-between">  
        <div>  
          <p className="font-medium text-gray-800 text-lg">  
            {pet.name}  
          </p>  
          <p className="font-medium text-gray-600">TIPO: {pet.type}</p>  
          <p className="font-medium text-gray-600">RAZA: {pet.breed}</p>  
          <p className="font-medium text-gray-600">EDAD: {pet.age} años</p>  
          <p className="font-medium text-gray-600">DUEÑO ID: {pet.id_user}</p>  
        </div>  
        <div className="flex gap-2">  
          <button   
            onClick={() => onEdit(pet)}  
            className="btn btn-sm btn-info"  
          >  
            Editar  
          </button>  
          <button   
            onClick={() => onDelete(pet.id_pet)}  
            className="btn btn-sm btn-error"  
          >  
            Eliminar  
          </button>  
        </div>  
      </header>  
      {pet.special_notes && (  
        <p className="font-medium text-gray-600 mt-2">NOTAS: {pet.special_notes}</p>  
      )}  
    </div>  
  );  
};