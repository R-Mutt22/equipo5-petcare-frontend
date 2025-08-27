
import React from 'react';
import { useFormik } from 'formik';
import { userValidationSchema } from '../utils/validationSchemas';
import { Input } from '../Componentes/UI/Input';
import { Button } from '../Componentes/UI/Button';
import { Card } from '../Componentes/UI/Card';
import { ErrorMessage } from '../Componentes/UI/ErrorMessage';

export const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
      phone: '',
      address: '',
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      // Mock: mostrar datos en consola
      console.log('Datos de registro:', values);
      alert('Registro exitoso (mock)');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f6]">
      <Card title="Registro de Usuario" className="w-full max-w-md shadow-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            label="Nombre"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name}
            required
            className="bg-[#d3e1e2]"
          />
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
          <Input
            label="Teléfono"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && formik.errors.phone}
            className="bg-[#d3e1e2]"
          />
          <Input
            label="Dirección"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && formik.errors.address}
            className="bg-[#d3e1e2]"
          />
          <div>
            <label className="label">Rol *</label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className={`select select-bordered w-full bg-[#a5dbdd]`}
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="owner">Dueño</option>
              <option value="sitter">Cuidador</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <span className="text-red-500 text-sm mt-1">⚠️ {formik.errors.role}</span>
            )}
          </div>
          <Button type="submit" variant="primary" className="w-full bg-[#407c87] hover:bg-[#a5dbdd] text-white">
            Registrarse
          </Button>
          {formik.errors && typeof formik.errors === 'string' && (
            <ErrorMessage message={formik.errors} />
          )}
        </form>
      </Card>
    </div>
  );
}
