const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { toJSON } = require('./plugins'); 

const productSchema = mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            trim: true,
            default: uuidv4,
        },
        book_type: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        book_img: {
            type: String,
            required: true
        },
        old_price:{
            type: String,
            required: true
        },
        new_price: {
            type: String,
            required: true
        }
    }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
