export const Card = ({   
  children,   
  title,   
  className = "",  
  ...props   
}) => {  
  return (  
    <div className={`card bg-base-100 shadow-xl ${className}`} {...props}>  
      <div className="card-body">  
        {title && <h2 className="card-title">{title}</h2>}  
        {children}  
      </div>  
    </div>  
  );  
};