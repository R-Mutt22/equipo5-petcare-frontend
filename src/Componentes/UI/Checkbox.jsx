export const Checkbox = ({   
  label,   
  checked,   
  onChange,   
  error,  
  className = "",  
  ...props   
}) => {  
  return (  
    <div className="flex flex-col">  
      <div className="form-control">  
        <label className="label cursor-pointer justify-start">  
          <input  
            type="checkbox"  
            checked={checked}  
            onChange={onChange}  
            className={`checkbox ${error ? "checkbox-error" : "checkbox-primary"} mr-2 ${className}`}  
            {...props}  
          />  
          <span className="label-text">{label}</span>  
        </label>  
      </div>  
      {error && <span className="text-red-500 text-sm mt-1">⚠️ {error}</span>}  
    </div>  
  );  
};