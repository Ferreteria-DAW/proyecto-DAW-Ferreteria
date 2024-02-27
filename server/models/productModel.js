const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: [
          "Cerrajeria",
          "Fontaneria",
          "Pintura",
          "Hogar",
          "Decoracion",
          "Iluminacion",
          "No clasificado",
        ],
        message: "La categoría no es válida",
      },
    productPrice: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, { timestamps: true });

module.exports = model('Product', productSchema);