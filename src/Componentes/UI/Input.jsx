export const Input = ({   
  type = "text",   
  placeholder,   
  value,   
  onChange,   
  error,   
  label,  
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
      <input  
        type={type}  
        placeholder={placeholder}  
        value={value}  
        onChange={onChange}  
        className={`input input-bordered w-full ${error ? "input-error" : ""} ${className}`}  
        {...props}  
      />  
      {error && <span className="text-red-500 text-sm mt-1">⚠️ {error}</span>}  
    </div>  
  );  
};