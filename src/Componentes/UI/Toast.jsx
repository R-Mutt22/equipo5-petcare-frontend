export const Toast = ({ message, type = "success", isVisible, onClose }) => {  
  if (!isVisible) return null;  
  
  const bgColor = type === "success" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500";  
  const textColor = type === "success" ? "text-green-800" : "text-red-800";  
  const icon = type === "success" ? "✅" : "❌";  
  
  return (  
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border-l-4 shadow-lg ${bgColor} ${textColor} max-w-md`}>  
      <div className="flex items-center justify-between">  
        <div className="flex items-center">  
          <span className="text-xl mr-2">{icon}</span>  
          <span className="font-medium">{message}</span>  
        </div>  
        <button   
          onClick={onClose}  
          className="ml-4 text-lg hover:opacity-70"  
        >  
          ×  
        </button>  
      </div>  
    </div>  
  );  
};