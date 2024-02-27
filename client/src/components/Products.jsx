import React, { useEffect, useState } from 'react';

import ProductItem from './ProductItem';
import Loader from './Loader';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsloading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/products`);
                setProducts(response?.data);
            } catch(err) {
                console.log(err);
            }
            setIsloading(false);
        }
        fetchProducts();
    }, []);

    if(isLoading) return <Loader />
    
  return (
    <section className='products'>
        {products.length ? 
            <div className='container products__container'>
                {products.map(({_id: id, thumbnail, category, productName, productDescription}, index) => {
                    <ProductItem 
                        key={id}
                        productId={id}
                        thumbnail={thumbnail}
                        category={category}
                        productName={productName}
                        productDescription={productDescription}
                    />
                })}
            </div> : <h2 className='center'>No hay productos</h2>
        }
    </section>
  )
}

export default Products