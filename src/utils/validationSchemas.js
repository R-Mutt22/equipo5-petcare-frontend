import * as Yup from "yup";  
  
export const petValidationSchema = Yup.object().shape({  
  name: Yup.string().max(50, "El nombre no debe exceder 50 caracteres").required("El nombre es requerido"),  
  type: Yup.string().oneOf(["dog", "cat", "bird", "other"], "Tipo de mascota inválido").required("El tipo es requerido"),  
  breed: Yup.string().max(50, "La raza no debe exceder 50 caracteres"),  
  age: Yup.number().positive("La edad debe ser positiva").integer("La edad debe ser un número entero"),  
  special_notes: Yup.string(),  
  id_user: Yup.number().required("El ID del usuario es requerido"),  
});  
  
export const serviceValidationSchema = Yup.object().shape({  
  type: Yup.string().oneOf(["walking", "daycare", "boarding", "visiting"], "Tipo de servicio inválido").required("El tipo de servicio es requerido"),  
  description: Yup.string(),  
  rate: Yup.number().positive("La tarifa debe ser positiva").required("La tarifa es requerida"),  
  id_user: Yup.number().required("El ID del usuario es requerido"),  
});  
  
export const bookingValidationSchema = Yup.object().shape({  
  id_user: Yup.number().required("El ID del usuario es requerido"),  
  id_service: Yup.number().required("El ID del servicio es requerido"),  
  id_pet: Yup.number(),  
  start_date: Yup.date().min(new Date(), "La fecha de inicio debe ser futura").required("La fecha de inicio es requerida"),  
  end_date: Yup.date().min(Yup.ref('start_date'), "La fecha de fin debe ser posterior al inicio").required("La fecha de fin es requerida"),  
  status: Yup.string().oneOf(["pending", "confirmed", "in_progress", "completed", "cancelled"], "Estado inválido"),  
  special_requests: Yup.string(),  
  total_price: Yup.number().min(0, "El precio total debe ser mayor o igual a 0").required("El precio total es requerido"),  
});  
  
export const userValidationSchema = Yup.object().shape({  
  name: Yup.string().max(80, "El nombre no debe exceder 80 caracteres").required("El nombre es requerido"),  
  email: Yup.string().email("Correo electrónico inválido").max(100, "El email no debe exceder 100 caracteres").required("El correo electrónico es requerido"),  
  password: Yup.string().max(255, "La contraseña no debe exceder 255 caracteres").required("La contraseña es requerida"),  
  role: Yup.string().oneOf(["owner", "sitter", "admin"], "Rol inválido").required("El rol es requerido"),  
  phone: Yup.string().max(20, "El teléfono no debe exceder 20 caracteres"),  
  address: Yup.string(),  
  avatar: Yup.string().max(255, "La URL del avatar no debe exceder 255 caracteres"),  
  active: Yup.boolean(),  
});