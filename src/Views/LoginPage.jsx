
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../Componentes/UI/Input';
import { Button } from '../Componentes/UI/Button';
import { Card } from '../Componentes/UI/Card';
import { ErrorMessage } from '../Componentes/UI/ErrorMessage';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

export const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // Mock: mostrar datos en consola
      console.log('Datos de login:', values);
      alert('Login exitoso (mock)');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f6]">
      <Card title="Iniciar Sesión" className="w-full max-w-md shadow-lg">
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
          <Button type="submit" variant="primary" className="w-full bg-[#407c87] hover:bg-[#a5dbdd] text-white">
            Iniciar Sesión
          </Button>
          {formik.errors && typeof formik.errors === 'string' && (
            <ErrorMessage message={formik.errors} />
          )}
        </form>
      </Card>
    </div>
  );
}
