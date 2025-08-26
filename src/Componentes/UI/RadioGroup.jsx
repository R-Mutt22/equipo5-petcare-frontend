export const RadioGroup = ({   
  options = [],   
  value,   
  onChange,   
  label,  
  error,  
  name,  
  className = "",  
  ...props   
}) => {  
  return (  
    <div className="flex flex-col">  
      {label && (  
        <label className="label">  
          <span className="label-text">{label}</span>  
        </label>  
      )}  
      <div className={`flex flex-wrap gap-4 ${className}`}>  
        {options.map((option, index) => (  
          <div key={index} className="form-control">  
            <label className="label cursor-pointer justify-start">  
              <input  
                type="radio"  
                name={name}  
                value={option.value}  
                checked={value === option.value}  
                onChange={onChange}  
                className="radio radio-primary mr-2"  
                {...props}  
              />  
              <span className="label-text">{option.label}</span>  
            </label>  
          </div>  
        ))}  
      </div>  
      {error && <span className="text-red-500 text-sm mt-1">⚠️ {error}</span>}  
    </div>  
  );  
};