import React, {useContext, useEffect, useState} from "react";

import { Link, useParams } from "react-router-dom";
import {UserContext} from '../context/userContext'
import CircularProgress from '@mui/material/CircularProgress';
import DeleteProduct from './DeleteProduct';
import axios from 'axios';

const ProductDetail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {user} = useContext(UserContext);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${id}`);
        setProduct(response.data);
      } catch(err) {
        setError(err);
      }
      setIsLoading(false);
    }
    getProduct();
  }, [])

  if(isLoading) {
    return <CircularProgress />
  }

  return (
    <section className="product-detail">
      {error && <p className="error">{error}</p>}
      {product && <div className="container product-detail__container">
        <div className="product-detail__header">
        
          {user?.id == product?.creator && <div className="product-detail__buttons">
            <Link to={`/products/${product?._id}/edit`} className="btn sm primary">
              Editar
            </Link>
           <DeleteProduct productId={id}/>
          </div>}
        </div>
        <h1>{product.productName}</h1>
        <div className="product-detail__thumbnail">
          <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${product.thumbnail}`} alt="" />
        </div>
        <p dangerouslySetInnerHTML={{__html: product.productDescription}}></p>
        <p>{product.productPrice} €</p>
      </div>}
    </section>
  );
};

export default ProductDetail;
