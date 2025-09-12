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
        className="bg-hb hover:bg-ts text-w p-3 rounded-full shadow-lg transition-colors"    
      >    
        {chatAbierto ? "✕" : "💬"}    
      </button>    
    </div>    
  );    
};