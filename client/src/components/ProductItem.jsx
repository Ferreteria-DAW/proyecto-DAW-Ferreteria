import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({
  productId,
  category,
  productName,
  productDescription,
  productPrice,
  thumbnail,
}) => {
  const substrDescription =
    productDescription.length > 150
      ? productDescription.substr(0, 150) + "..."
      : productDescription;

  return (
    <article className="product">
      <div className="product__thumbnail">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={productName}
        />
      </div>
      <div className="product__content">
        <Link to={`/products/${productId}`}>
          <h3>{productName}</h3>
        </Link>
      </div>
      <p dangerouslySetInnerHTML={{ __html: substrDescription }} />

      <div className="product__footer">
        <Link to={`/products/categories/${category}`} className="btn category product-category">
          {category}
        </Link>
        <p className='price'>{`${productPrice} €`}</p>
      </div>
        <div className="buy-btn">
          <button className="btn primary buy">Comprar</button>
        </div>
    </article>
  );
};

export default ProductItem;
