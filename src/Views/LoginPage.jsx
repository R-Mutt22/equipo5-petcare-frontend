import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../Componentes/UI/Input';
import { Button } from '../Componentes/UI/Button';
import { Card } from '../Componentes/UI/Card';
import { ErrorMessage } from '../Componentes/UI/ErrorMessage';
import { useOwner } from '../Context/OwnerContext';
import { useSitter } from '../Context/SitterContext';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

export const LoginPage = () => {
  const { signin: signinOwner, errors: ownerErrors, loadingOwner } = useOwner();
  const { signin: signinSitter, errors: sitterErrors, loadingSitter } = useSitter();

  const [userType, setUserType] = useState('owner');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      if (userType === 'owner') {
        await signinOwner(values);
      } else {
        await signinSitter(values);
      }
    },
  });

  // Combinar errores de ambos contextos  
  const allErrors = [...ownerErrors, ...sitterErrors];
  const isLoading = loadingOwner || loadingSitter;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f6]">
      <Card title="Iniciar Sesión" className="w-full max-w-md shadow-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Selector de tipo de usuario */}
          <div>
            <label className="label">Tipo de Usuario *</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="select select-bordered w-full bg-[#a5dbdd]"
              required
            >
              <option value="owner">Dueño de Mascota</option>
              <option value="sitter">Cuidador</option>
            </select>
          </div>

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
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>

          {/* Mostrar errores de los contextos */}
          {allErrors.length > 0 && (
            <div className="space-y-1">
              {allErrors.map((error, index) => (
                <ErrorMessage key={index} message={error} />
              ))}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}