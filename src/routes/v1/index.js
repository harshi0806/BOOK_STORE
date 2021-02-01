const express = require('express');

const docsRoute = require('./docs.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');

const router = express.Router();

router.use('/docs', docsRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/product', productRoute);

module.exports = router;