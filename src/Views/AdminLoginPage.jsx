// src/Views/AdminLoginPage.jsx  
import React from 'react';  
import { useFormik } from 'formik';  
import * as Yup from 'yup';  
import { Input } from '../Componentes/UI/Input';  
import { Button } from '../Componentes/UI/Button';  
import { Card } from '../Componentes/UI/Card';  
import { ErrorMessage } from '../Componentes/UI/ErrorMessage';  
import { useAdmin } from '../Context/AdminContext';  
  
const loginValidationSchema = Yup.object().shape({  
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),  
  password: Yup.string().required('La contraseña es requerida'),  
});  
  
export const AdminLoginPage = () => {  
  const { signin: signinAdmin, errors: adminErrors, loadingAdmin } = useAdmin();  
    
  const formik = useFormik({  
    initialValues: {   
      email: '',   
      password: ''   
    },  
    validationSchema: loginValidationSchema,  
    onSubmit: async (values) => {  
      await signinAdmin(values);  
    },  
  });  
  
  return (  
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f6]">  
      <Card title="Administrador - Iniciar Sesión" className="w-full max-w-md shadow-lg">  
        <form onSubmit={formik.handleSubmit} className="space-y-4">  
          <Input  
            label="Email"  
            name="email"  
            type="email"  
            value={formik.values.email}  
            onChange={formik.handleChange}  
            error={formik.touched.email && formik.errors.email}  
            required  
            className="bg-[#d3e1e2]"  
          />  
          <Input  
            label="Contraseña"  
            name="password"  
            type="password"  
            value={formik.values.password}  
            onChange={formik.handleChange}  
            error={formik.touched.password && formik.errors.password}  
            required  
            className="bg-[#d3e1e2]"  
          />  
            
          <Button   
            type="submit"   
            variant="primary"   
            className="w-full bg-[#407c87] hover:bg-[#a5dbdd] text-white"  
            disabled={loadingAdmin}  
          >  
            {loadingAdmin ? 'Iniciando sesión...' : 'Iniciar Sesión'}  
          </Button>  
  
          {/* Mostrar errores del contexto */}  
          {adminErrors.length > 0 && (  
            <div className="space-y-1">  
              {adminErrors.map((error, index) => (  
                <ErrorMessage key={index} message={error} />  
              ))}  
            </div>  
          )}  
        </form>  
      </Card>  
    </div>  
  );  
};