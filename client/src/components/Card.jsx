import React from "react";

const Card = ({ category,title, description }) => {
  return (
    <div class="col-1-of-3">
    <div class="card">
      <div class="card__side card__side--front">
        <div class="card__details">
          <img src="assets/img/key-chain.png" alt="Imagen Llaves" />
          <h3>{category}</h3>
        </div>
      </div>
      <div class="card__side card__side--back card__side--back-1">
        <div class="card__cta">
          <div class="card__price-box">
            <h3 class="card__price-only">{title}</h3>
            <p class="card__price-value">
             {description}
            </p>
            <a href="#popup" class="btn btn--white">Ver</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;
