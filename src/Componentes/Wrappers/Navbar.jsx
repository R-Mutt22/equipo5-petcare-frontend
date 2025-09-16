import { Link } from "react-router-dom";
import { useOwner } from "../../Context/OwnerContext";
import { useSitter } from "../../Context/SitterContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { isAuthenticatedOwner, owner, logout: logoutOwner } = useOwner();
  const { isAuthenticatedSitter, sitter, logout: logoutSitter } = useSitter();
  const navigate = useNavigate();
  // Determinar si hay algún usuario autenticado
  const isAuthenticated = isAuthenticatedOwner || isAuthenticatedSitter;
  const isOwner = isAuthenticatedOwner && owner;
  const isSitter = isAuthenticatedSitter && sitter;

  const handleLogout = () => {
    if (isOwner) {
      navigate("/");
      logoutOwner();
    } else if (isSitter) {
      navigate("/");
      logoutSitter();
    }
  };

  return (
    <div className="navbar bg-w text-hb shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-w rounded-box w-52 text-hb"
          >
            <li>
              <Link to="/" className="hover:bg-c">
                Inicio
              </Link>
            </li>

            {/* Enlaces específicos para owners */}
            {isOwner && (
              <>
                <li>
                  <Link to="/pets-list" className="hover:bg-c">
                    Mis Mascotas
                  </Link>
                </li>
                <li>
                  <Link to="/bookings-list" className="hover:bg-c">
                    Mis Reservas
                  </Link>
                </li>
                <li>
                  <Link to="/search-services" className="hover:bg-c">
                    Buscar Servicios
                  </Link>
                </li>
              </>
            )}

            {/* Enlaces específicos para sitters */}
            {isSitter && (
              <>
                <li>
                  <Link to="/services-list" className="hover:bg-c">
                    Mis Servicios
                  </Link>
                </li>
                <li>
                  <Link to="/bookings-list" className="hover:bg-c">
                    Mis Reservas
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <Link to="/" className="flex items-center cursor-pointer">
          <div className="w-10 h-10 bg-ts rounded-full flex items-center justify-center mr-2">
            <span className="text-w font-bold text-lg">🐾</span>
          </div>
          <span className="text-xl font-bold text-hb">PetCare</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="hover:bg-c rounded-md">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:bg-c rounded-md">
              Nosotros
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:bg-c rounded-md">
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:bg-c rounded-md">
              Contacto
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center">
        {!isAuthenticated ? (
          // Botones para usuarios no autenticados
          <>
            <Link
              to="/login"
              className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-opacity-80 hover:border-ts"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="btn btn-sm bg-transparent text-ts border border-ts hover:bg-ts hover:text-w"
            >
              Registrarse
            </Link>
          </>
        ) : (
          // Botones para usuarios autenticados
          <>
            {/* Enlaces específicos para owners */}
            {isOwner && (
              <>
                <Link
                  to="/pets-list"
                  className="btn btn-sm mr-2 btn-outline btn-primary"
                >
                  Mis Mascotas
                </Link>
                <Link
                  to="/search-services"
                  className="btn btn-sm mr-2 btn-outline btn-secondary"
                >
                  Buscar Servicios
                </Link>
              </>
            )}

            {/* Enlaces específicos para sitters */}
            {isSitter && (
              <>
                <Link
                  to="/services-list"
                  className="btn btn-sm mr-2 btn-outline btn-primary"
                >
                  Mis Servicios
                </Link>
                <Link
                  to="/service-form"
                  className="btn btn-sm mr-2 btn-outline btn-secondary"
                >
                  Crear Servicio
                </Link>
              </>
            )}

            {/* Botón de logout común */}
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-red-500 text-white border-red-500 hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};
