import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  
  return (
    // <footer>
    //     <ul className="footer__categories">
    //         <li><Link to='/products/categories/Cerrajeria' />Cerrajería</li>   
    //         <li><Link to='/products/categories/Fontaneria' />Fontanería</li>   
    //         <li><Link to='/products/categories/Pintura' />Pintura</li>   
    //         <li><Link to='/products/categories/Hogar' />Hogar</li>   
    //         <li><Link to='/products/categories/Decoracion' />Decoración</li>   
    //         <li><Link to='/products/categories/Iluminacion' />Iluminación</li>   
    //         <li><Link to='/products/categories/No clasificado' />No clasificado</li>   
    //     </ul>
    //     <div className="footer__copyright">
    //         <small>Todos los derechos reservado &copy; Copyright | </small>
    //     </div>
    // </footer>
    <footer>
      <div className="col1 footer-about">
        <h2>FERRETERIA VEGAGRANDE</h2>
        <p>Ferretería en Gijón con más de 50 años de historia. Venta de material eléctrico, fontanería, herramientas,
          menaje del hogar,
          cerrajería, pintura… ¡Te esperamos!</p>
      </div>
      <div className="col2 footer-anchor">
        <h2>Nuestra Web</h2>
        <div>
          <Link to="/">·Inicio</Link>
          <Link to="/products">·Productos y Servicios</Link>
          <Link to="/about">·Quienes Somos</Link>
          <Link to="/contact">·Contacto</Link>
        </div>
      </div>
      <div className="col col3 footer-contact">
        <h2>Contacto</h2>
        <p>
          Telefono: <br />
          984 19 48 15 <br />
          WhatsApp: <br />
          677 49 58 05 <br />
          Dirección: <br />
          C. Aguado, 36, 33202 Gijón, Asturias
        </p>
      </div>
    </footer>

  )
}

export default Footer