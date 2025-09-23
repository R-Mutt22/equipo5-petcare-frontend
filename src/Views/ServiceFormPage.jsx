import React from "react";
import { useFormik } from "formik";
import { serviceValidationSchema } from "../utils/validationSchemas";
import { Input } from "../Componentes/UI/Input";
import { Select } from "../Componentes/UI/Select";
import { Button } from "../Componentes/UI/Button";
import { ErrorMessage } from "../Componentes/UI/ErrorMessage";
import { Card } from "../Componentes/UI/Card";
import { useServices } from "../Context/ServiceContext";
import { useSitter } from "../Context/SitterContext"; // Importar el contexto

const serviceTypes = [
  { value: "walking", label: "Paseo" },
  { value: "daycare", label: "Cuidado Diario" },
  { value: "boarding", label: "Hospedaje" },
  { value: "visiting", label: "Visita" },
];

export const ServiceFormPage = () => {
  const { addService } = useServices();
  const { sitter } = useSitter(); // Obtener datos del sitter autenticado

  const formik = useFormik({
    initialValues: {
      type: "",
      description: "",
      rate: "",
      idSitter: sitter?.id || "", // Usar el ID del sitter autenticado
    },
    validationSchema: serviceValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log('Enviando valores:', values);
        await addService({ idSitter: sitter.id }, values);
        alert("Servicio guardado correctamente");
        resetForm();
      } catch (error) {
        console.error("Error completo:", error);
        alert(
          "Error al guardar el servicio: " +
            (error.message || "Error desconocido")
        );
      }
    },
  });

  // Actualizar id_user cuando cambie el sitter
  // React.useEffect(() => {
  //   if (sitter?.id) {
  //     formik.setFieldValue('idSitter', sitter.id);
  //   }
  // }, [sitter?.id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef1f6]">
      <Card
        title="Agregar/Editar Servicio"
        className="w-full max-w-md shadow-lg"
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Select
            label="Tipo de servicio"
            name="type"
            options={serviceTypes}
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.type && formik.errors.type}
            required
          />
          <ErrorMessage
            error={formik.errors.type}
            touched={formik.touched.type}
          />

          <Input
            label="Descripción"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={100}
            error={formik.touched.description && formik.errors.description}
            required
          />
          <ErrorMessage
            error={formik.errors.description}
            touched={formik.touched.description}
          />

          <Input
            label="Tarifa ($)"
            name="rate"
            type="number"
            value={formik.values.rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rate && formik.errors.rate}
            required
          />
          <ErrorMessage
            error={formik.errors.rate}
            touched={formik.touched.rate}
          />

          <Button type="submit" color="primary" className="w-full">
            Guardar servicio
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ServiceFormPage;
