export const formatPrice = (price) => {  
  return new Intl.NumberFormat('es-AR', {  
    style: 'currency',  
    currency: 'ARS'  
  }).format(price);  
};  
  
export const formatDate = (date) => {  
  return new Date(date).toLocaleDateString('es-AR', {  
    year: 'numeric',  
    month: 'long',  
    day: 'numeric'  
  });  
};  
  
export const formatTime = (time) => {  
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-AR', {  
    hour: '2-digit',  
    minute: '2-digit'  
  });  
};  
  
export const formatDuration = (hours) => {  
  if (hours === 1) return "1 hora";  
  if (hours < 24) return `${hours} horas`;  
  const days = Math.floor(hours / 24);  
  const remainingHours = hours % 24;  
  if (remainingHours === 0) return `${days} día${days > 1 ? 's' : ''}`;  
  return `${days} día${days > 1 ? 's' : ''} y ${remainingHours} hora${remainingHours > 1 ? 's' : ''}`;  
};