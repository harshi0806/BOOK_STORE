const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ratingSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    product_id:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    rate:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ratingSchema.plugin(toJSON);

/**
 * @typedef Rating
 */
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
