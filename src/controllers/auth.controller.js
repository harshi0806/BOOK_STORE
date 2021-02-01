const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService } = require("../services");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ use, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  const payload = jwt.verify(req.body.refreshToken, config.jwt.secret);
  const user = await userService.getUserById(payload.sub);
  res.send({ user, tokens });
});

module.exports = {
  register,
  login,
  refreshTokens,
};
