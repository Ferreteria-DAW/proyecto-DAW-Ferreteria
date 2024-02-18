import { createContext, useState, useContext } from 'react';
import {
    createProductRequest,
    getProductsRequest,
    getSingleProductRequest,
    deleteProductRequest,
    updateProductRequest
} from '../api/product';

const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error('useProduct debe utilizarse dentro de un ProductProvider');
    }
    return context;
}

export const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch(error) {
            console.log(error);
        }
    };

    const getSingleProduct = async (id) => {
        const res = await getSingleProductRequest(id);
        console.log(res);
        return res.data;
    }

    return(
        <ProductContext.Provider
        value={{
            getProducts,
            getSingleProduct,

        }}>
            {children}
        </ProductContext.Provider>
    );
};