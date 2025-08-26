import { useState } from "react";  
  
export const SearchBar = ({   
  onSearch,   
  placeholder = "Buscar...",  
  className = ""   
}) => {  
  const [searchTerm, setSearchTerm] = useState("");  
  
  const handleSubmit = (e) => {  
    e.preventDefault();  
    onSearch(searchTerm);  
  };  
  
  return (  
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>  
      <input  
        type="text"  
        value={searchTerm}  
        onChange={(e) => setSearchTerm(e.target.value)}  
        placeholder={placeholder}  
        className="input input-bordered flex-1"  
      />  
      <button type="submit" className="btn btn-primary">  
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />  
        </svg>  
        Buscar  
      </button>  
    </form>  
  );  
};