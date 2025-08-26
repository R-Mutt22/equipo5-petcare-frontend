export const userValidationSchema = Yup.object().shape({  
  email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es requerido"),  
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),  
  name: Yup.string().required("El nombre es requerido"),  
  phone: Yup.string().required("El teléfono es requerido"),  
  role: Yup.string().oneOf(['owner', 'sitter', 'admin'], 'Rol inválido').required("El rol es requerido"),  
});  
  
export const sitterValidationSchema = Yup.object().shape({  
  name: Yup.string().required("El nombre es requerido"),  
  email: Yup.string().email("Correo electrónico inválido").required("El correo electrónico es requerido"),  
  phone: Yup.string().required("El teléfono es requerido"),  
  experience: Yup.string().required("La experiencia es requerida"),  
  services: Yup.array().min(1, "Debe seleccionar al menos un servicio"),  
});