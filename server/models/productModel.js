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
        required: true
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
        type: Schema.Tyoes.ObjectId, ref: 'User'
    }
}, { timestamps: true });

module.exports = model('Product', productSchema);