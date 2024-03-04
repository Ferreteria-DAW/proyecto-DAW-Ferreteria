const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    rol: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});

module.exports = model('User', userSchema);