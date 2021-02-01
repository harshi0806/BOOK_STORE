const httpStatus = require('http-status');
const catchAsync = require("../utils/catchAsync");
const { productService } = require("../services");
const pick = require('../utils/pick');

const createProducts = catchAsync(async (req, res) => {
  const product = await productService.createProducts(req.body, req.headers);
  res.status(httpStatus.CREATED).send(product);
})


const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserInfoById(req.user._id);
  res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.body, ['search']);
  const options = pick(req.body, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options, req.headers);
  res.send(result);
});

module.exports = {
  createProducts,
  getUser,
  getUsers,
};
