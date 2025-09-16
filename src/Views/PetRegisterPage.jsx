import React, { useEffect, useState } from "react";
import { Card } from "../Componentes/UI/Card";
import { Input } from "../Componentes/UI/Input";
import { Button } from "../Componentes/UI/Button";
import { useFormik } from "formik";
import { petValidationSchema } from "../utils/validationSchemas";
import { ErrorMessage } from "../Componentes/UI/ErrorMessage";
import { usePets } from "../Context/PetContext";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";

export const PetRegisterPage = () => {
  const { addPet } = usePets();

  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      species: "",
      breed: "",
      age: "",
      specialNotes: "",
      ownerId: "",
    },
    validationSchema: petValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await addPet(values);
        alert("Mascota guardada exitosamente");
        resetForm();
      } catch (error) {
        alert("Ocurrió un problema al guardar una mascota");
      }
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600">
          <LoadingSpinner size="lg" />
          <span>Cargando formulario...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center m-6">
      <Card title="Registro de Mascota" className="w-full max-w-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Nombre"
            name="name"
            placeholder="Introduce un nombre de tu mascota"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.name}
            touched={formik.touched.name}
          />

          <div>
            <label className="label">Tipo/Especie</label>
            <select
              name="species"
              className={`select select-bordered w-full`}
              value={formik.values.species}
              onChange={formik.handleChange}
            >
              <option value="">Selecciona un tipo/especie</option>
              <option value="DOG">Perro</option>
              <option value="CAT">Gato</option>
            </select>
          </div>
          <ErrorMessage
            message={formik.errors.species}
            touched={formik.touched.species}
          />

          <Input
            type="text"
            label="Raza"
            name="breed"
            placeholder="Introduce una raza de tu mascota"
            value={formik.values.breed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.breed}
            touched={formik.touched.breed}
          />

          <Input
            type="number"
            label="Edad"
            name="age"
            placeholder="Introduce la edad de tu mascota"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.age}
            touched={formik.touched.age}
          />

          <Input
            type="text"
            label="Nota"
            name="specialNotes"
            placeholder="Introduce información esencial sobre la mascota"
            value={formik.values.specialNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Input
            type="number"
            label="Id del dueño"
            name="ownerId"
            placeholder="Introduce el id del dueño de la mascota"
            value={formik.values.ownerId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.ownerId}
            touched={formik.touched.ownerId}
          />

          <Button
            type="submit"
            variant="success"
            className="w-2/3 px-4 py-2 mb-6 bg-green-500 text-white text-sm rounded hover:bg-green-600 block mx-auto"
          >
            Agregar
          </Button>
        </form>
      </Card>
    </div>
  );
};
