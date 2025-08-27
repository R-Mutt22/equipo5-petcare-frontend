export const Footer = () => {  
  return (  
    <footer className="footer p-10 bg-c text-base-content">  
      <nav>  
        <h6 className="footer-title text-ts">Ubicaciones</h6>  
        <p className="">Centro (Sede Principal)</p>  
        <p className="">Norte</p>  
        <p className="">Sur</p>  
        <p className="">Este</p>  
      </nav>  
      <nav>  
        <h6 className="footer-title text-ts">Atención</h6>  
        <p className="">Av. Principal 123</p>  
        <p className="">Lunes a Viernes: 08:00 a 18:00</p>  
        <p className="">Sábados: 08:00 a 14:00</p>  
        <h6 className="footer-title mt-6 text-ts">Contacto</h6>  
        <p className="">WhatsApp: +54-11-1234-5678</p>  
        <p className="">Tel: +54-11-4123-4567</p>  
      </nav>  
      <nav>  
        <h6 className="footer-title text-ts">Redes Sociales</h6>  
        <div className="grid grid-flow-col gap-4">  
          <a href="https://www.facebook.com/PetCare" target="_blank" rel="noopener noreferrer">  
            <img src="https://i.ibb.co/svX8BYY/facebook-5968973-BLANCO.png" width="29" height="29" className="img-fluid cursor-pointer" />  
          </a>  
          <a href="https://www.instagram.com/PetCare" target="_blank" rel="noopener noreferrer">  
            <img src="https://i.ibb.co/xs2KJMx/instagram-5968982-BLANCO.png" width="29" height="29" className="img-fluid cursor-pointer" />  
          </a>  
        </div>  
      </nav>  
    </footer>  
  );  
};