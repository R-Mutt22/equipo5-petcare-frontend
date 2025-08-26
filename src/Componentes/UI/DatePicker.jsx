import DatePicker from "react-datepicker";  
import "react-datepicker/dist/react-datepicker.css";  
  
export const CustomDatePicker = ({   
  selected,   
  onChange,   
  label,  
  error,  
  placeholder = "Selecciona una fecha",  
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
      <DatePicker  
        selected={selected}  
        onChange={onChange}  
        dateFormat="yyyy-MM-dd"  
        placeholderText={placeholder}  
        className={`input input-bordered w-full ${error ? "input-error" : ""} ${className}`}  
        filterDate={(date) => {  
          const day = date.getDay();  
          const today = new Date();  
          return day !== 0 && day !== 6 && date >= today;  
        }}  
        {...props}  
      />  
      {error && <span className="text-red-500 text-sm mt-1">⚠️ {error}</span>}  
    </div>  
  );  
};