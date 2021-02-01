const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const pick = require('../utils/pick');

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
  getUser,
  getUsers,
};
