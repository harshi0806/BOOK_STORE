const express = require('express');
const swaggerJS = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJS({
    swaggerDefinition,
    apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});
  
router.use('/', swaggerUI.serve);
router.get(
    '/',
    swaggerUI.setup(specs, {
        explorer: true,
    })
);

module.exports = router;