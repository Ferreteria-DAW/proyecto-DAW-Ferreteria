import { parse } from 'dotenv';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};

export const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;

        const productImage = req.file;

        console.log(req.file)

        if (!productImage) {
            return res.status(400).json({ message: "Se requiere una imagen para el producto." });
        }

        console.log(productPrice.typeof)

        const newProduct = new Product({
            productName,
            productDescription,
            productPrice: parseFloat(productPrice),
            productImage,
            user: req.user.id,
        });

        newProduct.setImgUrl(req.file.filename);


        await newProduct.save();
        res.json(newProduct);
    }catch(err) {
        console.error('Error al crear el producto:', err);

        // Envía una respuesta de error con más detalles sobre el error
        res.status(500).json({ message: 'Error al crear el producto', error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) return res.status(404).json({message: "Producto no encontrado"});

        return res.sendStatus(204);
    } catch(err) {
        return res.status(500).json({message: err.response.data.message, data: req.body});
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        const productImage = req.file;
        const updatedProduct = await Product.findByIdAndUpdate(
            {_id: req.params.id},
            {productName, productDescription, productPrice, productImage},
            {new: true} 
            );
            return res.json(updatedProduct);
    }catch(err) {
        return res.status(500).json({message: err.message});
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({message: 'Producto no encontrado'});
        return res.json(product);
    }catch(err) {
        return res.status(500).json({message: err.message});
    }
};
