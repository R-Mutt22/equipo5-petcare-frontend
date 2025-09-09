import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "../Componentes/UI/LoadingSpinner";
import { SearchBar } from "../Componentes/Wrappers/SearchBar";
import { EmptyState } from "../Componentes/UI/EmptyState";

const mockUsers = [
  {
    id_user: 101,
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "OWNER",
    phone: "6461237980",
    active: "Activo",
    createdAt: "2025-08-06",
  },
  {
    id_user: 102,
    name: "Pedro Pérez",
    email: "pedro.perez@gmail.com",
    role: "OWNER",
    phone: "6461590264",
    active: "Inactivo",
    createdAt: "2025-07-12",
  },
  {
    id_user: 103,
    name: "Carlos López",
    email: "carlos.lopez@gmail.com",
    role: "SITTER",
    phone: "6461983065",
    active: "Activo",
    createdAt: "2025-05-23",
  },
];

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setAllUsers(mockUsers);
      setLoading(false);
    }, 1200);
  }, []);

  const handleOnSearch = (searchTerm, role, state) => {
    if (!searchTerm && !role && !state) {
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

    if (state) {
      filterUser = filterUser.filter((user) => user.state === state);
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
      ) : users.length === 0 ? (
        <>
          <SearchBar onSearch={handleOnSearch} searchType="users" />
          <EmptyState
            title="Sin resultados"
            description="No hay usuarios registrados"
            icon="⚠️"
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
                  <td>{user.active}</td>
                  <td>{user.createdAt}</td>
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
