import React from "react";
import { Card } from "../Componentes/UI/Card";
import { Input } from "../Componentes/UI/Input";
import { Button } from "../Componentes/UI/Button";
import { useFormik } from "formik";
import { petValidationSchema } from "../utils/validationSchemas";
import { ErrorMessage } from "../Componentes/UI/ErrorMessage";

const initialValues = {
  name: "",
  species: "",
  breed: "",
  age: 0,
  special_notes: "",
  id_user: 0,
};

export const RegisterPetPage = () => {
  const onSubmit = (values) => {
    console.log("Mascota guardada: ", values);
    alert("Mascota guardada (prueba)");
  };

  const { handleChange, errors, handleSubmit, handleBlur, touched } = useFormik(
    {
      initialValues,
      validationSchema: petValidationSchema,
      onSubmit,
    }
  );

  return (
    <div className="min-h-screen flex items-center justify-center m-6">
      <Card title="Registro de Mascota" className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            label="Nombre"
            name="name"
            placeholder="Introduce un nombre de tu mascota"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage message={errors.name} touched={touched.name} />

          <Input
            type="text"
            label="Tipo"
            name="species"
            placeholder="Introduce un tipo de tu mascota"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage message={errors.species} touched={touched.species} />

          <Input
            type="text"
            label="Raza"
            name="breed"
            placeholder="Introduce una raza de tu mascota"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage message={errors.breed} touched={touched.breed} />

          <Input
            type="number"
            label="Edad"
            name="age"
            placeholder="Introduce la edad de tu mascota"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage message={errors.age} touched={touched.age} />

          <Input
            type="text"
            label="Nota"
            name="special_notes"
            placeholder="Introduce información esencial sobre la mascota"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage
            message={errors.special_notes}
            touched={touched.special_notes}
          />

          <Input
            type="number"
            label="Id del dueño"
            name="id_user"
            placeholder="Introduce el id del dueño de la mascota"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage message={errors.id_user} touched={touched.id_user} />

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
