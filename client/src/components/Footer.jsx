import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <ul className="footer__categories">
            <li><Link to='/products/categories/Cerrajeria' />Cerrajería</li>   
            <li><Link to='/products/categories/Fontaneria' />Fontanería</li>   
            <li><Link to='/products/categories/Pintura' />Pintura</li>   
            <li><Link to='/products/categories/Hogar' />Hogar</li>   
            <li><Link to='/products/categories/Decoracion' />Decoración</li>   
            <li><Link to='/products/categories/Iluminacion' />Iluminación</li>   
            <li><Link to='/products/categories/No clasificado' />No clasificado</li>   
        </ul>
        <div className="footer__copyright">
            <small>Todos los derechos reservado &copy; Copyright | </small>
        </div>
    </footer>
  )
}

export default Footer