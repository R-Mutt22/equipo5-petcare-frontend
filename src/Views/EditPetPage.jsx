import React, { useState, useEffect } from "react";
import { Card } from "../Componentes/UI/Card";
import { Input } from "../Componentes/UI/Input";
import { Button } from "../Componentes/UI/Button";
import { useFormik } from "formik";
import { petValidationSchema } from "../utils/validationSchemas";
import { ErrorMessage } from "../Componentes/UI/ErrorMessage";

export const EditPetPage = () => {
  const initialValues = {
    name: "",
    species: "",
    breed: "",
    age: 0,
    special_notes: "",
    id_user: 0,
  };

  const onSubmit = (pet) => {
    console.log("Mascota actualizada: ", pet);
    alert("Mascota actualizada (prueba)");
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: petValidationSchema,
    onSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center m-6">
      <Card title="Editar Mascota" className="w-full max-w-lg">
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

          <Input
            type="text"
            label="Tipo"
            name="species"
            placeholder="Introduce un tipo de tu mascota"
            value={formik.values.species}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
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
            name="special_notes"
            placeholder="Introduce información esencial sobre la mascota"
            value={formik.values.special_notes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.special_notes}
            touched={formik.touched.special_notes}
          />

          <Input
            type="number"
            label="Id del dueño"
            name="id_user"
            placeholder="Introduce el id del dueño de la mascota"
            value={formik.values.id_user}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage
            message={formik.errors.id_user}
            touched={formik.touched.id_user}
          />

          <Button
            type="submit"
            variant="success"
            className="w-2/3 px-4 py-2 mb-6 bg-green-500 text-white text-sm rounded hover:bg-green-600 block mx-auto"
          >
            Guardar cambios
          </Button>
        </form>
      </Card>
    </div>
  );
};
