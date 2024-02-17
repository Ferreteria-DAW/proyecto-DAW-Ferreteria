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

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct) return res.status(404).json({message: "Producto no encontrado"});

        return res.sendStatus(204);
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
};
