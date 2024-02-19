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
       try {
        const res = await getSingleProductRequest(id);
        console.log(res);
        return res.data;
       } catch(error) {
        console.log(error);
       }
    }

    const createProduct = async (product) => {
        try {
            console.log('Producto a crear:', product);
            const res = await createProductRequest(product);
            console.log('Respuesta del servidor:', res);
            return res; // Retornar el resultado si es necesario
        }catch(error) {
            console.error('Error al crear el producto:', error.response.data.message);
            throw new Error('Error al crear el producto: ' + error.response.data.message);
        }
    }

    const updateProduct = async (id, product) => {
        try {
            await updateProductRequest(id, product);
            console.log(res);
        }catch(error) {
            console.log(error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if(res.status === 204) setProducts(products.filter((product) => product._id !== id));
            console.log(res);
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <ProductContext.Provider
        value={{
            products,
            getProducts,
            getSingleProduct,
            createProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};