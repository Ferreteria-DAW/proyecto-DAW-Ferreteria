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
        const productImage = req.file.path;
        const newProduct = new Product({
            productName,
            productDescription,
            productPrice,
            productImage,
            user: req.user.id,
        });

        await newProduct.save();
        res.json(newProduct);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
};
