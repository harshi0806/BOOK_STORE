const mongoose = require('mongoose');
const { toJSON } = require('./plugins'); 

const addCartSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        product_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product',
            required: true,
        }
    }
);

// add plugin that converts mongoose to json
addCartSchema.plugin(toJSON);

/**
 * @typedef AddCart
 */
const AddCart = mongoose.model('AddCart', addCartSchema);

module.exports = AddCart;
