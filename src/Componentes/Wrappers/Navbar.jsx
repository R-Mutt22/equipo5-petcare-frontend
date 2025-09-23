import { Link } from "react-router-dom";  
import { useOwner } from "../../Context/OwnerContext";  
import { useSitter } from "../../Context/SitterContext";  
import { useAdmin } from "../../Context/AdminContext";  
import { useNavigate } from "react-router-dom";  
  
export const Navbar = () => {  
  const { isAuthenticatedOwner, owner, logout: logoutOwner } = useOwner();  
  const { isAuthenticatedSitter, sitter, logout: logoutSitter } = useSitter();  
  const { isAuthenticatedAdmin, admin, logout: logoutAdmin } = useAdmin();  
  const navigate = useNavigate();  
    
  // Determinar si hay algún usuario autenticado  
  const isAuthenticated = isAuthenticatedOwner || isAuthenticatedSitter || isAuthenticatedAdmin;  
  const isOwner = isAuthenticatedOwner;  
  const isSitter = isAuthenticatedSitter;  
  const isAdmin = isAuthenticatedAdmin;  
  
  const handleLogout = () => {  
    if (isOwner) {  
      navigate("/");  
      logoutOwner();  
    } else if (isSitter) {  
      navigate("/");  
      logoutSitter();  
    } else if (isAdmin) {  
      navigate("/");  
      logoutAdmin();  
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
              <Link to="/" className="hover:bg-c transition-colors">  
                Inicio  
              </Link>  
            </li>  
  
            {/* Botones de autenticación para usuarios NO autenticados */}  
            {!isAuthenticated && (  
              <>  
                <li>  
                  <Link  
                    to="/login"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Iniciar Sesión  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/register"  
                    className="bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Registrarse  
                  </Link>  
                </li>  
              </>  
            )}  
  
            {/* Enlaces para owners autenticados */}  
            {isOwner && (  
              <>  
                <li>  
                  <Link  
                    to="/pets-list"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Mis Mascotas  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/bookings-list"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Mis Reservas  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/search-services"  
                    className="bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Buscar Servicios  
                  </Link>  
                </li>  
              </>  
            )}  
  
            {/* Enlaces para sitters autenticados */}  
            {isSitter && (  
              <>  
                <li>  
                  <Link  
                    to="/services-list"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Mis Servicios  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/bookings-list"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Mis Reservas  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/service-form"  
                    className="bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Crear Servicio  
                  </Link>  
                </li>  
              </>  
            )}  
  
            {/* Enlaces para administradores autenticados */}  
            {isAdmin && (  
              <>  
                <li>  
                  <Link  
                    to="/admin"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Panel Admin  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/admin/users"  
                    className="bg-ts text-w hover:bg-hb transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Gestionar Usuarios  
                  </Link>  
                </li>  
                <li>  
                  <Link  
                    to="/admin/services"  
                    className="bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors rounded-md my-1 px-3 py-2"  
                  >  
                    Gestionar Servicios  
                  </Link>  
                </li>  
              </>  
            )}  
  
            {/* Botón de logout para usuarios autenticados */}  
            {isAuthenticated && (  
              <li>  
                <button  
                  onClick={handleLogout}  
                  className="bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors rounded-md my-1 px-3 py-2 w-full text-left"  
                >  
                  Cerrar Sesión  
                </button>  
              </li>  
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
          <>  
            <Link  
              to="/login"  
              className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
            >  
              Iniciar Sesión  
            </Link>  
            <Link  
              to="/register"  
              className="btn btn-sm bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors"  
            >  
              Registrarse  
            </Link>  
          </>  
        ) : (  
          <>  
            {/* Botones para owners */}  
            {isOwner && (  
              <>  
                <Link  
                  to="/pets-list"  
                  className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
                >  
                  Mis Mascotas  
                </Link>  
                <Link  
                  to="/bookings-list"  
                  className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
                >  
                  Mis Reservas  
                </Link>  
                <Link  
                  to="/search-services"  
                  className="btn btn-sm mr-2 bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors"  
                >  
                  Buscar Servicios  
                </Link>  
              </>  
            )}  
  
            {/* Botones para sitters */}  
            {isSitter && (  
              <>  
                <Link  
                  to="/services-list"  
                  className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
                >  
                  Mis Servicios  
                </Link>  
                <Link  
                  to="/bookings-list"  
                  className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
                >  
                  Mis Reservas  
                </Link>  
                <Link  
                  to="/service-form"  
                  className="btn btn-sm mr-2 bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors"  
                >  
                  Crear Servicio  
                </Link>  
              </>  
            )}  
  
            {/* Botones para administradores */}  
            {isAdmin && (  
              <>  
                <Link  
                  to="/admin"  
                  className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
                >  
                  Panel Admin  
                </Link>  
                <Link  
                  to="/admin/users"  
                  className="btn btn-sm mr-2 bg-ts text-w border-ts hover:bg-hb hover:border-hb transition-colors"  
                >  
                  Gestionar Usuarios  
                </Link>  
                <Link  
                  to="/admin/services"  
                  className="btn btn-sm mr-2 bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors"  
                >  
                  Gestionar Servicios  
                </Link>  
              </>  
            )}  
  
            <button  
              onClick={handleLogout}  
              className="btn btn-sm bg-transparent text-ts border border-ts hover:bg-ts hover:text-w transition-colors"  
            >  
              Cerrar Sesión  
            </button>  
          </>  
        )}  
      </div>  
    </div>  
  );  
};