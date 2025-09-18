import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useFormik } from "formik";
import { Card } from "../Componentes/UI/Card";
import { Select } from "../Componentes/UI/Select";
import { CustomDatePicker } from "../Componentes/UI/DatePicker";
import { Button } from "../Componentes/UI/Button";
import { Input } from "../Componentes/UI/Input";

export const CreateBookingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener datos reales desde la navegación
  const { selectedService, userId, userPets } = location.state || {};
  console.log("selectedService:", selectedService);
  console.log("userId:", userId);
  console.log("userPets:", userPets);
  //");
  // Redireccionar si no hay datos necesarios
  useEffect(() => {
    if (!selectedService || !userId || !userPets) {
      navigate("/search-services");
    }
  }, [selectedService, userId, userPets, navigate]);

  const formik = useFormik({
    initialValues: {
      id_user: userId || "",
      id_service: selectedService.id,
      id_pet: "",
      start_date: null,
      end_date: null,
      special_requests: "",
      total_price: 0,
      status: true,
    },
    validate: (values) => {
      const errors = {};

      if (!values.id_pet) {
        errors.id_pet = "Debes seleccionar una mascota";
      }

      if (!values.id_service) {
        errors.id_service = "Debes seleccionar un servicio";
      }

      if (!values.start_date) {
        errors.start_date = "La fecha de inicio es requerida";
      }

      if (!values.end_date) {
        errors.end_date = "La fecha de fin es requerida";
      }

      if (values.start_date && values.end_date) {
        if (new Date(values.end_date) <= new Date(values.start_date)) {
          errors.end_date = "La fecha de fin debe ser posterior al inicio";
        }
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        // Agregar información adicional del servicio y mascota seleccionada
        const selectedPet = userPets.find((pet) => pet.id_pet == values.id_pet);

        const bookingData = {
          ...values,
          serviceInfo: selectedService,
          petInfo: selectedPet,
        };

        // Navegar a la página de pago con todos los datos
        navigate("/payment", {
          state: {
            bookingData,
          },
        });
      } catch (error) {
        alert("Error al procesar la reserva");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Usar el servicio real en lugar del mock
  const serviceType = selectedService?.type;

  // Calcular precio total usando el servicio real
  useEffect(() => {
    if (selectedService && formik.values.start_date && formik.values.end_date) {
      const startTime = new Date(formik.values.start_date);
      const endTime = new Date(formik.values.end_date);

      // Validar horario laboral (6:00 - 21:00)
      const startHour = startTime.getHours();
      const endHour = endTime.getHours();

      if (startHour < 6 || startHour > 21 || endHour < 6 || endHour > 21) {
        formik.setFieldError(
          "start_date",
          "Las reservas solo están disponibles de 6:00 a 21:00 hs"
        );
        formik.setFieldValue("total_price", 0);
        return;
      }

      if (endTime > startTime) {
        let calculatedPrice = 0;

        if (serviceType === "Paseo" || serviceType === "Visita") {
          const hours = Math.ceil((endTime - startTime) / (1000 * 60 * 60));
          calculatedPrice = selectedService.rate * hours;
        } else if (serviceType === "Hospedaje") {
          const days = Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
          calculatedPrice = selectedService.rate * days;
        } else if (serviceType === "Cuidado Diario") {
          const days = Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
          calculatedPrice = selectedService.rate * days;
        }

        formik.setFieldValue("total_price", calculatedPrice);
        formik.setFieldError("start_date", "");
      } else {
        formik.setFieldValue("total_price", 0);
      }
    } else {
      formik.setFieldValue("total_price", 0);
    }
  }, [formik.values.start_date, formik.values.end_date, selectedService]);

  // Configuración específica del DatePicker según tipo de servicio
  const getDatePickerConfig = (isEndDate = false) => {
    if (!serviceType) return {};

    // Horario laboral argentino: 6:00 a 21:00
    const workingHoursStart = new Date();
    workingHoursStart.setHours(6, 0, 0, 0);

    const workingHoursEnd = new Date();
    workingHoursEnd.setHours(21, 0, 0, 0);

    const baseConfig = {
      showTimeSelect: true,
      timeFormat: "HH:mm",
      timeIntervals: 30,
      dateFormat: "yyyy-MM-dd HH:mm",
      minTime: workingHoursStart,
      maxTime: workingHoursEnd,
    };

    if (serviceType === "Paseo" || serviceType === "Visita") {
      // Paseos y visitas: mismo día únicamente
      return {
        ...baseConfig,
        minDate: isEndDate ? formik.values.start_date : new Date(),
        maxDate: isEndDate ? formik.values.start_date : undefined,
        filterDate: (date) => {
          const day = date.getDay();
          if (isEndDate && formik.values.start_date) {
            return (
              date.toDateString() === formik.values.start_date.toDateString()
            );
          }
          return day !== 0 && day !== 6 && date >= new Date();
        },
        // Para fecha de fin en el mismo día, usar la hora de inicio como mínimo
        ...(isEndDate &&
          formik.values.start_date &&
          formik.values.end_date &&
          formik.values.start_date.toDateString() ===
            formik.values.end_date.toDateString() && {
            minTime:
              formik.values.start_date > workingHoursStart
                ? formik.values.start_date
                : workingHoursStart,
          }),
      };
    } else if (serviceType === "Hospedaje") {
      // Hospedaje: múltiples días permitidos
      return {
        ...baseConfig,
        minDate: isEndDate ? formik.values.start_date : new Date(),
        filterDate: (date) => {
          const day = date.getDay();
          const minDate = isEndDate ? formik.values.start_date : new Date();
          return day !== 0 && day !== 6 && date >= minDate;
        },
      };
    } else if (serviceType === "Cuidado Diario") {
      // Cuidado diario: múltiples días, horarios específicos
      return {
        ...baseConfig,
        minDate: isEndDate ? formik.values.start_date : new Date(),
        filterDate: (date) => {
          const day = date.getDay();
          const minDate = isEndDate ? formik.values.start_date : new Date();
          return day !== 0 && date >= minDate;
        },
      };
    }

    return baseConfig;
  };

  // Generar opciones reales para mascotas
  const petOptions =
    userPets?.map((pet) => ({
      value: pet.id_pet,
      label: `${pet.name} (${pet.species})`,
    })) || [];

  const isFormValid =
    formik.values.id_pet &&
    formik.values.id_service &&
    formik.values.start_date &&
    formik.values.end_date &&
    formik.values.total_price > 0 &&
    !Object.keys(formik.errors).length;

  // Mostrar loading si no hay datos
  if (!selectedService || !userPets) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center m-6 bg-[#eef1f6]">
      <Card title="Crear Nueva Reserva" className="w-full max-w-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Información del owner */}
          <div className="bg-blue-50 p-3 rounded mb-4">
            <p className="text-sm text-blue-700">
              <strong>Owner ID:</strong> {userId}
            </p>
          </div>

          {/* Información del servicio seleccionado */}
          <div className="bg-green-50 p-3 rounded mb-4">
            <p className="text-sm text-green-700">
              <strong>Servicio:</strong> {selectedService.type} - $
              {selectedService.rate}
            </p>
            <p className="text-sm text-green-700">
              <strong>Sitter:</strong> {selectedService.owners?.name || "N/A"}
            </p>
          </div>

          <Select
            label="Seleccionar Mascota"
            options={petOptions}
            value={formik.values.id_pet}
            onChange={(e) => formik.setFieldValue("id_pet", e.target.value)}
            placeholder="Selecciona una mascota"
            error={formik.touched.id_pet && formik.errors.id_pet}
            required
          />

          {/* Información del tipo de servicio */}
          {serviceType && (
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Tipo de servicio:</strong> {serviceType}
                <br />
                {serviceType === "Paseo" &&
                  "• Solo se permite el mismo día para inicio y fin"}
                {serviceType === "Hospedaje" &&
                  "• Se permite múltiples días de hospedaje"}
                {serviceType === "Cuidado Diario" &&
                  "• Se permite múltiples días de cuidado"}
                {serviceType === "Visita" &&
                  "• Solo se permite el mismo día para inicio y fin"}
              </p>
            </div>
          )}

          <CustomDatePicker
            label="Fecha y Hora de Inicio"
            selected={formik.values.start_date}
            onChange={(date) => {
              formik.setFieldValue("start_date", date);
              // Limpiar fecha de fin cuando cambia la fecha de inicio
              if (formik.values.end_date) {
                if (serviceType === "Paseo" || serviceType === "Visita") {
                  // Para paseos, mantener el mismo día pero limpiar la hora
                  formik.setFieldValue("end_date", null);
                } else if (date && formik.values.end_date <= date) {
                  formik.setFieldValue("end_date", null);
                }
              }
            }}
            placeholderText="Selecciona fecha y hora de inicio"
            error={formik.touched.start_date && formik.errors.start_date}
            {...getDatePickerConfig(false)}
          />

          <CustomDatePicker
            label="Fecha y Hora de Fin"
            selected={formik.values.end_date}
            onChange={(date) => formik.setFieldValue("end_date", date)}
            placeholderText="Selecciona fecha y hora de fin"
            error={formik.touched.end_date && formik.errors.end_date}
            disabled={!formik.values.start_date}
            {...getDatePickerConfig(true)}
          />

          <Input
            type="text"
            label="Solicitudes Especiales"
            name="special_requests"
            placeholder="Instrucciones adicionales para el cuidador"
            value={formik.values.special_requests}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <div
            className={`p-4 rounded border ${
              formik.values.total_price > 0
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p
              className={`font-medium ${
                formik.values.total_price > 0
                  ? "text-green-800"
                  : "text-gray-600"
              }`}
            >
              Precio Total: ${formik.values.total_price}
            </p>
            {formik.values.start_date &&
              formik.values.end_date &&
              serviceType && (
                <p
                  className={`text-sm mt-1 ${
                    formik.values.total_price > 0
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {(() => {
                    const startTime = new Date(formik.values.start_date);
                    const endTime = new Date(formik.values.end_date);

                    if (serviceType === "Paseo" || serviceType === "Visita") {
                      const hours = Math.ceil(
                        (endTime - startTime) / (1000 * 60 * 60)
                      );
                      return hours > 0
                        ? `Duración: ${hours} horas`
                        : "Duración inválida";
                    } else {
                      const days = Math.ceil(
                        (endTime - startTime) / (1000 * 60 * 60 * 24)
                      );
                      return days > 0
                        ? `Duración: ${days} días`
                        : "Duración inválida";
                    }
                  })()}
                </p>
              )}
            {formik.errors.end_date && (
              <p className="text-sm text-red-600 mt-1">
                ⚠️ {formik.errors.end_date}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "Procesando..." : "Proceder al Pago"}
          </Button>

          {!isFormValid && (
            <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
              <p className="text-sm text-yellow-700">
                ⚠️ Completa todos los campos requeridos para continuar
              </p>
            </div>
          )}

          {process.env.NODE_ENV === "development" && (
            <div className="bg-gray-50 p-3 rounded text-xs">
              <strong>Datos del formulario:</strong>
              <pre>{JSON.stringify(formik.values, null, 2)}</pre>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};
