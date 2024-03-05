import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, category,title, description }) => {


  return (
    <div className="col-1-of-3">
    <div className="card">
      <div className="card__side card__side--front">
        <div className="card__details">
          <img src={img} alt="Imagen Llaves" />
          <h3>{category}</h3>
        </div>
      </div>
      <div className="card__side card__side--back card__side--back-1">
        <div className="card__cta">
          <div className="card__price-box">
            <h3 className="card__price-only">{title}</h3>
            <p className="card__price-value">
             {description}
            </p>
            <div><Link to={`products/categories/${category}`} className="btn btn--white">Ver</Link></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;
