export const EmptyState = ({   
  title = "No hay elementos",   
  description = "No se encontraron elementos para mostrar",  
  icon = "📭",  
  actionText,  
  onAction,  
  className = ""   
}) => {  
  return (  
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>  
      <div className="text-6xl mb-4">  
        {icon}  
      </div>  
      <h3 className="text-xl font-semibold text-gray-700 mb-2">  
        {title}  
      </h3>  
      <p className="text-gray-500 mb-6 max-w-md">  
        {description}  
      </p>  
      {actionText && onAction && (  
        <button   
          onClick={onAction}  
          className="btn btn-primary"  
        >  
          {actionText}  
        </button>  
      )}  
    </div>  
  );  
};