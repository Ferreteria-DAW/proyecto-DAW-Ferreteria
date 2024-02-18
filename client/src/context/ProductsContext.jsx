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

    return(
        <ProductContext.Provider
        value={{
            
        }}>
            {children}
        </ProductContext.Provider>
    );
};