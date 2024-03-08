import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from '../components/ProductItem';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';


const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { category } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
          setIsLoading(true);
          try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/categories/${category}`);
            setProducts(response?.data);
          } catch(err) {
            console.log(err);
          }
          setIsLoading(false);
        }
        fetchProducts();
      }, [category])
    
      if(isLoading) {
        return <CircularProgress className='loader'/>
      }

      return (
        <section className="products category">
      {products.length > 0 ? <div className="container products__container">
        {products.map(({_id: id, thumbnail, productPrice, category, productName, productDescription }, index) => (
          <ProductItem
            key={id}
            postID={id}
            thumbnail={thumbnail}
            category={category}
            productName={productName}
            productPrice={productPrice}
            productDescription={productDescription}
          />
        ))}
      </div> : <h2 className="center">No hay productos</h2>}
    </section>
      )
    
}

export default CategoryProduct;