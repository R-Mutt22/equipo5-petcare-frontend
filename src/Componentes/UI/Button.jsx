export const Button = ({   
  children,   
  variant = "primary",   
  size = "md",   
  disabled = false,   
  onClick,   
  type = "button",  
  className = "",  
  ...props   
}) => {  
  const baseClasses = "btn";  
  const variantClasses = {  
    primary: "btn-info bg-hb text-w hover:bg-ts",  
    secondary: "btn-outline",  
    danger: "btn-error",  
    success: "btn-success"  
  };  
  const sizeClasses = {  
    sm: "btn-sm",  
    md: "",  
    lg: "btn-lg"  
  };  
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;  
  
  return (  
    <button  
      type={type}  
      className={classes}  
      disabled={disabled}  
      onClick={onClick}  
      {...props}  
    >  
      {children}  
    </button>  
  );  
};