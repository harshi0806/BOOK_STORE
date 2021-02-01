const httpStatus = require('http-status');
const { Transaction } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} transactionBody
 * @returns {Promise<User>}
 */
const createTransaction = async (transactionBody) => {
  const transaction = await Transaction.create(transactionBody);
  return transaction;
};

/**
 * Query for transactions
 * @returns {Promise<QueryResult>}
 */
const queryTransactions = async (UserId) => {
  const transactions = await Transaction.find({user:UserId});
  return transactions;
};

/**
 * Get transaction by id
 * @param {ObjectId} id
 * @returns {Promise<Transaction>}
 */
const getTransactionById = async (id) => {
  return Transaction.findById(id);
};



/**
 * Delete user by id
 * @param {ObjectId} transactionId
 * @returns {Promise<Transaction>}
 */
const deleteTransactionById = async (transactionId) => {
  const transaction = await getTransactionById(transactionId);
  if (!transaction) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found.');
  }
  await transaction.remove();
  return transaction;
};

module.exports = {
  createTransaction,
  queryTransactions,
  getTransactionById,
  deleteTransactionById,
};
