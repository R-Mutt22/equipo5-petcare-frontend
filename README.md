# 🐾 Petcare Platform - El puente seguro entre dueños y cuidadores. 

<div align="center">

<p>
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Build-Vite-purple?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Backend-SpringBoot-green?logo=springboot" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-316192?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/API-Axios-yellow?logo=axios" alt="Axios" />
  <img src="https://img.shields.io/badge/Validation-Formik%20%2B%20Yup-orange" alt="Formik + Yup" />
</p>

## **🏆 Proyecto desarrollado para el hackathon ONE - NoCountry**

*Plataforma integral para conectar dueños de mascotas, cuidadores y administradores en un ecosistema seguro, moderno y colaborativo.*
</div>

---

## 🚀 Deploy & Estado
| Estado | API Docs | Licencia |
|--------|----------|----------|
| <img alt="build" src="https://img.shields.io/badge/build-passing-brightgreen"> | API Docs | MIT |

---

## 📖 Descripción del Proyecto
**PetCare Platform** es una aplicación web que facilita la gestión de servicios para mascotas, permitiendo reservar paseos, cuidados y supervisar la calidad del servicio.  
Conecta a usuarios en tres roles principales y resuelve problemas reales de **confianza, seguridad y organización**.

---

## 🎯 Objetivos Principales
| Objetivo | Descripción |
|----------|-------------|
| Democratizar el cuidado animal | Facilitar el acceso a servicios confiables para mascotas |
| Fomentar la colaboración | Crear una comunidad de dueños y cuidadores |
| Impulsar la seguridad | Autenticación JWT, validación de roles y contraseñas encriptadas |
| Conectar talento | Permitir a niñeras ofrecer servicios y a administradores supervisar calidad |

---

## 👥 Público Objetivo
| Rol | Necesidad principal |
|-----|---------------------|
| 🐶 Dueño | Reservar servicios y gestionar mascotas |
| 👩‍🦱 Cuidador | Ofrecer servicios y gestionar reservas |
| 🛡️ Admin | Supervisar usuarios, servicios y calidad |

---

## ✨ Funcionalidades del MVP
| Módulo | Descripción |
|--------|-------------|
| 🔐 Autenticación | Registro/login seguro, JWT, roles diferenciados |
| 👤 Gestión de usuarios | Perfiles, edición, control de acceso |
| 🐕 Gestión de mascotas | Alta, edición y administración de mascotas |
| 🏃‍♀️ Servicios | Publicación y edición de servicios por niñeras |
| 📅 Reservas | Reserva de servicios, validación de horarios, historial |
| 🛡️ Administración | Panel para supervisar usuarios, servicios y reservas |
| 🗂️ Historial | Registro de todas las reservas realizadas |
| 🛡️ Seguridad | Contraseñas encriptadas, validación de roles, control de acceso |

---

## 🛠️ Arquitectura y Tecnologías
| Categoría | Tecnología | Propósito |
|-----------|------------|-----------|
| Framework | React + Vite | SPA, desarrollo rápido |
| Estado global | Context API | Manejo de usuarios, servicios, etc. |
| API | Axios | Llamadas a backend REST |
| Validación | Formik + Yup | Formularios y validaciones |
| Estilos | CSS Modules | Componentes reutilizables |
| Backend | Spring Boot | API REST, autenticación, lógica |
| Base de datos | PostgreSQL | Almacenamiento principal |

---

## 🐕‍🦺 Historias de Usuario
| Usuario | Historia principal |
|---------|--------------------|
| 🐶 Dueño | “Quiero reservar un paseo o cuidado para mi mascota.” |
| 👩‍🦱 Cuidador | “Quiero ofrecer mis servicios y ganar ingresos.” |
| 🛡️ Admin | “Quiero garantizar la calidad del servicio y supervisar la plataforma.” |

---

## 🗺️ Roadmap y Mejoras Futuras
| Versión | Mejoras previstas |
|---------|------------------|
| 1.0 | MVP funcional: gestión de usuarios, mascotas, reservas |
| 1.1 | Notificaciones push, integración de pagos |
| 1.2 | Reseñas y calificaciones, dashboard de analytics |
| 1.3 | App móvil, integración con calendarios |
| 1.4 | IA para matching automático, videoconferencia |

---

## ⚡ Instalación y Configuración

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/equipo5-petcare-frontend.git
```
```bash
# Instala dependencias
npm install
```
```bash
# Inicia la app
npm run dev
```

# 📚 Endpoints Principales (Backend)

| Método | Endpoint            | Descripción          |
|--------|---------------------|----------------------|
| POST   | `/api/auth/register` | Registro de usuario  |
| POST   | `/api/auth/login`    | Inicio de sesión     |
| GET    | `/api/users`         | Listar usuarios      |
| GET    | `/api/pets`          | Listar mascotas      |
| POST   | `/api/pets`          | Registrar mascota    |
| GET    | `/api/services`      | Listar servicios     |
| POST   | `/api/services`      | Publicar servicio    |
| GET    | `/api/bookings`      | Listar reservas      |
| POST   | `/api/bookings`      | Crear reserva        |

---

## 🤝 Contribución

¡Toda ayuda es bienvenida! 🎉

1. Haz un fork y crea tu rama `feature/xxx`.  
2. Abre un Pull Request con una descripción clara.  
3. Sigue las convenciones de código y estructura de ramas.  

---

## 👨‍💻 Equipo

| Desarrollador               | Rol principal      | GITHUB                   |
|-----------------------------|--------------------|--------------------------|
| Matías Nehuen Malpartida   | Backend | [@matiasnm](https://github.com/matiasnm)
| Christian Iván Cachero     | Backend | [@Christian-Cachero](https://github.com/Christian-Cachero)
| Cristhian Rodrigo Sosa Zurita | Frontend | [@CristhianSZ](https://github.com/CristhianSZ)
| Matías Zelarayán           | Frontend | [@R-Mutt22](https://github.com/R-Mutt22)
| Sergio Zuñiga Fraga        | Fullstack | [@SergioZF09](https://github.com/SergioZF09)

---

## 📄 Licencia

```
MIT License

Copyright (c) 2025 PetCare Team 5 - Hackathon ONE 2025
```

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

### **¿Qué significa esto?**

- ✅ **Uso libre**: Puedes usar este código para cualquier propósito
- ✅ **Modificación**: Puedes modificar y adaptar el código
- ✅ **Distribución**: Puedes distribuir el código original o modificado
- ✅ **Uso comercial**: Puedes usar este código en proyectos comerciales
- ⚠️ **Atribución**: Debes incluir el aviso de copyright original
- ⚠️ **Sin garantías**: El software se proporciona "tal como está"

---

<div align="center">

### 🎯 **Construido con ❤️ para la comunidad de desarrolladores**

**PETCARE** - *El puente seguro entre dueños y cuidadores.*

</div>