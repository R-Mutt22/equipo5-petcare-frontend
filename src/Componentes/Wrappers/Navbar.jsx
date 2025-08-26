import { Link } from "react-router-dom";  
  
export const Navbar = () => {  
  return (  
    <div className="navbar bg-white text-gray-800 shadow-lg">  
      <div className="navbar-start">  
        <div className="dropdown">  
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">  
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">  
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />  
            </svg>  
          </div>  
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">  
            <li>  
              <Link to="/" className="hover:bg-blue-50">  
                Inicio  
              </Link>  
            </li>  
            <li>  
              <Link to="/pets" className="hover:bg-blue-50">  
                Mis Mascotas  
              </Link>  
            </li>  
            <li>  
              <Link to="/my-services" className="hover:bg-blue-50">  
                Mis Servicios  
              </Link>  
            </li>  
            <li>  
              <Link to="/admin" className="hover:bg-blue-50">  
                Admin  
              </Link>  
            </li>  
          </ul>  
        </div>  
          
        <Link to="/" className="flex items-center cursor-pointer">  
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2">  
            <span className="text-white font-bold text-lg">🐾</span>  
          </div>  
          <span className="text-xl font-bold text-blue-600">PetCare</span>  
        </Link>  
      </div>  
  
      <div className="navbar-center hidden lg:flex">  
        <ul className="menu menu-horizontal px-1">  
          <li>  
            <Link to="/" className="hover:bg-blue-50">  
              Inicio  
            </Link>  
          </li>  
          <li>  
            <Link to="/about" className="hover:bg-blue-50">  
              Nosotros  
            </Link>  
          </li>  
          <li>  
            <Link to="/services" className="hover:bg-blue-50">  
              Servicios  
            </Link>  
          </li>  
          <li>  
            <Link to="/contact" className="hover:bg-blue-50">  
              Contacto  
            </Link>  
          </li>  
        </ul>  
      </div>  
  
      <div className="navbar-end hidden lg:flex">  
        <Link to="/pets" className="btn btn-sm mr-2 btn-outline btn-primary">  
          Mis Mascotas  
        </Link>  
        <Link to="/my-services" className="btn btn-sm mr-2 btn-outline btn-secondary">  
          Mis Servicios  
        </Link>  
        <Link to="/admin" className="btn btn-sm mr-2 btn-outline btn-accent">  
          Admin  
        </Link>  
        <Link to="/login" className="btn btn-sm btn-primary">  
          Iniciar Sesión  
        </Link>  
      </div>  
    </div>  
  );  
};