import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { SearchBar } from "../Componentes/Wrappers/SearchBar";
import { EmptyState } from "../Componentes/UI/EmptyState";
import { getUsers } from "../api/user.api";

// const mockUsers = [
//   {
//     id_user: 101,
//     name: "John Doe",
//     email: "john.doe@gmail.com",
//     role: "OWNER",
//     phone: "6461237980",
//     status: true,
//     createdAt: "2025-08-06",
//   },
//   {
//     id_user: 102,
//     name: "Pedro Pérez",
//     email: "pedro.perez@gmail.com",
//     role: "OWNER",
//     phone: "6461590264",
//     status: false,
//     createdAt: "2025-07-12",
//   },
//   {
//     id_user: 103,
//     name: "Carlos López",
//     email: "carlos.lopez@gmail.com",
//     role: "SITTER",
//     phone: "6461983065",
//     status: true,
//     createdAt: "2025-05-23",
//   },
// ];

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
        setAllUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los usuarios: ", error);
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const handleOnSearch = (searchTerm, role, status) => {
    if (!searchTerm && !role && !status) {
      setUsers(allUsers);
      return;
    }

    let filterUser = allUsers;

    if (searchTerm) {
      filterUser = filterUser.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (status) {
      const statusBool = status === "Activo";
      filterUser = filterUser.filter((user) => user.status === statusBool);
    }

    if (role) {
      filterUser = filterUser.filter((user) => user.role === role);
    }

    setUsers(filterUser);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-blue-700 mb-6">
        Administración de usuarios
      </h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="text-gray-600">
            <LoadingSpinner size="lg" />
            <span>Cargando datos de usuarios...</span>
          </div>
        </div>
      ) : allUsers.length === 0 ? (
        <>
          <EmptyState
            title="No hay usuarios registrados"
            description="Aún no existen usuarios en la plataforma"
            icon="⚠️"
          />
        </>
      ) : users.length === 0 ? (
        <>
          <SearchBar onSearch={handleOnSearch} searchType="users" />
          <EmptyState
            title="Sin resultados"
            description="No se encontraron usuarios con los filtros aplicados"
            icon="🔍"
          />
        </>
      ) : (
        <>
          <SearchBar onSearch={handleOnSearch} searchType="users" />
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Registro</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id_user}>
                  <td>{user.id_user}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>{user.status ? "Activo" : "Inactivo"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString}</td>
                  <td className="flex items-center justify-center gap-2">
                    <button className="btn btn-sm btn-primary">
                      Habilitar
                    </button>
                    <button className="btn btn-sm btn-error">
                      Deshabilitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
