const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createTransaction = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    type: Joi.string().required(),
    note: Joi.string().required(),
  }),
};

const deleteTransaction = {
  params: Joi.object().keys({
    transactionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTransaction,
  deleteTransaction,
};
