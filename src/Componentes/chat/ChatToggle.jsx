import { useState } from "react";  
import { ChatBot } from "./ChatBot";  
  
export const ChatToggle = () => {  
  const [chatAbierto, setChatAbierto] = useState(false);  
  
  return (  
    <div className="fixed bottom-4 right-4 z-50">  
      {chatAbierto && (  
        <div className="mb-4 w-80 h-96">  
          <ChatBot />  
        </div>  
      )}  
        
      <button  
        onClick={() => setChatAbierto(!chatAbierto)}  
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"  
      >  
        {chatAbierto ? "✕" : "💬"}  
      </button>  
    </div>  
  );  
};
