import mongoose from "mongoose";
import {config}  from '../config.js';

const appConfig = config.appConfig;

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

productSchema.methods.setImgUrl = function setImgUrl(filename) {
  const host = appConfig.host || process.env.APP_HOST;
  const port = appConfig.port || process.env.APP_PORT;
  this.productImage = `${host}:${port}/public/${filename}`;
};

export default mongoose.model('Product', productSchema);