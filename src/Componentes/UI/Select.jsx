export const Select = ({   
  options = [],   
  value,   
  onChange,   
  placeholder = "Selecciona una opción",  
  label,  
  error,  
  required = false,  
  className = "",  
  ...props   
}) => {  
  return (  
    <div className="flex flex-col">  
      {label && (  
        <label className="label">  
          <span className="label-text">{label} {required && "*"}</span>  
        </label>  
      )}  
      <select  
        value={value}  
        onChange={onChange}  
        className={`select select-bordered w-full ${error ? "select-error" : ""} ${className}`}  
        {...props}  
      >  
        <option value="">{placeholder}</option>  
        {options.map((option, index) => (  
          <option key={index} value={option.value}>  
            {option.label}  
          </option>  
        ))}  
      </select>  
      {error && <span className="text-red-500 text-sm mt-1">⚠️ {error}</span>}  
    </div>  
  );  
};