const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { transactionService } = require("../services");

const createTransaction = catchAsync(async (req, res) => {
  const transaction = await transactionService.createTransaction({
    ...req.body,
    user: req.user._id,
  });
  res.status(httpStatus.CREATED).send(transaction);
});

const getTransactions = catchAsync(async (req, res) => {
  const result = await transactionService.queryTransactions(req.user._id);
  res.send({ result });
});

const deleteTransaction = catchAsync(async (req, res) => {
  await transactionService.deleteTransactionById(req.params.transactionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
};
