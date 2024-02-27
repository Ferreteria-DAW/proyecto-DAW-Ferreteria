const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

/* CREAR PRODUCTO
post --> api/products 
PROTEGIDA */

const createProduct = async (req, res, next) => {
    try {
        let { productName, productDescription, productPrice } = req.body;
        if(!productName || !productDescription || !productPrice || !req.files) return next(new HttpError("Por favor ingrese todos los campos", 400));

        const { thumbnail } = req.files;

        if(thumbnail.size > 2000000) return next(new HttpError("La imagen es muy pesada, no debe superar lo 2Mb", 400));
        let fileName = thumbnail.name;
        let splittedName = fileName.split(".");
        let newFilename = splittedName[0] + uuid() + "." + splittedName[splittedName.length - 1];

        thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
            if(err) return next(new HttpError("Error al subir la imagen", 500));

            else {
                const newProduct = await productDescription.create({
                    productName,
                    productDescription,
                    productPrice,
                    thumbnail: newFilename,
                    creator: req.user.id,
                });

                if(!newProduct) return next(new HttpError("Error al crear el producto", 500));

                res.status(201).json(newProduct);
               
            }
        })
        
    }catch(err) {
        next(new HttpError("Error al crear el producto", 500));
    }
}

/* Ver productos
Ruta: get --> api/products
NO PROTEGIDA */

const getProducts = async (req, res, next) => {
    try {
        const products = await Post.find().sort( { createdAt: -1});
        res.status(200).json(products);
    } catch(err) {
        return next(new HttpError("Error al obtener los productos", 500));
    }
}


/* Ver un product
Ruta: get --> api/products/:id
NO PROTEGIDA */

const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product) return next(new HttpError("Producto no encontrado", 404));

        res.status(200).json(product);
    } catch(err) {
        return next(new HttpError("Error al obtener el producto", 500));
    }
}

/* Ver productos por categoría
Ruta: get --> api/products/categories/:category
NO PROTEGIDA */

const getProductsByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const categoryProducts = await Product.find( { category }).sort({ createdAt: -1});
        if(!categoryProducts) return next(new HttpError("No se encontraron productos en esta categoría", 404));

        res.status(200).json(categoryProducts);
    } catch(err) {
        return next(new HttpError("Error al obtener los productos", 500));
    }
}