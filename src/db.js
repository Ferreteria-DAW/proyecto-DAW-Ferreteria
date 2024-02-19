import mongoose from "mongoose";

import {MONGODB_URI} from './config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('DB connected');
    } catch(err) {
        console.log('Error connecting to the DB: ', err);
    }
}